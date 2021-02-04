/*
  nysdot_traffic_counts.sqlite3> \dt
  +----------------------------------------------------------------+
  | name                                                           |
  +----------------------------------------------------------------+
  | short_count_vehicle_classification                             |
  | short_count_volume                                             |
  | short_count_volume_session_data                                |
  | short_count_volume_session_metadata                            |
  | vehicle_class_daily_workweek_bidirectional_faxle               |
  | vehicle_class_daily_workweek_bidirectional_number_of_axle_sums |
  | vehicle_class_daily_workweek_bidirectional_number_of_axles     |
  | vehicle_class_daily_workweek_bidirectional_vehicle_volume_sums |
  | vehicle_class_daily_workweek_bidirectional_vehicle_volumes     |
  | vehicle_class_daily_workweek_directional_faxle                 |
  | vehicle_class_daily_workweek_directional_number_of_axle_sums   |
  | vehicle_class_daily_workweek_directional_number_of_axles       |
  | vehicle_class_daily_workweek_directional_vehicle_volume_sums   |
  | vehicle_class_daily_workweek_directional_vehicle_volumes       |
  | vehicle_class_directional_hourly_counts                        |
  | vehicle_class_directional_workweek_avg_hourly_count            |
  | vehicle_class_directional_workweek_hourly_counts               |
  | vehicle_class_number_of_axles                                  |
  +----------------------------------------------------------------+
*/

import {join} from 'path'

import Database from 'better-sqlite3'

import {gaussianRoundToInt} from '../utils/gaussianRound'

const dbFilePath = join(__dirname, '../../data/sqlite/nysdot_traffic_counts.canonical-classifications.sqlite3')

const db = new Database(dbFilePath)

db.function('GAUSSIAN_ROUND', {deterministic: true, varargs: true}, gaussianRoundToInt)

const PRIMARY_FED_DIRECTION = 3;
const NONPRIMARY_FED_DIRECTION = 7;

/*
  nysdot_traffic_counts.sqlite3> \d vehicle_class_directional_workweek_avg_hourly_count
  +-----+-------------------+
  | cid | name              |
  +-----+-------------------+
  | 0   | count_id          |
  | 1   | federal_direction |
  | 2   | data_interval     |
  | 3   | bin_avg_class_f1  |
  | 4   | bin_avg_class_f2  |
  | 5   | bin_avg_class_f3  |
  | 6   | bin_avg_class_f4  |
  | 7   | bin_avg_class_f5  |
  | 8   | bin_avg_class_f6  |
  | 9   | bin_avg_class_f7  |
  | 10  | bin_avg_class_f8  |
  | 11  | bin_avg_class_f9  |
  | 12  | bin_avg_class_f10 |
  | 13  | bin_avg_class_f11 |
  | 14  | bin_avg_class_f12 |
  | 15  | bin_avg_class_f13 |
  +-----+-------------------+
*/

export type DirectionalWorkweekAvgHourlyCount = {
  count_id: string;
  federal_direction: number
  data_interval: number;
  bin_avg_class_f1: number;
  bin_avg_class_f2: number;
  bin_avg_class_f3: number;
  bin_avg_class_f4: number;
  bin_avg_class_f5: number;
  bin_avg_class_f6: number;
  bin_avg_class_f7: number;
  bin_avg_class_f8: number;
  bin_avg_class_f9: number;
  bin_avg_class_f10: number;
  bin_avg_class_f11: number;
  bin_avg_class_f12: number;
  bin_avg_class_f13: number;
}

const getDirectionWorkweekAvgHourlyCountsStmt = db.prepare(`
  SELECT
      *
    FROM vehicle_class_directional_workweek_avg_hourly_count
    WHERE ( federal_direction = ? )
    ORDER BY data_interval
`)

export const primaryDirectionWorkweekAvgHourlyCounts: DirectionalWorkweekAvgHourlyCount[] =
  getDirectionWorkweekAvgHourlyCountsStmt.all([PRIMARY_FED_DIRECTION]);

