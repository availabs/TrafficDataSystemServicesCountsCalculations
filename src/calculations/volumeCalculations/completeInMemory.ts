import {readFileSync} from 'fs'
import {join} from 'path'

import _ from 'lodash'

import Database from 'better-sqlite3'

import {gaussianRoundToInt} from '../../utils/gaussianRound'

// import {
// DaysOfWeek,
// VehicleAxleCode,
// FederalDirection,
// IntervalNames,
// CountSessionId,
// ShortCountVolumeSessionRecord,
// HourlyIntervalNames,
// HourlyVolumes,
// GroupedHourlyVolumes,
// DayOfWeekHourlyVolumes,
// AverageHourlyVolumes,
// } from './domain/types'

const dbFilePath = join(__dirname, '../../../data/sqlite/nysdot_traffic_counts.volume.sqlite3')

const db = new Database(dbFilePath)

db.function('GAUSSIAN_ROUND', {deterministic: true, varargs: true}, gaussianRoundToInt)

const sql = readFileSync(join(__dirname, './createTempTables.sql')).toString()

db.exec(sql)
