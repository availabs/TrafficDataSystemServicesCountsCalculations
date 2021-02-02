import _ from 'lodash'

import test from 'tape';

import {makeVolumeCountsDataIterator} from './VolumeCountsDao'

import CountSession from './CountSession'

import {
  DaysOfWeek
} from '../domain/types'

const excludedMondayIntervals = [
  // 12am -1am
  'interval_1_1',
  'interval_1_2',
  'interval_1_3',
  'interval_1_4',

  // 1am - 2am
  'interval_2_1',
  'interval_2_2',
  'interval_2_3',
  'interval_2_4',

  // 2am - 3am
  'interval_3_1',
  'interval_3_2',
  'interval_3_3',
  'interval_3_4',

  // 3am - 4am
  'interval_4_1',
  'interval_4_2',
  'interval_4_3',
  'interval_4_4',

  // 4am - 5am
  'interval_5_1',
  'interval_5_2',
  'interval_5_3',
  'interval_5_4',

  // 5am - 6am
  'interval_6_1',
  'interval_6_2',
  'interval_6_3',
  'interval_6_4',
]

const excludedFridayIntervals = [
  // 12pm - 1pm
  'interval_13_1',
  'interval_13_2',
  'interval_13_3',
  'interval_13_4',

  // 1pm - 2pm
  'interval_14_1',
  'interval_14_2',
  'interval_14_3',
  'interval_14_4',

  // 1pm - 2pm
  'interval_15_1',
  'interval_15_2',
  'interval_15_3',
  'interval_15_4',

  'interval_16_1',
  'interval_16_2',
  'interval_16_3',
  'interval_16_4',

  'interval_17_1',
  'interval_17_2',
  'interval_17_3',
  'interval_17_4',

  'interval_18_1',
  'interval_18_2',
  'interval_18_3',
  'interval_18_4',

  'interval_19_1',
  'interval_19_2',
  'interval_19_3',
  'interval_19_4',

  'interval_20_1',
  'interval_20_2',
  'interval_20_3',
  'interval_20_4',

  'interval_21_1',
  'interval_21_2',
  'interval_21_3',
  'interval_21_4',

  'interval_22_1',
  'interval_22_2',
  'interval_22_3',
  'interval_22_4',

  'interval_23_1',
  'interval_23_2',
  'interval_23_3',
  'interval_23_4',

  'interval_24_1',
  'interval_24_2',
  'interval_24_3',
  'interval_24_4',
]

test('Get Short Counts Session Record', (t) => {
  const iter = makeVolumeCountsDataIterator()

  for (const row of iter) {
    const countSession = new CountSession(row)

    countSession.workWeekVolumeCounts.forEach(row => {
      t.ok(row.day_of_week !== DaysOfWeek.Saturday && row.day_of_week !== DaysOfWeek.Sunday)

      const intervals = Object.keys(row).filter(k => /^interval_/.test(k))


      let excludedIntervals = []

      if (row.day_of_week === DaysOfWeek.Monday) {
        excludedIntervals = excludedMondayIntervals
      }

      if (row.day_of_week === DaysOfWeek.Friday) {
        excludedIntervals = excludedFridayIntervals
      }

      const includedIntervals = _.difference(intervals, excludedIntervals)

      t.ok(includedIntervals.every(intvl => row[intvl] !== null))
      t.ok(excludedIntervals.every(intvl => row[intvl] === null))
    })
    t.ok(row.data.length > 0)
  }

  t.end()
});
