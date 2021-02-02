/*
select distinct day_of_week from short_count_volume;
+-------------+
| day_of_week |
+-------------+
| Saturday    |
| Sunday      |
| Monday      |
| Tuesday     |
| Wednesday   |
| Thursday    |
| Friday      |
+-------------+

nysdot_traffic_counts.sqlite3> select distinct day_of_week from short_count_vehicle_classification;
+-------------+
| day_of_week |
+-------------+
| Tuesday     |
| Wednesday   |
| Thursday    |
| Friday      |
+-------------+
*/

export enum DaysOfWeek {
  Sunday = 'Sunday',
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
}

// Vehicle/Axle code in Volume files: 1=Vehicle count 2=Axles/2 count.
export enum VehicleAxleCode {
  VEHICLE = 1,
  AXLE_PAIRS = 2,
}

export type CountSessionId = string

export interface ShortCountVolumeSessionMetadata {
  rc_station: string;
  count_id: CountSessionId;
  rg: number;
  region_code: number;
  county_code: number;
  stat: string;
  rcsta: string;
  functional_class: number;
  factor_group: number;
  latitude: number;
  longitude: number;
  specific_recorder_placement: string;
  channel_notes: string;
  data_type: string;
}

export interface ShortCountVolumeSessionData {
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

  // 0000 - 0100
  interval_1_1: number;
  interval_1_2: number;
  interval_1_3: number;
  interval_1_4: number;

  // 0100 - 0200
  interval_2_1: number;
  interval_2_2: number;
  interval_2_3: number;
  interval_2_4: number;

  // 0200 - 0300
  interval_3_1: number;
  interval_3_2: number;
  interval_3_3: number;
  interval_3_4: number;

  // 0300 - 0400
  interval_4_1: number;
  interval_4_2: number;
  interval_4_3: number;
  interval_4_4: number;

  // 0400 - 0500
  interval_5_1: number;
  interval_5_2: number;
  interval_5_3: number;
  interval_5_4: number;

  // 0500 - 0600
  interval_6_1: number;
  interval_6_2: number;
  interval_6_3: number;
  interval_6_4: number;

  // 0600 - 0700
  interval_7_1: number;
  interval_7_2: number;
  interval_7_3: number;
  interval_7_4: number;

  // 0700 - 0800
  interval_8_1: number;
  interval_8_2: number;
  interval_8_3: number;
  interval_8_4: number;

  // 0800 - 0900
  interval_9_1: number;
  interval_9_2: number;
  interval_9_3: number;
  interval_9_4: number;

  // 900 - 1000
  interval_10_1: number;
  interval_10_2: number;
  interval_10_3: number;
  interval_10_4: number;

  // 1000 - 1100
  interval_11_1: number;
  interval_11_2: number;
  interval_11_3: number;
  interval_11_4: number;

  // 1100 - 1200
  interval_12_1: number;
  interval_12_2: number;
  interval_12_3: number;
  interval_12_4: number;

  // 1200 - 1300
  interval_13_1: number;
  interval_13_2: number;
  interval_13_3: number;
  interval_13_4: number;

  // 1300 - 1400
  interval_14_1: number;
  interval_14_2: number;
  interval_14_3: number;
  interval_14_4: number;

  // 1400 - 1500
  interval_15_1: number;
  interval_15_2: number;
  interval_15_3: number;
  interval_15_4: number;

  // 1500 - 1600
  interval_16_1: number;
  interval_16_2: number;
  interval_16_3: number;
  interval_16_4: number;

  // 1600 - 1700
  interval_17_1: number;
  interval_17_2: number;
  interval_17_3: number;
  interval_17_4: number;

  // 1700 - 1800
  interval_18_1: number;
  interval_18_2: number;
  interval_18_3: number;
  interval_18_4: number;

  // 1800 - 1900
  interval_19_1: number;
  interval_19_2: number;
  interval_19_3: number;
  interval_19_4: number;

  // 1900 - 2000
  interval_20_1: number;
  interval_20_2: number;
  interval_20_3: number;
  interval_20_4: number;

  // 2000 - 2100
  interval_21_1: number;
  interval_21_2: number;
  interval_21_3: number;
  interval_21_4: number;

  // 2100 - 2200
  interval_22_1: number;
  interval_22_2: number;
  interval_22_3: number;
  interval_22_4: number;

  // 2200 - 2300
  interval_23_1: number;
  interval_23_2: number;
  interval_23_3: number;
  interval_23_4: number;

  // 2300 - 2400
  interval_24_1: number;
  interval_24_2: number;
  interval_24_3: number;
  interval_24_4: number;

  total: number;
  flag_field: string;
  batch_id: string
}

export type ShortCountVolumeSessionRecord = {
  count_id: CountSessionId,
  data: ShortCountVolumeSessionData[],
  meta: ShortCountVolumeSessionMetadata
}