export const nonprimaryDirectionWorkweekAvgHourlyCounts: DirectionalWorkweekAvgHourlyCount[] =
  getDirectionWorkweekAvgHourlyCountsStmt.all([NONPRIMARY_FED_DIRECTION]);

/*
  \d vehicle_class_daily_workweek_directional_vehicle_volumes
  +-----+--------------------------+
  | cid | name                     |
  +-----+--------------------------+
  | 0   | count_id                 |
  | 1   | federal_direction        |
  | 2   | vehicle_volume_class_f1  |
  | 3   | vehicle_volume_class_f2  |
  | 4   | vehicle_volume_class_f3  |
  | 5   | vehicle_volume_class_f4  |
  | 6   | vehicle_volume_class_f5  |
  | 7   | vehicle_volume_class_f6  |
  | 8   | vehicle_volume_class_f7  |
  | 9   | vehicle_volume_class_f8  |
  | 10  | vehicle_volume_class_f9  |
  | 11  | vehicle_volume_class_f10 |
  | 12  | vehicle_volume_class_f11 |
  | 13  | vehicle_volume_class_f12 |
  | 14  | vehicle_volume_class_f13 |
  +-----+--------------------------+
*/

export type DirectionalVehicleVolumes = {
  count_id: string;
  federal_direction: number;
  vehicle_volume_class_f1: number;
  vehicle_volume_class_f2: number;
  vehicle_volume_class_f3: number;
  vehicle_volume_class_f4: number;
  vehicle_volume_class_f5: number;
  vehicle_volume_class_f6: number;
  vehicle_volume_class_f7: number;
  vehicle_volume_class_f8: number;
  vehicle_volume_class_f9: number;
  vehicle_volume_class_f10: number;
  vehicle_volume_class_f11: number;
  vehicle_volume_class_f12: number;
  vehicle_volume_class_f13: number;
}

export const [
  primaryDirectionVehicleVolumes,
  nonprimaryDirectionVehicleVolumes,
]: DirectionalVehicleVolumes[] = db.prepare(`
  SELECT
      *
    FROM vehicle_class_daily_workweek_directional_vehicle_volumes
    ORDER BY federal_direction
`).all()

/*
  nysdot_traffic_counts.sqlite3> \d vehicle_class_daily_workweek_directional_number_of_axles
  +-----+-----------------------+
  | cid | name                  |
  +-----+-----------------------+
  | 0   | count_id              |
  | 1   | federal_direction     |
  | 2   | total_axles_class_f1  |
  | 3   | total_axles_class_f2  |
  | 4   | total_axles_class_f3  |
  | 5   | total_axles_class_f4  |
  | 6   | total_axles_class_f5  |
  | 7   | total_axles_class_f6  |
  | 8   | total_axles_class_f7  |
  | 9   | total_axles_class_f8  |
  | 10  | total_axles_class_f9  |
  | 11  | total_axles_class_f10 |
  | 12  | total_axles_class_f11 |
  | 13  | total_axles_class_f12 |
  | 14  | total_axles_class_f13 |
  +-----+-----------------------+
*/

export type DirectionalNumberOfAxles = {
  count_id: string;
  federal_direction: number;
  total_axles_class_f1: number;
  total_axles_class_f2: number;
  total_axles_class_f3: number;
  total_axles_class_f4: number;
  total_axles_class_f5: number;
  total_axles_class_f6: number;
  total_axles_class_f7: number;
  total_axles_class_f8: number;
  total_axles_class_f9: number;
  total_axles_class_f10: number;
  total_axles_class_f11: number;
  total_axles_class_f12: number;
  total_axles_class_f13: number;
}

export const [
  primaryDirectionNumberOfAxles,
  nonprimaryDirectionNumberOfAxles,
]: DirectionalNumberOfAxles[] = db.prepare(`
  SELECT
      *
    FROM vehicle_class_daily_workweek_directional_number_of_axles
    ORDER BY federal_direction
`).all();

