import {join} from 'path'

import _ from 'lodash'

import Database from 'better-sqlite3'

import {
  CountSessionId,
  ShortCountVolumeSessionMetadata,
  ShortCountVolumeSessionData,
  ShortCountVolumeSessionRecord
} from '../domain/types'

const dbFilePath = join(__dirname, '../../../data/sqlite/nysdot_traffic_counts.sqlite3')

const db = new Database(dbFilePath)

const volumeCountsMetaQueryStmt = db.prepare(`
  SELECT
      *
    FROM short_count_volume_session_metadata
    WHERE (count_id = ?)
`)

const volumeCountsDataQueryStmt = db.prepare(`
  SELECT
      *
    FROM short_count_volume_session_data
    ORDER BY
      count_id,
      year,
      month,
      day,
      federal_direction,
      lane_code
  ;
`)

export function* makeVolumeCountsDataIterator(): Generator<ShortCountVolumeSessionRecord> {
  const dataIter = volumeCountsDataQueryStmt.iterate()

  let curCountId: CountSessionId | null = null
  let curData: ShortCountVolumeSessionData[] | null = null
  let curMeta: ShortCountVolumeSessionMetadata | null = null

  for (const dataRow of dataIter) {
    const {count_id} = dataRow

    if (curCountId !== count_id) {
      if (curCountId) {
        yield {count_id: curCountId, data: curData, meta: curMeta}
      }

      curCountId = count_id
      curData = []
      curMeta = volumeCountsMetaQueryStmt.get([count_id])
    }

    curData.push(dataRow)
  }

  if (!_.isEmpty(curData)) {
    yield {count_id: curCountId, data: curData, meta: curMeta}
  }
}
