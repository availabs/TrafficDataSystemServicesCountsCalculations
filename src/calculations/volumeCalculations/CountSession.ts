import _ from 'lodash'

import {
  DaysOfWeek,
  VehicleAxleCode,
  CountSessionId,
  ShortCountVolumeSessionData,
  ShortCountVolumeSessionMetadata,
  ShortCountVolumeSessionRecord,
} from '../domain/types'

interface ShortCountHourlyVolumeSessionData {
  count_id: CountSessionId;
  vehicle_axle_code: VehicleAxleCode;
  year: number;
  month: number;
  day: number;
  day_of_week: string;
  federal_direction: number;
  lane_code: number;
  lanes_in_direction: number;
  collection_interval: number;

  interval_1: number;
  interval_2: number;
  interval_3: number;
  interval_4: number;
  interval_5: number;
  interval_6: number;
  interval_7: number;
  interval_8: number;
  interval_9: number;
  interval_10: number;
  interval_11: number;
  interval_12: number;
  interval_13: number;
  interval_14: number;
  interval_15: number;
  interval_16: number;
  interval_17: number;
  interval_18: number;
  interval_19: number;
  interval_20: number;
  interval_21: number;
  interval_22: number;
  interval_23: number;
  interval_24: number;

  total: number;
  flag_field: string;
  batch_id: string
}



const intervalNameToHour = (intvlName: string) => +intvlName.split(/_/g)[1] - 1

const makeMinimalKey = (data: ShortCountVolumeSessionData) => {
  const {
    year,
    month,
    day,
    federal_direction,
    lane_code,
  } = data

  const minimalKey = `${year}|${month}|${day}|${federal_direction}|${lane_code}|`

  return minimalKey
}


function getWeekdayVolumeCounts(data: ShortCountVolumeSessionData[]) {
  const workweekVolCts = data
    .filter(
      row => row.day_of_week !== DaysOfWeek.Saturday && row.day_of_week !== DaysOfWeek.Sunday
    )
    .map(d => ({...d}));

  workweekVolCts.forEach(row => {
    if (row.day_of_week === DaysOfWeek.Monday) {
      Object.keys(row).forEach(k => {
        if (/^interval_/.test(k)) {
          const h = intervalNameToHour(k)

          if (h < 6) {
            row[k] = null
          }
        }
      })
    } else if (row.day_of_week === DaysOfWeek.Friday) {
      Object.keys(row).forEach(k => {
        if (/^interval_/.test(k)) {
          const h = intervalNameToHour(k)

          if (h >= 12) {
            row[k] = null
          }
        }
      })
    }
  })

  return workweekVolCts
}

function getWeekdayHourlyVolumeCounts(workweekVolCts: ShortCountVolumeSessionData[]): ShortCountHourlyVolumeSessionData[] {
  const workweekHourlyVolumeCounts = workweekVolCts.map((d) => {
    const aggregated = Object.keys(d).reduce((acc, k) => {
      if (!/^interval_/.test(k)) {
        acc[k] = d[k]
        return acc
      }

      const volCt = d[k]

      if (Number.isFinite(volCt)) {
        const hrIntvl = k.replace(/_[1-4]$/, '')

        acc[hrIntvl] = acc[hrIntvl] || 0
        acc[hrIntvl] += volCt
      }

      return acc
    }, {})

    return aggregated
  })

  // @ts-ignore
  return workweekHourlyVolumeCounts
}

export default class CountSession {
  count_id: CountSessionId;
  metadata: ShortCountVolumeSessionMetadata;
  data: ShortCountVolumeSessionData[];
  workweekVolumeCounts: ShortCountVolumeSessionData[];
  workweekHourlyVolumeCounts: ShortCountHourlyVolumeSessionData[];

  constructor(sessionRecord: ShortCountVolumeSessionRecord) {
    this.count_id = sessionRecord.count_id
    this.metadata = sessionRecord.meta
    this.data = sessionRecord.data

    this.workweekVolumeCounts = getWeekdayVolumeCounts(this.data)
    this.workweekHourlyVolumeCounts = getWeekdayHourlyVolumeCounts(this.workweekVolumeCounts)
  }

  get seasonalAdjustmentFactor() {
    const [{month, factor_group}] = this.metadata

    return null
  }

  axleAdjustmentFactorNeeded(workweekVolCt: ShortCountVolumeSessionData) {
    return workweekVolCt.vehicle_axle_code === VehicleAxleCode.AXLE_PAIRS
  }

  // get averageNysDotWorkweekHours() {

  // }
}
