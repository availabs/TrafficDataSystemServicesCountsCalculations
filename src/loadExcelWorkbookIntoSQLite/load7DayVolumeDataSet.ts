// exceljs does not suppoer the .xls Excel file format
//   https://stackoverflow.com/questions/58392035/how-to-read-from-xls-file-using-exceljs
//   https://github.com/exceljs/exceljs/issues/148
//   https://github.com/exceljs/exceljs/issues/165

import {strict as assert} from 'assert'

import {join} from 'path'

import Database from 'better-sqlite3'

import XLSX from 'xlsx'

const dbFilePath = join(__dirname, '../../data/sqlite/nysdot_traffic_counts.sqlite3')

const workbookFilePath = join(__dirname, '../../data/nysdot_excel_workbook/MEXIS_APP.BC_CONSULTING_NONAE_ADMIN.sandbox.xls');

const db = new Database(dbFilePath)

const workbook = XLSX.readFile(workbookFilePath)

const sheet = workbook.Sheets[workbook.SheetNames[1]]

const sheetAsJson = XLSX.utils.sheet_to_json(sheet, {header: 1})

const header = sheetAsJson[7].map(colName => colName.trim().toLowerCase())

const dataRows = sheetAsJson.slice(8).map(row => row.map(col => typeof col === 'string' ? col.trim() : col));

db.exec('BEGIN;')
db.exec('DELETE FROM short_count_volume')

const insertStmt = db.prepare(`
  INSERT INTO short_count_volume (${header})
    VALUES(${header.map(() => '?')}) ;
`)

dataRows.forEach(row => {
  assert(header.length === row.length)

  insertStmt.run(row)
})

db.exec('COMMIT;')
