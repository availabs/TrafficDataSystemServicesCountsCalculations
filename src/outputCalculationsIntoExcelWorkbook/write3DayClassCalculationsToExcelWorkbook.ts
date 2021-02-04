import {join} from 'path'
import {mkdirSync, copyFileSync} from 'fs'

import XLSX from 'xlsx'
import _ from 'lodash'

import gaussianRound from '../utils/gaussianRound'

import {
  DirectionalWorkweekAvgHourlyCount,
  primaryDirectionWorkweekAvgHourlyCounts,
  nonprimaryDirectionWorkweekAvgHourlyCounts,

  DirectionalVehicleVolumes,
  primaryDirectionVehicleVolumes,
  nonprimaryDirectionVehicleVolumes,

  DirectionalNumberOfAxles,
  primaryDirectionNumberOfAxles,
  nonprimaryDirectionNumberOfAxles,

  DirectionalVehicleVolumeSum,
  primaryDirectionVehicleVolumeSum,
  nonprimaryDirectionVehicleVolumeSum,

  DirectionalNumberOfAxleSum,
  primaryDirectionNumberOfAxleSum,
  nonprimaryDirectionNumberOfAxleSum,

  DirectionalFAxle,
  primaryDirectionFAxle,
  nonprimaryDirectionFAxle,

  BidirectionalVehicleVolumes,
  bidirectionalVehicleVolumes,

  BidirectionalNumberOfAxles,
  bidirectionalNumberOfAxles,

  BidirectionalVehicleVolumeSum,
  bidirectionalVehicleVolumeSum,

  BidirectionalNumberOfAxleSum,
  bidirectionNumberOfAxleSum,

  BidirectionalFAxle,
  bidirectionalFAxle
} from './VehicleClassCalculationsDao'

const PRIMARY_FED_DIRECTION = 3;
const NONPRIMARY_FED_DIRECTION = 7;

const dataDir = join(__dirname, '../../data/nysdot_excel_workbook/')
const outputDir = join(__dirname, '../../output/')

const fileName = 'MEXIS_APP.BC_CONSULTING_NONAE_ADMIN.xls'
const outputFileName = 'MEXIS_APP.BC_CONSULTING_NONAE_ADMIN.vehicleClassificationCalcs.xls'

const filePath = join(dataDir, fileName)
const outputFilePath = join(outputDir, outputFileName)

const SHEET_NUM = 4

mkdirSync(outputDir, {recursive: true})
copyFileSync(filePath, outputFilePath)

const workbook = XLSX.readFile(outputFilePath)

const sheetName = workbook.SheetNames[SHEET_NUM]

const sheet = workbook.Sheets[sheetName]

const createNumericEntry = (n: number) => ({
  v: n,
  t: 'n',
  w: `${n}`
})

const vehicleClassToColumnLetter = {
  1: "D",
  2: "E",
  3: "F",
  4: "G",
  5: "H",
  6: "I",
  7: "J",
  8: "K",
  9: "L",
  10: "M",
  11: "N",
  12: "O",
  13: "P",
}

// Step W3: Class Bin Averages

function outputDirectionalWorkweekAvgHourlyCounts(counts: DirectionalWorkweekAvgHourlyCount[]) {
  const timeIntervalRowOffset = {
    [PRIMARY_FED_DIRECTION]: 23,
    [NONPRIMARY_FED_DIRECTION]: 56
  }

  const countsCols = [
    "bin_avg_class_f1",
    "bin_avg_class_f2",
    "bin_avg_class_f3",
    "bin_avg_class_f4",
    "bin_avg_class_f5",
    "bin_avg_class_f6",
    "bin_avg_class_f7",
    "bin_avg_class_f8",
    "bin_avg_class_f9",
    "bin_avg_class_f10",
    "bin_avg_class_f11",
    "bin_avg_class_f12",
    "bin_avg_class_f13",
  ]

  const countColsToSpreadsheetCol = countsCols.reduce((acc, col) => {
    const vehClass = col.replace(/^.*f/, '')

    acc[col] = vehicleClassToColumnLetter[vehClass]

    return acc
  }, {})

  counts.forEach(d => {
    const {federal_direction, data_interval} = d
    const row = timeIntervalRowOffset[federal_direction] + data_interval

    // console.log('federal_direction:', federal_direction, PRIMARY_FED_DIRECTION)

    countsCols.forEach(countCol => {
      const col = countColsToSpreadsheetCol[countCol]

      const cell = `${col}${row}`

      const n = d[countCol]

      const entry = createNumericEntry(gaussianRound(n))

      sheet[cell] = entry
    })
  })
}

