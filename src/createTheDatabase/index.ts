import {readFileSync} from 'fs'
import {join} from 'path'

import Database from 'better-sqlite3'

const dbFilePath = join(__dirname, '../../data/sqlite/nysdot_traffic_counts.sqlite3')

const sqlFilePath = join(__dirname, './createCountVolumeTable.sql')

const sql = readFileSync(sqlFilePath).toString()

const db = new Database(dbFilePath)

db.exec(sql)


