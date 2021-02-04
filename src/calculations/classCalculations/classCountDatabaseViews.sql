DROP TABLE IF EXISTS vehicle_class_number_of_axles;
DROP VIEW IF EXISTS vehicle_class_directional_hourly_counts;
DROP VIEW IF EXISTS vehicle_class_directional_workweek_hourly_counts;
DROP VIEW IF EXISTS vehicle_class_directional_workweek_avg_hourly_count;
DROP VIEW IF EXISTS vehicle_class_daily_workweek_directional_vehicle_volumes;
DROP VIEW IF EXISTS vehicle_class_daily_workweek_directional_number_of_axles;
DROP VIEW IF EXISTS vehicle_class_daily_workweek_directional_vehicle_volume_sums;
DROP VIEW IF EXISTS vehicle_class_daily_workweek_directional_number_of_axle_sums;
DROP VIEW IF EXISTS vehicle_class_daily_workweek_directional_faxle;
DROP VIEW IF EXISTS vehicle_class_daily_workweek_bidirectional_vehicle_volumes;
DROP VIEW IF EXISTS vehicle_class_daily_workweek_bidirectional_number_of_axles;
DROP VIEW IF EXISTS vehicle_class_daily_workweek_bidirectional_vehicle_volume_sums;
DROP VIEW IF EXISTS vehicle_class_daily_workweek_bidirectional_number_of_axle_sums;
DROP VIEW IF EXISTS vehicle_class_daily_workweek_bidirectional_faxle;

-- Taken from the spreadsheet
CREATE TABLE vehicle_class_number_of_axles (
  f1_num_axles  REAL,
  f2_num_axles  REAL,
  f3_num_axles  REAL,
  f4_num_axles  REAL,
  f5_num_axles  REAL,
  f6_num_axles  REAL,
  f7_num_axles  REAL,
  f8_num_axles  REAL,
  f9_num_axles  REAL,
  f10_num_axles REAL,
  f11_num_axles REAL,
  f12_num_axles REAL,
  f13_num_axles REAL
);

INSERT INTO vehicle_class_number_of_axles (
  f1_num_axles,
  f2_num_axles,
  f3_num_axles,
  f4_num_axles,
  f5_num_axles,
  f6_num_axles,
  f7_num_axles,
  f8_num_axles,
  f9_num_axles,
  f10_num_axles,
  f11_num_axles,
  f12_num_axles,
  f13_num_axles
) VALUES (
  2,
  2,
  2,
  2.5,
  2,
  3,
  4,
  3.5,
  5,
  6,
  5,
  6,
  8.75
) ;

-- Step W2: Determine Interval
-- Sums the counts across quarter hours and lanes
-- data_interval is a REAL with 1/10ths place in [.1,.2,.3,.4]
--   so always rounds down
CREATE VIEW vehicle_class_directional_hourly_counts
  AS
    SELECT
        count_id,
        year,
        month,
        day,
        day_of_week,
        federal_direction,
        CAST( GAUSSIAN_ROUND(data_interval) AS INTEGER) AS data_interval,
        SUM(class_f1)  AS class_f1,
        SUM(class_f2)  AS class_f2,
        SUM(class_f3)  AS class_f3,
        SUM(class_f4)  AS class_f4,
        SUM(class_f5)  AS class_f5,
        SUM(class_f6)  AS class_f6,
        SUM(class_f7)  AS class_f7,
        SUM(class_f8)  AS class_f8,
        SUM(class_f9)  AS class_f9,
        SUM(class_f10) AS class_f10,
        SUM(class_f11) AS class_f11,
        SUM(class_f12) AS class_f12,
        SUM(class_f13) AS class_f13
      FROM short_count_vehicle_classification
      GROUP BY
        count_id,
        year,
        month,
        day,
        day_of_week,
        federal_direction,
        CAST( GAUSSIAN_ROUND(data_interval) AS INTEGER)
;

-- Step W1: Calculate Volumes by Class Bin
-- Filters out the Weekends and Monday 12am-6am, Friday 12pm-midnight
CREATE VIEW vehicle_class_directional_workweek_hourly_counts
  AS
    SELECT
        count_id,
        year,
        month,
        day,
        day_of_week,
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
      FROM vehicle_class_directional_hourly_counts
      WHERE (
        ( (day_of_week = 'Monday') AND (data_interval >= 7) )
        OR
        ( day_of_week IN ('Tuesday', 'Wednesday', 'Thursday') )
        OR
        ( (day_of_week = 'Friday') AND (data_interval <= 12) )
      )