function outputDirectionalVehicleVolumes(volumes: DirectionalVehicleVolumes) {
  const totalVehiclesRow = {
    [PRIMARY_FED_DIRECTION]: 49,
    [NONPRIMARY_FED_DIRECTION]: 82
  }

  const {federal_direction} = volumes

  const row = totalVehiclesRow[federal_direction]

  const volumeCols = [
    "vehicle_volume_class_f1",
    "vehicle_volume_class_f2",
    "vehicle_volume_class_f3",
    "vehicle_volume_class_f4",
    "vehicle_volume_class_f5",
    "vehicle_volume_class_f6",
    "vehicle_volume_class_f7",
    "vehicle_volume_class_f8",
    "vehicle_volume_class_f9",
    "vehicle_volume_class_f10",
    "vehicle_volume_class_f11",
    "vehicle_volume_class_f12",
    "vehicle_volume_class_f13",
  ]

  const volumeColsToSpreadsheetCol = volumeCols.reduce((acc, col) => {
    const vehClass = col.replace(/^.*f/, '')

    acc[col] = vehicleClassToColumnLetter[vehClass]

    return acc
  }, {})

  volumeCols.forEach(volCol => {
    const col = volumeColsToSpreadsheetCol[volCol]

    const cell = `${col}${row}`

    const n = volumes[volCol]

    const entry = createNumericEntry(gaussianRound(n))

    sheet[cell] = entry
  })
}

function outputDirectionalNumberOfAxles(numAxles: DirectionalNumberOfAxles) {
  const totalNumAxlesRow = {
    [PRIMARY_FED_DIRECTION]: 50,
    [NONPRIMARY_FED_DIRECTION]: 83
  }

  const {federal_direction} = numAxles

  const row = totalNumAxlesRow[federal_direction]

  const numAxlesCols = [
    "total_axles_class_f1",
    "total_axles_class_f2",
    "total_axles_class_f3",
    "total_axles_class_f4",
    "total_axles_class_f5",
    "total_axles_class_f6",
    "total_axles_class_f7",
    "total_axles_class_f8",
    "total_axles_class_f9",
    "total_axles_class_f10",
    "total_axles_class_f11",
    "total_axles_class_f12",
    "total_axles_class_f13",
  ]

  const numAxleColsToSpreadsheetCol = numAxlesCols.reduce((acc, col) => {
    const vehClass = col.replace(/^.*f/, '')

    acc[col] = vehicleClassToColumnLetter[vehClass]

    return acc
  }, {})

  numAxlesCols.forEach(numAxleCol => {
    const col = numAxleColsToSpreadsheetCol[numAxleCol]

    const cell = `${col}${row}`

    const n = numAxles[numAxleCol]

    const entry = createNumericEntry(gaussianRound(n))

    sheet[cell] = entry
  })
}

function outputDirectionalVehicleVolumeSum(vehVolSums: DirectionalVehicleVolumeSum) {
  const totalVehVolSumsRow = {
    [PRIMARY_FED_DIRECTION]: 49,
    [NONPRIMARY_FED_DIRECTION]: 82
  }

  const {federal_direction, vehicle_volume} = vehVolSums

  const row = totalVehVolSumsRow[federal_direction]
  const col = 'Q'

  const cell = `${col}${row}`

  const entry = createNumericEntry(gaussianRound(vehicle_volume))

  sheet[cell] = entry
}


function outputDirectionalNumberOfAxleSum(numAxleSums: DirectionalNumberOfAxleSum) {
  const totalNumAxleSumsRow = {
    [PRIMARY_FED_DIRECTION]: 50,
    [NONPRIMARY_FED_DIRECTION]: 83
  }

  const {federal_direction, total_axles} = numAxleSums

  const row = totalNumAxleSumsRow[federal_direction]
  const col = 'Q'

  const cell = `${col}${row}`

  const entry = createNumericEntry(gaussianRound(total_axles))

  sheet[cell] = entry
}

function outputDirectionalFAxle(d: DirectionalFAxle) {
  const rowsByDir = {
    [PRIMARY_FED_DIRECTION]: 51,
    [NONPRIMARY_FED_DIRECTION]: 84
  }

  const {federal_direction, faxle} = d

  const row = rowsByDir[federal_direction]
  const col = 'D'

  const cell = `${col}${row}`

  const entry = createNumericEntry(gaussianRound(faxle, 3))

  sheet[cell] = entry
}

