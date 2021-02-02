import _ from 'lodash'

import gaussianRound from '../../utils/gaussianRound'

import {
  DaysOfWeek,
  CountSessionId,
  ShortCountVolumeSessionData,
  ShortCountVolumeSessionMetadata,
  ShortCountVolumeSessionRecord,
} from '../domain/types'

import {
  HourlyIntervalNames,
  HourlyVolumes,
  GroupedHourlyVolumes,
} from './CountSession.types'

const intervalNameToHour = (intvlName: string) => +intvlName.split(/_/g)[1] - 1

function getHourlyVolumes(
  shortCountVolumeSessionData: ShortCountVolumeSessionData[]
): HourlyVolumes[] {
  const hourlyVolumes = shortCountVolumeSessionData.map((d) => {
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
  return hourlyVolumes
}


// Groups together lanes if they have the same vehicle_axle_code;
function getGroupedHourlyVolumes(
  hourlyVolumes: ShortCountVolumeSessionData[]
): GroupedHourlyVolumes[] {
  const keyFields = ['vehicle_axle_code', 'year', 'month', 'day', 'day_of_week', 'federal_direction']

  const getKey = (d: HourlyVolumes) => keyFields.map(k => `${d[k]}`).join('|')

  const grouped = _.groupBy(hourlyVolumes, getKey)
  const groupKeys = Object.keys(grouped)

  const intervals = Object.values(HourlyIntervalNames)

  const metadataByKey = groupKeys.reduce((acc, k) => {
    acc[k] = _.pick(grouped[k][0], keyFields)
    return acc
  }, {})

  const hrlyVolsByKey = groupKeys.reduce((acc, k) => {
    acc[k] = intervals.reduce((acc2, intvl) => {
      const g = grouped[k].map(({[intvl]: intvlVol}) => intvlVol).filter(c => !_.isNil(c))
      acc2[intvl] = g.filter(c => c !== null)
      return acc2
    }, {})

    return acc
  }, {})

  const groupedHourlyVolumes: GroupedHourlyVolumes[] =
    groupKeys.map(k => ({...metadataByKey[k], ...hrlyVolsByKey[k]}))

  return groupedHourlyVolumes
}

function getHourlyTotals(
  groupedHourlyVolumes: GroupedHourlyVolumes[]
): any {
  return groupedHourlyVolumes.map(d => {
    const intervals = Object.values(HourlyIntervalNames)

    const newD: DaysOfWeekHourlyTotalVolumes = {...d}

    intervals.forEach(intvl => newD[intvl] = _.sum(newD[intvl]))

    return newD
  })
}

function getWorkweekHourlyTotals(hourlyTotalVolumes: any) {
  const workweekHourlyTotals = hourlyTotalVolumes
    .filter(
      row => row.day_of_week !== DaysOfWeek.Saturday && row.day_of_week !== DaysOfWeek.Sunday
    )
    .map(d => ({...d}));

  workweekHourlyTotals.forEach(row => {
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

  return workweekHourlyTotals
}

function getAverageWorkweekHoursByAxleCodeAndFedDir(workweekHourlyTotals: any, axleFactor: number) {
  const keyFields = ['vehicle_axle_code', 'federal_direction']

  const getKey = (d: HourlyVolumes) => keyFields.map(k => `${d[k]}`).join('|')

  const grouped = _.groupBy(workweekHourlyTotals, getKey)
  const groupKeys = Object.keys(grouped)


  const metadataByKey = groupKeys.reduce((acc, k) => {
    acc[k] = _.pick(grouped[k][0], keyFields)
    return acc
  }, {})

  const intervals = Object.values(HourlyIntervalNames)

  const averageWorkweekHoursByKey = groupKeys.reduce((acc, k) => {
    acc[k] = intervals.reduce((acc2, intvl) => {
      const g = grouped[k].map(({[intvl]: intvlVol}) => intvlVol).filter(c => !_.isNil(c))

      const fAxle = metadataByKey[k].vehicle_axle_code === 2 ? axleFactor : 1

      const avg = gaussianRound(_.sum(g) / g.length * fAxle)

      acc2[intvl] = avg

      return acc2
    }, {})

    return acc
  }, {})

  const averageWorkweekHoursByAxleCodeAndFedDir: GroupedHourlyVolumes[] =
    groupKeys.map(k => ({...metadataByKey[k], ...averageWorkweekHoursByKey[k]}))

  return averageWorkweekHoursByAxleCodeAndFedDir
}

function getAverageWorkweekHoursByDirection(averageWorkweekHoursByAxleCodeAndFedDir: any) {
  const keyFields = ['federal_direction']

  const getKey = (d: HourlyVolumes) => keyFields.map(k => `${d[k]}`).join('|')

  const grouped = _.groupBy(averageWorkweekHoursByAxleCodeAndFedDir, getKey)
  const groupKeys = Object.keys(grouped)


  const metadataByKey = groupKeys.reduce((acc, k) => {
    acc[k] = _.pick(grouped[k][0], keyFields)
    return acc
  }, {})

  const intervals = Object.values(HourlyIntervalNames)

  const averageWorkweekHoursByKey = groupKeys.reduce((acc, k) => {
    acc[k] = intervals.reduce((acc2, intvl) => {
      const g = grouped[k].map(({[intvl]: intvlVol}) => intvlVol).filter(c => !_.isNil(c))

      acc2[intvl] = _.sum(g)

      return acc2
    }, {})

    return acc
  }, {})

  const averageWorkweekHoursByDirection =
    groupKeys.map(k => ({...metadataByKey[k], ...averageWorkweekHoursByKey[k]}))

  return averageWorkweekHoursByDirection
}

function getAverageDailyTrafficByDirection(averageWorkweekHoursByDirection: any) {
  const intervals = Object.values(HourlyIntervalNames)

  const avgWwkHrsSum = averageWorkweekHoursByDirection.map(dirAvgWwkHrs => {
    const dirADT = intervals.reduce((acc, intvl) => acc + (dirAvgWwkHrs[intvl] ?? 0), 0)

    return {
      federal_direction: dirAvgWwkHrs.federal_direction,
      average_daily_traffic: dirADT
    }
  })

  return avgWwkHrsSum
}

function getDirectionalAadt(averageDailyTrafficByDirection: any, seasonalAdjFac: number) {
  return averageDailyTrafficByDirection.map(({federal_direction, average_daily_traffic}) => ({
    federal_direction,
    directional_aadt: gaussianRound(average_daily_traffic / seasonalAdjFac)
  }))
}

function getFinalAadt(directionalAadt: any) {
  return _.sum(directionalAadt.map(({directional_aadt}) => directional_aadt))
}

export default class CountSession {
  count_id: CountSessionId;
  metadata: ShortCountVolumeSessionMetadata;
  data: ShortCountVolumeSessionData[];
  axle_adjustment_factor: number;
  seasonal_adjustment_factor: number;
  groupedHourlyVolumes: GroupedHourlyVolumes;
  averageHourlyVolumes: any;

  constructor(sessionRecord: ShortCountVolumeSessionRecord) {
    this.count_id = sessionRecord.count_id;
    this.metadata = sessionRecord.meta;
    this.data = sessionRecord.data;
    this.axle_adjustment_factor = sessionRecord.axle_adjustment_factor;
    this.seasonal_adjustment_factor = sessionRecord.seasonal_adjustment_factor;

    this.hourlyVolumes = getHourlyVolumes(this.data)
    this.groupedHourlyVolumes = getGroupedHourlyVolumes(this.hourlyVolumes)
    this.hourlyTotalVolumes = getHourlyTotals(this.groupedHourlyVolumes)

    this.workweekHourlyTotalVolumes = getWorkweekHourlyTotals(this.hourlyTotalVolumes)

    this.averageWorkweekHoursByAxleCodeAndFedDir =
      getAverageWorkweekHoursByAxleCodeAndFedDir(
        this.workweekHourlyTotalVolumes,
        this.axle_adjustment_factor
      )

    this.averageWorkweekHoursByDirection = getAverageWorkweekHoursByDirection(this.averageWorkweekHoursByAxleCodeAndFedDir)

    this.averageDailyTrafficByDirection = getAverageDailyTrafficByDirection(this.averageWorkweekHoursByDirection)

    this.directionalAadt = getDirectionalAadt(this.averageDailyTrafficByDirection, this.seasonal_adjustment_factor)

    this.finalAadt = getFinalAadt(this.directionalAadt)

    // console.log(JSON.stringify(this.groupedHourlyVolumes, null, 4))
    // console.log(JSON.stringify(this.hourlyTotalVolumes, null, 4))
    // console.log(JSON.stringify(this.workweekHourlyTotalVolumes, null, 4))
    console.log(JSON.stringify(this.directionalAadt, null, 4))
    console.log(JSON.stringify(this.finalAadt, null, 4))
  }
}