;
        
-- Step W3: Class Bin Averages
--   Each class bin is averaged for each interval of the day
--     across the days collected
CREATE VIEW vehicle_class_directional_workweek_avg_hourly_count
  AS
    SELECT
        count_id,
        federal_direction,
        data_interval,
        CAST( GAUSSIAN_ROUND( AVG(class_f1 * 1.0), 0) AS INTEGER) AS bin_avg_class_f1,
        CAST( GAUSSIAN_ROUND( AVG(class_f2 * 1.0), 0) AS INTEGER) AS bin_avg_class_f2,
        CAST( GAUSSIAN_ROUND( AVG(class_f3 * 1.0), 0) AS INTEGER) AS bin_avg_class_f3,
        CAST( GAUSSIAN_ROUND( AVG(class_f4 * 1.0), 0) AS INTEGER) AS bin_avg_class_f4,
        CAST( GAUSSIAN_ROUND( AVG(class_f5 * 1.0), 0) AS INTEGER) AS bin_avg_class_f5,
        CAST( GAUSSIAN_ROUND( AVG(class_f6 * 1.0), 0) AS INTEGER) AS bin_avg_class_f6,
        CAST( GAUSSIAN_ROUND( AVG(class_f7 * 1.0), 0) AS INTEGER) AS bin_avg_class_f7,
        CAST( GAUSSIAN_ROUND( AVG(class_f8 * 1.0), 0) AS INTEGER) AS bin_avg_class_f8,
        CAST( GAUSSIAN_ROUND( AVG(class_f9 * 1.0), 0) AS INTEGER) AS bin_avg_class_f9,
        CAST( GAUSSIAN_ROUND( AVG(class_f10 * 1.0), 0) AS INTEGER) AS bin_avg_class_f10,
        CAST( GAUSSIAN_ROUND( AVG(class_f11 * 1.0), 0) AS INTEGER) AS bin_avg_class_f11,
        CAST( GAUSSIAN_ROUND( AVG(class_f12 * 1.0), 0) AS INTEGER) AS bin_avg_class_f12,
        CAST( GAUSSIAN_ROUND( AVG(class_f13 * 1.0), 0) AS INTEGER) AS bin_avg_class_f13
      FROM vehicle_class_directional_workweek_hourly_counts
      GROUP BY
        count_id,
        federal_direction,
        data_interval
;
      
-- Step W4: Determine Daily Volumes
--   The volumes are then summed to get the daily volume for each vehicle classification.
CREATE VIEW vehicle_class_daily_workweek_directional_vehicle_volumes
  AS
    SELECT
        count_id,
        federal_direction,
        SUM(bin_avg_class_f1) AS vehicle_volume_class_f1,
        SUM(bin_avg_class_f2) AS vehicle_volume_class_f2,
        SUM(bin_avg_class_f3) AS vehicle_volume_class_f3,
        SUM(bin_avg_class_f4) AS vehicle_volume_class_f4,
        SUM(bin_avg_class_f5) AS vehicle_volume_class_f5,
        SUM(bin_avg_class_f6) AS vehicle_volume_class_f6,
        SUM(bin_avg_class_f7) AS vehicle_volume_class_f7,
        SUM(bin_avg_class_f8) AS vehicle_volume_class_f8,
        SUM(bin_avg_class_f9) AS vehicle_volume_class_f9,
        SUM(bin_avg_class_f10) AS vehicle_volume_class_f10,
        SUM(bin_avg_class_f11) AS vehicle_volume_class_f11,
        SUM(bin_avg_class_f12) AS vehicle_volume_class_f12,
        SUM(bin_avg_class_f13) AS vehicle_volume_class_f13
      FROM vehicle_class_directional_workweek_avg_hourly_count
      GROUP BY
        count_id,
        federal_direction
;


