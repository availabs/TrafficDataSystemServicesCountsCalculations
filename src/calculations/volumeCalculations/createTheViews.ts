import {readFileSync} from 'fs'
import {join} from 'path'

import Database from 'better-sqlite3'

import {gaussianRoundToInt} from '../../utils/gaussianRound'

const dbFilePath = join(__dirname, '../../../data/sqlite/nysdot_traffic_counts.volume.sqlite3')

const sqlFilePath = join(__dirname, './classCountDatabaseViews.sql')

const sql = readFileSync(sqlFilePath).toString()

const db = new Database(dbFilePath)

db.function('GAUSSIAN_ROUND', gaussianRoundToInt)

db.exec(sql)
