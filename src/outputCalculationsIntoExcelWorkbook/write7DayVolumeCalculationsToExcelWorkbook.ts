// exceljs does not suppoer the .xls Excel file format
//   https://stackoverflow.com/questions/58392035/how-to-read-from-xls-file-using-exceljs
//   https://github.com/exceljs/exceljs/issues/148
//   https://github.com/exceljs/exceljs/issues/165

import {join} from 'path'
import {mkdirSync, copyFileSync} from 'fs'

import _ from 'lodash'
import XLSX from 'xlsx'

import {makeVolumeCountsDataIterator} from '../calculations/volumeCalculations/VolumeCountsDao'
import CountSession from '../calculations/volumeCalculations/CountSession'
import {DaysOfWeek} from '../calculations/domain/types'
import {HourlyIntervalNames} from '../calculations/volumeCalculations/CountSession.types'

const PRIMARY_DIRECTION = 3
const NONPRIMARY_DIRECTION = 7

const startRowForDirection = {
  [PRIMARY_DIRECTION]: 26,
  [NONPRIMARY_DIRECTION]: 43
}

const hourIntervalAvgRowForDirection = {
  [PRIMARY_DIRECTION]: 33,
  [NONPRIMARY_DIRECTION]: 50,
}

const adtCellByDir = {
  [PRIMARY_DIRECTION]: 'AC34',
  [NONPRIMARY_DIRECTION]: 'AC51'
}

const dirAadtCellByDir = {
  [PRIMARY_DIRECTION]: 'AC35',
  [NONPRIMARY_DIRECTION]: 'AC52'
}

const finalAadtCell = 'AC53'

const dataDir = join(__dirname, '../../data/nysdot_excel_workbook/')
const outputDir = join(__dirname, '../../output/')

const fileName = 'MEXIS_APP.BC_CONSULTING_NONAE_ADMIN.xls'
const outputFileName = 'MEXIS_APP.BC_CONSULTING_NONAE_ADMIN.volumeCalcs.xls'

const filePath = join(dataDir, fileName)
const outputFilePath = join(outputDir, outputFileName)

const START_COL_CHAR_CODE = 68 // Column D

mkdirSync(outputDir, {recursive: true})
copyFileSync(filePath, outputFilePath)

const workbook = XLSX.readFile(outputFilePath)

const sheet = workbook.Sheets[workbook.SheetNames[2]]

const createNumericEntry = (n: number) => ({
  v: n,
  t: 'n',
  w: `${n}`
})

const hrlyIntvlToCol = {
  [HourlyIntervalNames.interval_1]: "D",
  [HourlyIntervalNames.interval_2]: "E",
  [HourlyIntervalNames.interval_3]: "F",
  [HourlyIntervalNames.interval_4]: "G",
  [HourlyIntervalNames.interval_5]: "H",
  [HourlyIntervalNames.interval_6]: "I",
  [HourlyIntervalNames.interval_7]: "J",
  [HourlyIntervalNames.interval_8]: "K",
  [HourlyIntervalNames.interval_9]: "L",
  [HourlyIntervalNames.interval_10]: "M",
  [HourlyIntervalNames.interval_11]: "N",
  [HourlyIntervalNames.interval_12]: "O",
  [HourlyIntervalNames.interval_13]: "P",
  [HourlyIntervalNames.interval_14]: "Q",
  [HourlyIntervalNames.interval_15]: "R",
  [HourlyIntervalNames.interval_16]: "S",
  [HourlyIntervalNames.interval_17]: "T",
  [HourlyIntervalNames.interval_18]: "U",
  [HourlyIntervalNames.interval_19]: "V",
  [HourlyIntervalNames.interval_20]: "W",
  [HourlyIntervalNames.interval_21]: "X",
  [HourlyIntervalNames.interval_22]: "Y",
  [HourlyIntervalNames.interval_23]: "Z",
  [HourlyIntervalNames.interval_24]: "AA"
};

const [data] = [...makeVolumeCountsDataIterator()]

const countSession = new CountSession(data);

[PRIMARY_DIRECTION, NONPRIMARY_DIRECTION].forEach(dir => {
  const findForDir = d => d.federal_direction === dir
  const startRow = startRowForDirection[dir]

  const dowToRow = [
    DaysOfWeek.Tuesday,
    DaysOfWeek.Wednesday,
    DaysOfWeek.Thursday,
    DaysOfWeek.Friday,
    DaysOfWeek.Saturday,
    DaysOfWeek.Sunday,
    DaysOfWeek.Monday,
  ].reduce((acc, dow, i) => {
    acc[dow] = startRow + i
    return acc
  }, {})

  const hourlyTotalVolumes = countSession.hourlyTotalVolumes
    .filter(({federal_direction}) => federal_direction === dir)

  hourlyTotalVolumes.forEach(d => {
    const {day_of_week} = d

    const row = dowToRow[day_of_week]

    Object.values(HourlyIntervalNames).forEach(intvl => {
      const col = hrlyIntvlToCol[intvl]

      const v = d[intvl]

      const cell = `${col}${row}`
      const entry = createNumericEntry(v)

      sheet[cell] = entry
    })

  })

  const {hourIntervalAvgsByDirection} = countSession

  const hourIntervalAvgs = hourIntervalAvgsByDirection.find(findForDir)

  Object.values(HourlyIntervalNames).forEach(intvl => {
    const row = hourIntervalAvgRowForDirection[dir]
    const col = hrlyIntvlToCol[intvl]

    const v = hourIntervalAvgs[intvl]

    const cell = `${col}${row}`
    const entry = createNumericEntry(v)

    sheet[cell] = entry
  })

  const {averageWorkweekHoursByDirection} = countSession

  const averageWorkweekHours = averageWorkweekHoursByDirection.find(findForDir)

  Object.values(HourlyIntervalNames).forEach(intvl => {
    const row = hourIntervalAvgRowForDirection[dir] + 1
    const col = hrlyIntvlToCol[intvl]

    const v = averageWorkweekHours[intvl]

    const cell = `${col}${row}`
    const entry = createNumericEntry(v)

    sheet[cell] = entry
  })

  const {averageDailyTrafficByDirection} = countSession;

  const adt = averageDailyTrafficByDirection.find(findForDir)

  const adtCell = adtCellByDir[dir]

  sheet[adtCell] = createNumericEntry(adt.average_daily_traffic)

  const {directionalAadt} = countSession

  const dirAadt = directionalAadt.find(findForDir)

  sheet[dirAadtCellByDir[dir]] = createNumericEntry(dirAadt.directional_aadt)
})

sheet[finalAadtCell] = createNumericEntry(countSession.finalAadt)

XLSX.writeFile(workbook, outputFilePath)