CREATE VIEW vehicle_class_daily_workweek_directional_number_of_axles
  AS
    SELECT
        count_id,
        federal_direction,
        GAUSSIAN_ROUND(vehicle_volume_class_f1  *  f1_num_axles, 0) AS total_axles_class_f1,
        GAUSSIAN_ROUND(vehicle_volume_class_f2  *  f2_num_axles, 0) AS total_axles_class_f2,
        GAUSSIAN_ROUND(vehicle_volume_class_f3  *  f3_num_axles, 0) AS total_axles_class_f3,
        GAUSSIAN_ROUND(vehicle_volume_class_f4  *  f4_num_axles, 0) AS total_axles_class_f4,
        GAUSSIAN_ROUND(vehicle_volume_class_f5  *  f5_num_axles, 0) AS total_axles_class_f5,
        GAUSSIAN_ROUND(vehicle_volume_class_f6  *  f6_num_axles, 0) AS total_axles_class_f6,
        GAUSSIAN_ROUND(vehicle_volume_class_f7  *  f7_num_axles, 0) AS total_axles_class_f7,
        GAUSSIAN_ROUND(vehicle_volume_class_f8  *  f8_num_axles, 0) AS total_axles_class_f8,
        GAUSSIAN_ROUND(vehicle_volume_class_f9  *  f9_num_axles, 0) AS total_axles_class_f9,
        GAUSSIAN_ROUND(vehicle_volume_class_f10 * f10_num_axles, 0) AS total_axles_class_f10,
        GAUSSIAN_ROUND(vehicle_volume_class_f11 * f11_num_axles, 0) AS total_axles_class_f11,
        GAUSSIAN_ROUND(vehicle_volume_class_f12 * f12_num_axles, 0) AS total_axles_class_f12,
        GAUSSIAN_ROUND(vehicle_volume_class_f13 * f13_num_axles, 0) AS total_axles_class_f13
      FROM vehicle_class_daily_workweek_directional_vehicle_volumes
        JOIN vehicle_class_number_of_axles
;


CREATE VIEW vehicle_class_daily_workweek_directional_vehicle_volume_sums
  AS
    SELECT
        count_id,
        federal_direction,
        (
          vehicle_volume_class_f1
          + vehicle_volume_class_f2
          + vehicle_volume_class_f3
          + vehicle_volume_class_f4
          + vehicle_volume_class_f5
          + vehicle_volume_class_f6
          + vehicle_volume_class_f7
          + vehicle_volume_class_f8
          + vehicle_volume_class_f9
          + vehicle_volume_class_f10
          + vehicle_volume_class_f11
          + vehicle_volume_class_f12
          + vehicle_volume_class_f13
        ) AS vehicle_volume
      FROM vehicle_class_daily_workweek_directional_vehicle_volumes
;


CREATE VIEW vehicle_class_daily_workweek_directional_number_of_axle_sums
  AS
    SELECT
        count_id,
        federal_direction,
        (
          total_axles_class_f1
          + total_axles_class_f2
          + total_axles_class_f3
          + total_axles_class_f4
          + total_axles_class_f5
          + total_axles_class_f6
          + total_axles_class_f7
          + total_axles_class_f8
          + total_axles_class_f9
          + total_axles_class_f10
          + total_axles_class_f11
          + total_axles_class_f12
          + total_axles_class_f13
        ) as total_axles
      FROM vehicle_class_daily_workweek_directional_number_of_axles
;


CREATE VIEW vehicle_class_daily_workweek_directional_faxle
  AS
    SELECT
        count_id,
        federal_direction,
        (
          vehicle_volume
          *
          ( 2 / total_axles )
        ) as faxle
      FROM vehicle_class_daily_workweek_directional_vehicle_volume_sums
        JOIN vehicle_class_daily_workweek_directional_number_of_axle_sums
          USING (count_id, federal_direction)
;

CREATE VIEW vehicle_class_daily_workweek_bidirectional_vehicle_volumes
  AS
    SELECT
        count_id,
        SUM(vehicle_volume_class_f1) AS vehicle_volume_class_f1,
        SUM(vehicle_volume_class_f2) AS vehicle_volume_class_f2,
        SUM(vehicle_volume_class_f3) AS vehicle_volume_class_f3,
        SUM(vehicle_volume_class_f4) AS vehicle_volume_class_f4,
        SUM(vehicle_volume_class_f5) AS vehicle_volume_class_f5,
        SUM(vehicle_volume_class_f6) AS vehicle_volume_class_f6,
        SUM(vehicle_volume_class_f7) AS vehicle_volume_class_f7,
        SUM(vehicle_volume_class_f8) AS vehicle_volume_class_f8,
        SUM(vehicle_volume_class_f9) AS vehicle_volume_class_f9,
        SUM(vehicle_volume_class_f10) AS vehicle_volume_class_f10,
        SUM(vehicle_volume_class_f11) AS vehicle_volume_class_f11,
        SUM(vehicle_volume_class_f12) AS vehicle_volume_class_f12,
        SUM(vehicle_volume_class_f13) AS vehicle_volume_class_f13
      FROM vehicle_class_daily_workweek_directional_vehicle_volumes
      GROUP BY
        count_id