/*
nysdot_traffic_counts.sqlite3> \d vehicle_class_daily_workweek_directional_vehicle_volume_sums 
+-----+-------------------+---------+---------+------------+----+
| cid | name              | type    | notnull | dflt_value | pk |
+-----+-------------------+---------+---------+------------+----+
| 0   | count_id          | TEXT    | 0       | <null>     | 0  |
| 1   | federal_direction | INTEGER | 0       | <null>     | 0  |
| 2   | vehicle_volume    |         | 0       | <null>     | 0  |
+-----+-------------------+---------+---------+------------+----+
*/

export type DirectionalVehicleVolumeSum = {
  count_id: string;
  federal_direction: number;
  vehicle_volume: number;
}

export const [
  primaryDirectionVehicleVolumeSum,
  nonprimaryDirectionVehicleVolumeSum,
]: DirectionalVehicleVolumeSum[] = db.prepare(`
  SELECT
      *
    FROM vehicle_class_daily_workweek_directional_vehicle_volume_sums
    ORDER BY federal_direction
`).all();


/*
nysdot_traffic_counts.sqlite3> \d vehicle_class_daily_workweek_directional_number_of_axle_sums
+-----+-------------------+---------+---------+------------+----+
| cid | name              | type    | notnull | dflt_value | pk |
+-----+-------------------+---------+---------+------------+----+
| 0   | count_id          | TEXT    | 0       | <null>     | 0  |
| 1   | federal_direction | INTEGER | 0       | <null>     | 0  |
| 2   | total_axles       |         | 0       | <null>     | 0  |
+-----+-------------------+---------+---------+------------+----+
*/

export type DirectionalNumberOfAxleSum = {
  count_id: string;
  federal_direction: number;
  total_axles: number;
}

export const [
  primaryDirectionNumberOfAxleSum,
  nonprimaryDirectionNumberOfAxleSum,
]: DirectionalNumberOfAxleSum[] = db.prepare(`
  SELECT
      *
    FROM vehicle_class_daily_workweek_directional_number_of_axle_sums
    ORDER BY federal_direction
`).all();

/*
  nysdot_traffic_counts.sqlite3> \d vehicle_class_daily_workweek_directional_faxle
  +-----+-------------------+
  | cid | name              |
  +-----+-------------------+
  | 0   | count_id          |
  | 1   | federal_direction |
  | 2   | faxle             |
  +-----+-------------------+
*/

export type DirectionalFAxle = {
  count_id: string;
  federal_direction: number;
  faxle: number;
}

export const [
  primaryDirectionFAxle,
  nonprimaryDirectionFAxle,
]: DirectionalFAxle[] = db.prepare(`
  SELECT
      *
    FROM vehicle_class_daily_workweek_directional_faxle
    ORDER BY federal_direction
`).all()

/*
  nysdot_traffic_counts.sqlite3> \d vehicle_class_daily_workweek_bidirectional_vehicle_volumes
  +-----+--------------------------+
  | cid | name                     |
  +-----+--------------------------+
  | 0   | count_id                 |
  | 1   | vehicle_volume_class_f1  |
  | 2   | vehicle_volume_class_f2  |
  | 3   | vehicle_volume_class_f3  |
  | 4   | vehicle_volume_class_f4  |
  | 5   | vehicle_volume_class_f5  |
  | 6   | vehicle_volume_class_f6  |
  | 7   | vehicle_volume_class_f7  |
  | 8   | vehicle_volume_class_f8  |
  | 9   | vehicle_volume_class_f9  |
  | 10  | vehicle_volume_class_f10 |
  | 11  | vehicle_volume_class_f11 |
  | 12  | vehicle_volume_class_f12 |
  | 13  | vehicle_volume_class_f13 |
  +-----+--------------------------+
*/