// ==========================
//
function outputBidirectionalVehicleVolumes(volumes: BidirectionalVehicleVolumes) {
  const row = 89

  const volumeCols = [
    "vehicle_volume_class_f1",
    "vehicle_volume_class_f2",
    "vehicle_volume_class_f3",
    "vehicle_volume_class_f4",
    "vehicle_volume_class_f5",
    "vehicle_volume_class_f6",
    "vehicle_volume_class_f7",
    "vehicle_volume_class_f8",
    "vehicle_volume_class_f9",
    "vehicle_volume_class_f10",
    "vehicle_volume_class_f11",
    "vehicle_volume_class_f12",
    "vehicle_volume_class_f13",
  ]

  const volumeColsToSpreadsheetCol = volumeCols.reduce((acc, col) => {
    const vehClass = col.replace(/^.*f/, '')

    acc[col] = vehicleClassToColumnLetter[vehClass]

    return acc
  }, {})

  volumeCols.forEach(volCol => {
    const col = volumeColsToSpreadsheetCol[volCol]

    const cell = `${col}${row}`

    const n = volumes[volCol]

    const entry = createNumericEntry(gaussianRound(n))

    sheet[cell] = entry
  })
}

function outputBidirectionalNumberOfAxles(numAxles: BidirectionalNumberOfAxles) {
  const row = 90

  const numAxlesCols = [
    "total_axles_class_f1",
    "total_axles_class_f2",
    "total_axles_class_f3",
    "total_axles_class_f4",
    "total_axles_class_f5",
    "total_axles_class_f6",
    "total_axles_class_f7",
    "total_axles_class_f8",
    "total_axles_class_f9",
    "total_axles_class_f10",
    "total_axles_class_f11",
    "total_axles_class_f12",
    "total_axles_class_f13",
  ]

  const numAxleColsToSpreadsheetCol = numAxlesCols.reduce((acc, col) => {
    const vehClass = col.replace(/^.*f/, '')

    acc[col] = vehicleClassToColumnLetter[vehClass]

    return acc
  }, {})

  numAxlesCols.forEach(numAxleCol => {
    const col = numAxleColsToSpreadsheetCol[numAxleCol]

    const cell = `${col}${row}`

    const n = numAxles[numAxleCol]

    const entry = createNumericEntry(gaussianRound(n))

    sheet[cell] = entry
  })
}

function outputBidirectionalVehicleVolumeSum(vehVolSums: BidirectionalVehicleVolumeSum) {
  const {vehicle_volume} = vehVolSums

  const row = 89
  const col = 'Q'

  const cell = `${col}${row}`

  const entry = createNumericEntry(gaussianRound(vehicle_volume))

  sheet[cell] = entry
}


function outputBidirectionalNumberOfAxleSum(numAxleSums: BidirectionalNumberOfAxleSum) {
  const {total_axles} = numAxleSums

  const row = 90
  const col = 'Q'

  const cell = `${col}${row}`

  const entry = createNumericEntry(gaussianRound(total_axles))

  sheet[cell] = entry
}

function outputBidirectionalFAxle(d: BidirectionalFAxle) {
  const {faxle} = d

  const row = 91
  const col = 'D'

  const cell = `${col}${row}`

  const entry = createNumericEntry(gaussianRound(faxle, 3))

  sheet[cell] = entry
}



outputDirectionalWorkweekAvgHourlyCounts(primaryDirectionWorkweekAvgHourlyCounts)
outputDirectionalWorkweekAvgHourlyCounts(nonprimaryDirectionWorkweekAvgHourlyCounts)

outputDirectionalVehicleVolumes(primaryDirectionVehicleVolumes)
outputDirectionalVehicleVolumes(nonprimaryDirectionVehicleVolumes)

outputDirectionalNumberOfAxles(primaryDirectionNumberOfAxles)
outputDirectionalNumberOfAxles(nonprimaryDirectionNumberOfAxles)

outputDirectionalVehicleVolumeSum(primaryDirectionVehicleVolumeSum)
outputDirectionalVehicleVolumeSum(nonprimaryDirectionVehicleVolumeSum)

outputDirectionalNumberOfAxleSum(primaryDirectionNumberOfAxleSum)
outputDirectionalNumberOfAxleSum(nonprimaryDirectionNumberOfAxleSum)

outputDirectionalFAxle(primaryDirectionFAxle)
outputDirectionalFAxle(nonprimaryDirectionFAxle)

outputBidirectionalVehicleVolumes(bidirectionalVehicleVolumes)
outputBidirectionalNumberOfAxles(bidirectionalNumberOfAxles)

outputBidirectionalVehicleVolumeSum(bidirectionalVehicleVolumeSum)

outputBidirectionalNumberOfAxleSum(bidirectionNumberOfAxleSum)

outputBidirectionalFAxle(bidirectionalFAxle)

XLSX.writeFile(workbook, outputFilePath)