;

CREATE VIEW vehicle_class_daily_workweek_bidirectional_number_of_axles
  AS
    SELECT
        count_id,
        GAUSSIAN_ROUND(vehicle_volume_class_f1  *  f1_num_axles) AS total_axles_class_f1,
        GAUSSIAN_ROUND(vehicle_volume_class_f2  *  f2_num_axles) AS total_axles_class_f2,
        GAUSSIAN_ROUND(vehicle_volume_class_f3  *  f3_num_axles) AS total_axles_class_f3,
        GAUSSIAN_ROUND(vehicle_volume_class_f4  *  f4_num_axles) AS total_axles_class_f4,
        GAUSSIAN_ROUND(vehicle_volume_class_f5  *  f5_num_axles) AS total_axles_class_f5,
        GAUSSIAN_ROUND(vehicle_volume_class_f6  *  f6_num_axles) AS total_axles_class_f6,
        GAUSSIAN_ROUND(vehicle_volume_class_f7  *  f7_num_axles) AS total_axles_class_f7,
        GAUSSIAN_ROUND(vehicle_volume_class_f8  *  f8_num_axles) AS total_axles_class_f8,
        GAUSSIAN_ROUND(vehicle_volume_class_f9  *  f9_num_axles) AS total_axles_class_f9,
        GAUSSIAN_ROUND(vehicle_volume_class_f10 * f10_num_axles) AS total_axles_class_f10,
        GAUSSIAN_ROUND(vehicle_volume_class_f11 * f11_num_axles) AS total_axles_class_f11,
        GAUSSIAN_ROUND(vehicle_volume_class_f12 * f12_num_axles) AS total_axles_class_f12,
        GAUSSIAN_ROUND(vehicle_volume_class_f13 * f13_num_axles) AS total_axles_class_f13
      FROM vehicle_class_daily_workweek_bidirectional_vehicle_volumes
        JOIN vehicle_class_number_of_axles
      GROUP BY
        count_id
;

CREATE VIEW vehicle_class_daily_workweek_bidirectional_vehicle_volume_sums
  AS
    SELECT
        count_id,
        (
          vehicle_volume_class_f1
          + vehicle_volume_class_f2
          + vehicle_volume_class_f3
          + vehicle_volume_class_f4
          + vehicle_volume_class_f5
          + vehicle_volume_class_f6
          + vehicle_volume_class_f7
          + vehicle_volume_class_f8
          + vehicle_volume_class_f9
          + vehicle_volume_class_f10
          + vehicle_volume_class_f11
          + vehicle_volume_class_f12
          + vehicle_volume_class_f13
        ) AS vehicle_volume
      FROM vehicle_class_daily_workweek_bidirectional_vehicle_volumes
;


CREATE VIEW vehicle_class_daily_workweek_bidirectional_number_of_axle_sums
  AS
    SELECT
        count_id,
        (
          total_axles_class_f1
          + total_axles_class_f2
          + total_axles_class_f3
          + total_axles_class_f4
          + total_axles_class_f5
          + total_axles_class_f6
          + total_axles_class_f7
          + total_axles_class_f8
          + total_axles_class_f9
          + total_axles_class_f10
          + total_axles_class_f11
          + total_axles_class_f12
          + total_axles_class_f13
        ) as total_axles
      FROM vehicle_class_daily_workweek_bidirectional_number_of_axles
;

CREATE VIEW vehicle_class_daily_workweek_bidirectional_faxle
  AS
    SELECT
        count_id,
        (
          vehicle_volume
          *
          ( 2 / total_axles )
        ) as faxle
      FROM vehicle_class_daily_workweek_bidirectional_vehicle_volume_sums
        JOIN vehicle_class_daily_workweek_bidirectional_number_of_axle_sums
          USING (count_id)
;