export type BidirectionalVehicleVolumes = Omit<DirectionalVehicleVolumes, 'federal_direction'>

export const bidirectionalVehicleVolumes: BidirectionalVehicleVolumes = db.prepare(`
  SELECT
      *
    FROM vehicle_class_daily_workweek_bidirectional_vehicle_volumes
`).get()

/*
  nysdot_traffic_counts.sqlite3> \d vehicle_class_daily_workweek_bidirectional_number_of_axles
  +-----+-----------------------+
  | cid | name                  |
  +-----+-----------------------+
  | 0   | count_id              |
  | 1   | total_axles_class_f1  |
  | 2   | total_axles_class_f2  |
  | 3   | total_axles_class_f3  |
  | 4   | total_axles_class_f4  |
  | 5   | total_axles_class_f5  |
  | 6   | total_axles_class_f6  |
  | 7   | total_axles_class_f7  |
  | 8   | total_axles_class_f8  |
  | 9   | total_axles_class_f9  |
  | 10  | total_axles_class_f10 |
  | 11  | total_axles_class_f11 |
  | 12  | total_axles_class_f12 |
  | 13  | total_axles_class_f13 |
  +-----+-----------------------+
*/

export type BidirectionalNumberOfAxles = Omit<DirectionalNumberOfAxles, 'federal_direction'>

export const bidirectionalNumberOfAxles: BidirectionalNumberOfAxles = db.prepare(`
  SELECT
      *
    FROM vehicle_class_daily_workweek_bidirectional_number_of_axles
`).get()


/*
  nysdot_traffic_counts.sqlite3> \d vehicle_class_daily_workweek_bidirectional_vehicle_volume_sums
  +-----+----------------+------+---------+------------+----+
  | cid | name           | type | notnull | dflt_value | pk |
  +-----+----------------+------+---------+------------+----+
  | 0   | count_id       | TEXT | 0       | <null>     | 0  |
  | 1   | vehicle_volume |      | 0       | <null>     | 0  |
  +-----+----------------+------+---------+------------+----+
*/

export type BidirectionalVehicleVolumeSum = Omit<DirectionalVehicleVolumeSum, 'federal_direction'>

export const bidirectionalVehicleVolumeSum: BidirectionalVehicleVolumeSum = db.prepare(`
  SELECT
      *
    FROM vehicle_class_daily_workweek_bidirectional_vehicle_volume_sums
`).get();

/*
nysdot_traffic_counts.sqlite3> \d vehicle_class_daily_workweek_directional_number_of_axle_sums
+-----+-------------------+---------+---------+------------+----+
| cid | name              | type    | notnull | dflt_value | pk |
+-----+-------------------+---------+---------+------------+----+
| 0   | count_id          | TEXT    | 0       | <null>     | 0  |
| 1   | federal_direction | INTEGER | 0       | <null>     | 0  |
| 2   | total_axles       |         | 0       | <null>     | 0  |
+-----+-------------------+---------+---------+------------+----+
*/

export type BidirectionalNumberOfAxleSum = Omit<DirectionalNumberOfAxleSum, 'federal_direction'>

export const bidirectionNumberOfAxleSum: BidirectionalNumberOfAxleSum = db.prepare(`
  SELECT
      *
    FROM vehicle_class_daily_workweek_directional_number_of_axle_sums
`).get();

/*
  nysdot_traffic_counts.sqlite3> \d vehicle_class_daily_workweek_bidirectional_faxle
  +-----+----------+------+
  | cid | name     | type |
  +-----+----------+------+
  | 0   | count_id | TEXT |
  | 1   | faxle    |      |
  +-----+----------+------+
*/

export type BidirectionalFAxle = Omit<DirectionalFAxle, 'federal_direction'>

export const bidirectionalFAxle: BidirectionalFAxle = db.prepare(`
  SELECT
      *
    FROM vehicle_class_daily_workweek_bidirectional_faxle
`).get()

