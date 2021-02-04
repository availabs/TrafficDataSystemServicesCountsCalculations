import {join} from 'path'

import test from 'tape';
import _ from 'lodash'

import Database from 'better-sqlite3'

import {gaussianRoundToInt} from '../../utils/gaussianRound'

const dbFilePath = join(__dirname, '../../../data/sqlite/nysdot_traffic_counts.sqlite3')

const db = new Database(dbFilePath)

db.function('GAUSSIAN_ROUND', {deterministic: true, varargs: true}, gaussianRoundToInt)

test.only('Checking the rounding', (t) => {
  const rows = db.prepare(`
     SELECT
          count_id,
          federal_direction,
          data_interval,
          class_f1,
          class_f2,
          class_f3,
          class_f4,
          class_f5,
          class_f6,
          class_f7,
          class_f8,
          class_f9,
          class_f10,
          class_f11,
          class_f12,
          class_f13
        FROM vehicle_class_directional_workweek_hourly_counts 
        ORDER BY federal_direction, data_interval
  `).all()

  const getGroupByKey = ({
    count_id,
    federal_direction,
    data_interval,
  }) => `${count_id}|${federal_direction}|${data_interval}`

  const grouped = _.groupBy(rows, getGroupByKey)

  const dataCols = [
    'class_f1',
    'class_f2',
    'class_f3',
    'class_f4',
    'class_f5',
    'class_f6',
    'class_f7',
    'class_f8',
    'class_f9',
    'class_f10',
    'class_f11',
    'class_f12',
    'class_f13'
  ]

  // const rounded = Object.keys(grouped).reduce((acc, k) => {
  // const d = grouped[k]
  // const avgs = dataCols.reduce((acc2, c) => {
  // acc2[c] = gaussianRoundToInt(
  // _.mean(d.map(({[c]: v}) => v))
  // )

  // return acc2
  // }, {})

  // acc[k] = avgs

  // return acc
  // }, {})

  const rounded = Object.keys(grouped).reduce((acc, k) => {
    const [, dir] = k.split('|')

    const d = grouped[k]
    const avgs = dataCols.reduce((acc2, c) => {
      acc2[c] = gaussianRoundToInt(
        _.mean(d.map(({[c]: v}) => v))
      )

      return acc2
    }, {})

    acc[dir] = acc[dir] || []
    acc[dir].push(avgs)

    return acc
  }, {})

  // console.log(JSON.stringify(rounded, null, 4))

  const sums = Object.keys(rounded).reduce((acc, k) => {
    const d = rounded[k]

    acc[k] = dataCols.reduce((acc2, col) => {
      const sum = _.sum(d.map(({[col]: v}) => v))
      acc2[col] = sum
      return acc2
    }, {})

    return acc
  }, {})

  console.log(JSON.stringify(sums, null, 4))

  t.end()
});


