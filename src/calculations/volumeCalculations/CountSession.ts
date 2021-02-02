import _ from 'lodash'

import {
  CountSessionId,
  ShortCountVolumeSessionData,
  ShortCountVolumeSessionMetadata,
  ShortCountVolumeSessionRecord,
  DaysOfWeek
} from '../domain/types'

export default class CountSession {
  count_id: CountSessionId;
  metadata: ShortCountVolumeSessionMetadata;
  data: ShortCountVolumeSessionData[];

  constructor(sessionRecord: ShortCountVolumeSessionRecord) {
    this.count_id = sessionRecord.count_id
    this.metadata = sessionRecord.meta
    this.data = sessionRecord.data
  }

  get workWeekVolumeCounts() {
    console.log(Array.isArray(this.data))

    const weekdayVolCts = this.data
      .filter(
        row => row.day_of_week !== DaysOfWeek.Saturday && row.day_of_week !== DaysOfWeek.Sunday
      )
      .map(d => ({...d}));

    weekdayVolCts.forEach(row => {
      if (row.day_of_week === DaysOfWeek.Monday) {
        Object.keys(row).forEach(k => {
          if (/^interval_/.test(k)) {
            const h = +k.split(/_/g)[1] - 1

            if (h < 6) {
              row[k] = null
            }
          }
        })
      } else if (row.day_of_week === DaysOfWeek.Friday) {
        Object.keys(row).forEach(k => {
          if (/^interval_/.test(k)) {
            const h = +k.split(/_/g)[1] - 1

            if (h >= 12) {
              row[k] = null
            }
          }
        })
      }
    })

    return weekdayVolCts
  }
}
