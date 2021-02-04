import {strict as assert} from 'assert'

import {readFileSync} from 'fs'
import {join} from 'path'

import Database from 'better-sqlite3'

const dbFilePath = join(__dirname, '../../data/sqlite/nysdot_traffic_counts.volume.sqlite3')

const sqlFilePath = join(__dirname, './initialize.sql')

const sql = readFileSync(sqlFilePath).toString()

const db = new Database(dbFilePath)

db.exec(sql)

const allMetadataSameForCountId = !!db.prepare(`
  SELECT NOT EXISTS (
      SELECT
          count_id,
          COUNT(1) AS ct
        FROM short_count_volume_session_metadata
        GROUP BY count_id
        HAVING COUNT(1) > 1
    ) ;
`).raw().get()[0]

assert(allMetadataSameForCountId === true)
