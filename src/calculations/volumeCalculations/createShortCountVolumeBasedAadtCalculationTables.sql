DROP TABLE IF EXISTS axle_adjustment_factor ;
DROP TABLE IF EXISTS seasonal_adjustment_factor ;
DROP TABLE IF EXISTS volumes_workweek_hourly ;
DROP TABLE IF EXISTS volumes_avg_workweek_hours ;
DROP TABLE IF EXISTS volumes_directional_avg_daily_traffic ;
DROP TABLE IF EXISTS volumes_directional_avg_annual_daily_traffic ;
DROP TABLE IF EXISTS volumes_bidirectional_avg_annual_daily_traffic ;

-- Taken from the spreadsheet
CREATE TABLE axle_adjustment_factor (
  axle_adjustment_factor REAL
);

INSERT INTO axle_adjustment_factor (
  axle_adjustment_factor
) VALUES (0.978) ;

CREATE TABLE seasonal_adjustment_factor (
  seasonal_adjustment_factor REAL
);

INSERT INTO seasonal_adjustment_factor (
  seasonal_adjustment_factor
) VALUES (0.912) ;

CREATE TABLE volumes_workweek_hourly
  AS
    SELECT
        count_id,
        vehicle_axle_code,
        year,
        month,
        day,
        day_of_week,
        federal_direction,
        SUM(interval_1_1  + interval_1_2  + interval_1_3  + interval_1_4 ) AS interval_1,
        SUM(interval_2_1  + interval_2_2  + interval_2_3  + interval_2_4 ) AS interval_2,
        SUM(interval_3_1  + interval_3_2  + interval_3_3  + interval_3_4 ) AS interval_3,
        SUM(interval_4_1  + interval_4_2  + interval_4_3  + interval_4_4 ) AS interval_4,
        SUM(interval_5_1  + interval_5_2  + interval_5_3  + interval_5_4 ) AS interval_5,
        SUM(interval_6_1  + interval_6_2  + interval_6_3  + interval_6_4 ) AS interval_6,
        SUM(interval_7_1  + interval_7_2  + interval_7_3  + interval_7_4 ) AS interval_7,
        SUM(interval_8_1  + interval_8_2  + interval_8_3  + interval_8_4 ) AS interval_8,
        SUM(interval_9_1  + interval_9_2  + interval_9_3  + interval_9_4 ) AS interval_9,
        SUM(interval_10_1 + interval_10_2 + interval_10_3 + interval_10_4) AS interval_10,
        SUM(interval_11_1 + interval_11_2 + interval_11_3 + interval_11_4) AS interval_11,
        SUM(interval_12_1 + interval_12_2 + interval_12_3 + interval_12_4) AS interval_12,
        SUM(interval_13_1 + interval_13_2 + interval_13_3 + interval_13_4) AS interval_13,
        SUM(interval_14_1 + interval_14_2 + interval_14_3 + interval_14_4) AS interval_14,
        SUM(interval_15_1 + interval_15_2 + interval_15_3 + interval_15_4) AS interval_15,
        SUM(interval_16_1 + interval_16_2 + interval_16_3 + interval_16_4) AS interval_16,
        SUM(interval_17_1 + interval_17_2 + interval_17_3 + interval_17_4) AS interval_17,
        SUM(interval_18_1 + interval_18_2 + interval_18_3 + interval_18_4) AS interval_18,
        SUM(interval_19_1 + interval_19_2 + interval_19_3 + interval_19_4) AS interval_19,
        SUM(interval_20_1 + interval_20_2 + interval_20_3 + interval_20_4) AS interval_20,
        SUM(interval_21_1 + interval_21_2 + interval_21_3 + interval_21_4) AS interval_21,
        SUM(interval_22_1 + interval_22_2 + interval_22_3 + interval_22_4) AS interval_22,
        SUM(interval_23_1 + interval_23_2 + interval_23_3 + interval_23_4) AS interval_23,
        SUM(interval_24_1 + interval_24_2 + interval_24_3 + interval_24_4) AS interval_24
      FROM short_count_volume
      WHERE ( day_of_week IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday') )
      GROUP BY 1,2,3,4,5,6,7
  ;

UPDATE volumes_workweek_hourly
  SET
      interval_1 = NULL,
      interval_2 = NULL,
      interval_3 = NULL,
      interval_4 = NULL,
      interval_5 = NULL,
      interval_6 = NULL
  WHERE day_of_week = 'Monday' ;

UPDATE volumes_workweek_hourly
  SET
      interval_13 = NULL,
      interval_14 = NULL,
      interval_15 = NULL,
      interval_16 = NULL,
      interval_17 = NULL,
      interval_18 = NULL,
      interval_19 = NULL,
      interval_20 = NULL,
      interval_21 = NULL,
      interval_22 = NULL,
      interval_23 = NULL,
      interval_24 = NULL
  WHERE day_of_week = 'Friday' ;

-- Step 4: Calculating Average NYSDOT Workweek Hours 
CREATE TABLE volumes_avg_workweek_hours
  AS
    SELECT
        count_id,
        federal_direction,
        GAUSSIAN_ROUND( SUM(interval_1  * 1.0) / COUNT(interval_1 ) * axle_adjustment_factor ) AS wkwk_hrs_1,
        GAUSSIAN_ROUND( SUM(interval_2  * 1.0) / COUNT(interval_2 ) * axle_adjustment_factor ) AS wkwk_hrs_2,
        GAUSSIAN_ROUND( SUM(interval_3  * 1.0) / COUNT(interval_3 ) * axle_adjustment_factor ) AS wkwk_hrs_3,
        GAUSSIAN_ROUND( SUM(interval_4  * 1.0) / COUNT(interval_4 ) * axle_adjustment_factor ) AS wkwk_hrs_4,
        GAUSSIAN_ROUND( SUM(interval_5  * 1.0) / COUNT(interval_5 ) * axle_adjustment_factor ) AS wkwk_hrs_5,
        GAUSSIAN_ROUND( SUM(interval_6  * 1.0) / COUNT(interval_6 ) * axle_adjustment_factor ) AS wkwk_hrs_6,
        GAUSSIAN_ROUND( SUM(interval_7  * 1.0) / COUNT(interval_7 ) * axle_adjustment_factor ) AS wkwk_hrs_7,
        GAUSSIAN_ROUND( SUM(interval_8  * 1.0) / COUNT(interval_8 ) * axle_adjustment_factor ) AS wkwk_hrs_8,
        GAUSSIAN_ROUND( SUM(interval_9  * 1.0) / COUNT(interval_9 ) * axle_adjustment_factor ) AS wkwk_hrs_9,
        GAUSSIAN_ROUND( SUM(interval_10 * 1.0) / COUNT(interval_10) * axle_adjustment_factor ) AS wkwk_hrs_10,
        GAUSSIAN_ROUND( SUM(interval_11 * 1.0) / COUNT(interval_11) * axle_adjustment_factor ) AS wkwk_hrs_11,
        GAUSSIAN_ROUND( SUM(interval_12 * 1.0) / COUNT(interval_12) * axle_adjustment_factor ) AS wkwk_hrs_12,
        GAUSSIAN_ROUND( SUM(interval_13 * 1.0) / COUNT(interval_13) * axle_adjustment_factor ) AS wkwk_hrs_13,
        GAUSSIAN_ROUND( SUM(interval_14 * 1.0) / COUNT(interval_14) * axle_adjustment_factor ) AS wkwk_hrs_14,
        GAUSSIAN_ROUND( SUM(interval_15 * 1.0) / COUNT(interval_15) * axle_adjustment_factor ) AS wkwk_hrs_15,
        GAUSSIAN_ROUND( SUM(interval_16 * 1.0) / COUNT(interval_16) * axle_adjustment_factor ) AS wkwk_hrs_16,
        GAUSSIAN_ROUND( SUM(interval_17 * 1.0) / COUNT(interval_17) * axle_adjustment_factor ) AS wkwk_hrs_17,
        GAUSSIAN_ROUND( SUM(interval_18 * 1.0) / COUNT(interval_18) * axle_adjustment_factor ) AS wkwk_hrs_18,
        GAUSSIAN_ROUND( SUM(interval_19 * 1.0) / COUNT(interval_19) * axle_adjustment_factor ) AS wkwk_hrs_19,
        GAUSSIAN_ROUND( SUM(interval_20 * 1.0) / COUNT(interval_20) * axle_adjustment_factor ) AS wkwk_hrs_20,
        GAUSSIAN_ROUND( SUM(interval_21 * 1.0) / COUNT(interval_21) * axle_adjustment_factor ) AS wkwk_hrs_21,
        GAUSSIAN_ROUND( SUM(interval_22 * 1.0) / COUNT(interval_22) * axle_adjustment_factor ) AS wkwk_hrs_22,
        GAUSSIAN_ROUND( SUM(interval_23 * 1.0) / COUNT(interval_23) * axle_adjustment_factor ) AS wkwk_hrs_23,
        GAUSSIAN_ROUND( SUM(interval_24 * 1.0) / COUNT(interval_24) * axle_adjustment_factor ) AS wkwk_hrs_24
      FROM volumes_workweek_hourly, axle_adjustment_factor 
      GROUP BY 1,2
  ;

CREATE TABLE volumes_directional_avg_daily_traffic
  AS
    SELECT
        count_id,
        federal_direction,
        ( 
          wkwk_hrs_1
          + wkwk_hrs_2
          + wkwk_hrs_3
          + wkwk_hrs_4
          + wkwk_hrs_5
          + wkwk_hrs_6
          + wkwk_hrs_7
          + wkwk_hrs_8
          + wkwk_hrs_9
          + wkwk_hrs_10
          + wkwk_hrs_11
          + wkwk_hrs_12
          + wkwk_hrs_13
          + wkwk_hrs_14
          + wkwk_hrs_15
          + wkwk_hrs_16
          + wkwk_hrs_17
          + wkwk_hrs_18
          + wkwk_hrs_19
          + wkwk_hrs_20
          + wkwk_hrs_21
          + wkwk_hrs_22
          + wkwk_hrs_23
          + wkwk_hrs_24
        ) AS adt
      FROM volumes_avg_workweek_hours
  ;
        
CREATE TABLE volumes_directional_avg_annual_daily_traffic
  AS
    SELECT
        count_id,
        federal_direction,
        GAUSSIAN_ROUND(adt / seasonal_adjustment_factor) AS directional_aadt
      FROM volumes_directional_avg_daily_traffic, seasonal_adjustment_factor
  ;

CREATE TABLE volumes_bidirectional_avg_annual_daily_traffic
  AS
    SELECT
        count_id,
        SUM(directional_aadt) AS bidirectional_aadt
      FROM volumes_directional_avg_annual_daily_traffic
      GROUP BY count_id
  ;
