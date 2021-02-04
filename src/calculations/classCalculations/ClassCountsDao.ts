import {join} from 'path'

import _ from 'lodash'

import Database from 'better-sqlite3'

const dbFilePath = join(__dirname, '../../../data/sqlite/nysdot_traffic_counts.sqlite3')

const db = new Database(dbFilePath)

const classCountsAvgQuery = db.prepare(`
  SELECT
      *
    FROM daily_volume_short_count_vehicle_classification
      count_id,
      federal_direction
`)

export function getClassAvgCounts(): any {
  return classCountsAvgQuery.all()
}

