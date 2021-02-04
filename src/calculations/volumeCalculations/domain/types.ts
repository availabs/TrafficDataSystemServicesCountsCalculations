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

export enum FederalDirection {
  North = 1,
  Northeast = 2,
  East = 3,
  Southeast = 4,
  South = 5,
  Southwest = 6,
  West = 7,
  Northwest = 8,
  North_South = 9,
  East_West = 0,
}


export enum IntervalNames {
  // 0000 - 0100
  interval_1_1 = 'interval_1_1',
  interval_1_2 = 'interval_1_2',
  interval_1_3 = 'interval_1_3',
  interval_1_4 = 'interval_1_4',

  // 0100 - 0200
  interval_2_1 = 'interval_2_1',
  interval_2_2 = 'interval_2_2',
  interval_2_3 = 'interval_2_3',
  interval_2_4 = 'interval_2_4',

  // 0200 - 0300
  interval_3_1 = 'interval_3_1',
  interval_3_2 = 'interval_3_2',
  interval_3_3 = 'interval_3_3',
  interval_3_4 = 'interval_3_4',

  // 0300 - 0400
  interval_4_1 = 'interval_4_1',
  interval_4_2 = 'interval_4_2',
  interval_4_3 = 'interval_4_3',
  interval_4_4 = 'interval_4_4',

  // 0400 - 0500
  interval_5_1 = 'interval_5_1',
  interval_5_2 = 'interval_5_2',
  interval_5_3 = 'interval_5_3',
  interval_5_4 = 'interval_5_4',

  // 0500 - 0600
  interval_6_1 = 'interval_6_1',
  interval_6_2 = 'interval_6_2',
  interval_6_3 = 'interval_6_3',
  interval_6_4 = 'interval_6_4',

  // 0600 - 0700
  interval_7_1 = 'interval_7_1',
  interval_7_2 = 'interval_7_2',
  interval_7_3 = 'interval_7_3',
  interval_7_4 = 'interval_7_4',

  // 0700 - 0800
  interval_8_1 = 'interval_8_1',
  interval_8_2 = 'interval_8_2',
  interval_8_3 = 'interval_8_3',
  interval_8_4 = 'interval_8_4',

  // 0800 - 0900
  interval_9_1 = 'interval_9_1',
  interval_9_2 = 'interval_9_2',
  interval_9_3 = 'interval_9_3',
  interval_9_4 = 'interval_9_4',

  // 900 - 1000
  interval_10_1 = 'interval_10_1',
  interval_10_2 = 'interval_10_2',
  interval_10_3 = 'interval_10_3',
  interval_10_4 = 'interval_10_4',

  // 1000 - 1100
  interval_11_1 = 'interval_11_1',
  interval_11_2 = 'interval_11_2',
  interval_11_3 = 'interval_11_3',
  interval_11_4 = 'interval_11_4',

  // 1100 - 1200
  interval_12_1 = 'interval_12_1',
  interval_12_2 = 'interval_12_2',
  interval_12_3 = 'interval_12_3',
  interval_12_4 = 'interval_12_4',

  // 1200 - 1300
  interval_13_1 = 'interval_13_1',
  interval_13_2 = 'interval_13_2',
  interval_13_3 = 'interval_13_3',
  interval_13_4 = 'interval_13_4',

  // 1300 - 1400
  interval_14_1 = 'interval_14_1',
  interval_14_2 = 'interval_14_2',
  interval_14_3 = 'interval_14_3',
  interval_14_4 = 'interval_14_4',

  // 1400 - 1500
  interval_15_1 = 'interval_15_1',
  interval_15_2 = 'interval_15_2',
  interval_15_3 = 'interval_15_3',
  interval_15_4 = 'interval_15_4',

  // 1500 - 1600
  interval_16_1 = 'interval_16_1',
  interval_16_2 = 'interval_16_2',
  interval_16_3 = 'interval_16_3',
  interval_16_4 = 'interval_16_4',

  // 1600 - 1700
  interval_17_1 = 'interval_17_1',
  interval_17_2 = 'interval_17_2',
  interval_17_3 = 'interval_17_3',
  interval_17_4 = 'interval_17_4',

  // 1700 - 1800
  interval_18_1 = 'interval_18_1',
  interval_18_2 = 'interval_18_2',
  interval_18_3 = 'interval_18_3',
  interval_18_4 = 'interval_18_4',

  // 1800 - 1900
  interval_19_1 = 'interval_19_1',
  interval_19_2 = 'interval_19_2',
  interval_19_3 = 'interval_19_3',
  interval_19_4 = 'interval_19_4',

  // 1900 - 2000
  interval_20_1 = 'interval_20_1',
  interval_20_2 = 'interval_20_2',
  interval_20_3 = 'interval_20_3',
  interval_20_4 = 'interval_20_4',

  // 2000 - 2100
  interval_21_1 = 'interval_21_1',
  interval_21_2 = 'interval_21_2',
  interval_21_3 = 'interval_21_3',
  interval_21_4 = 'interval_21_4',

  // 2100 - 2200
  interval_22_1 = 'interval_22_1',
  interval_22_2 = 'interval_22_2',
  interval_22_3 = 'interval_22_3',
  interval_22_4 = 'interval_22_4',

  // 2200 - 2300
  interval_23_1 = 'interval_23_1',
  interval_23_2 = 'interval_23_2',
  interval_23_3 = 'interval_23_3',
  interval_23_4 = 'interval_23_4',

  // 2300 - 2400
  interval_24_1 = 'interval_24_1',
  interval_24_2 = 'interval_24_2',
  interval_24_3 = 'interval_24_3',
  interval_24_4 = 'interval_24_4',
}

export type CountSessionId = string

export interface ShortCountVolumeSessionRecord {
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

  vehicle_axle_code: VehicleAxleCode;
  year: number;
  month: number;
  day: number;
  day_of_week: string;
  federal_direction: FederalDirection;
  lane_code: number;
  lanes_in_direction: number;
  collection_interval: number;

  [IntervalNames.interval_1_1]: number;
  [IntervalNames.interval_1_2]: number;
  [IntervalNames.interval_1_3]: number;
  [IntervalNames.interval_1_4]: number;
  [IntervalNames.interval_2_1]: number;
  [IntervalNames.interval_2_2]: number;
  [IntervalNames.interval_2_3]: number;
  [IntervalNames.interval_2_4]: number;
  [IntervalNames.interval_3_1]: number;
  [IntervalNames.interval_3_2]: number;
  [IntervalNames.interval_3_3]: number;
  [IntervalNames.interval_3_4]: number;
  [IntervalNames.interval_4_1]: number;
  [IntervalNames.interval_4_2]: number;
  [IntervalNames.interval_4_3]: number;
  [IntervalNames.interval_4_4]: number;
  [IntervalNames.interval_5_1]: number;
  [IntervalNames.interval_5_2]: number;
  [IntervalNames.interval_5_3]: number;
  [IntervalNames.interval_5_4]: number;
  [IntervalNames.interval_6_1]: number;
  [IntervalNames.interval_6_2]: number;
  [IntervalNames.interval_6_3]: number;
  [IntervalNames.interval_6_4]: number;
  [IntervalNames.interval_7_1]: number;
  [IntervalNames.interval_7_2]: number;
  [IntervalNames.interval_7_3]: number;
  [IntervalNames.interval_7_4]: number;
  [IntervalNames.interval_8_1]: number;
  [IntervalNames.interval_8_2]: number;
  [IntervalNames.interval_8_3]: number;
  [IntervalNames.interval_8_4]: number;
  [IntervalNames.interval_9_1]: number;
  [IntervalNames.interval_9_2]: number;
  [IntervalNames.interval_9_3]: number;
  [IntervalNames.interval_9_4]: number;
  [IntervalNames.interval_10_1]: number;
  [IntervalNames.interval_10_2]: number;
  [IntervalNames.interval_10_3]: number;
  [IntervalNames.interval_10_4]: number;
  [IntervalNames.interval_11_1]: number;
  [IntervalNames.interval_11_2]: number;
  [IntervalNames.interval_11_3]: number;
  [IntervalNames.interval_11_4]: number;
  [IntervalNames.interval_12_1]: number;
  [IntervalNames.interval_12_2]: number;
  [IntervalNames.interval_12_3]: number;
  [IntervalNames.interval_12_4]: number;
  [IntervalNames.interval_13_1]: number;
  [IntervalNames.interval_13_2]: number;
  [IntervalNames.interval_13_3]: number;
  [IntervalNames.interval_13_4]: number;
  [IntervalNames.interval_14_1]: number;
  [IntervalNames.interval_14_2]: number;
  [IntervalNames.interval_14_3]: number;
  [IntervalNames.interval_14_4]: number;
  [IntervalNames.interval_15_1]: number;
  [IntervalNames.interval_15_2]: number;
  [IntervalNames.interval_15_3]: number;
  [IntervalNames.interval_15_4]: number;
  [IntervalNames.interval_16_1]: number;
  [IntervalNames.interval_16_2]: number;
  [IntervalNames.interval_16_3]: number;
  [IntervalNames.interval_16_4]: number;
  [IntervalNames.interval_17_1]: number;
  [IntervalNames.interval_17_2]: number;
  [IntervalNames.interval_17_3]: number;
  [IntervalNames.interval_17_4]: number;
  [IntervalNames.interval_18_1]: number;
  [IntervalNames.interval_18_2]: number;
  [IntervalNames.interval_18_3]: number;
  [IntervalNames.interval_18_4]: number;
  [IntervalNames.interval_19_1]: number;
  [IntervalNames.interval_19_2]: number;
  [IntervalNames.interval_19_3]: number;
  [IntervalNames.interval_19_4]: number;
  [IntervalNames.interval_20_1]: number;
  [IntervalNames.interval_20_2]: number;
  [IntervalNames.interval_20_3]: number;
  [IntervalNames.interval_20_4]: number;
  [IntervalNames.interval_21_1]: number;
  [IntervalNames.interval_21_2]: number;
  [IntervalNames.interval_21_3]: number;
  [IntervalNames.interval_21_4]: number;
  [IntervalNames.interval_22_1]: number;
  [IntervalNames.interval_22_2]: number;
  [IntervalNames.interval_22_3]: number;
  [IntervalNames.interval_22_4]: number;
  [IntervalNames.interval_23_1]: number;
  [IntervalNames.interval_23_2]: number;
  [IntervalNames.interval_23_3]: number;
  [IntervalNames.interval_23_4]: number;
  [IntervalNames.interval_24_1]: number;
  [IntervalNames.interval_24_2]: number;
  [IntervalNames.interval_24_3]: number;
  [IntervalNames.interval_24_4]: number;

  total: number;
  flag_field: string;
  batch_id: string
}

export enum HourlyIntervalNames {
  interval_1 = 'interval_1',
  interval_2 = 'interval_2',
  interval_3 = 'interval_3',
  interval_4 = 'interval_4',
  interval_5 = 'interval_5',
  interval_6 = 'interval_6',
  interval_7 = 'interval_7',
  interval_8 = 'interval_8',
  interval_9 = 'interval_9',
  interval_10 = 'interval_10',
  interval_11 = 'interval_11',
  interval_12 = 'interval_12',
  interval_13 = 'interval_13',
  interval_14 = 'interval_14',
  interval_15 = 'interval_15',
  interval_16 = 'interval_16',
  interval_17 = 'interval_17',
  interval_18 = 'interval_18',
  interval_19 = 'interval_19',
  interval_20 = 'interval_20',
  interval_21 = 'interval_21',
  interval_22 = 'interval_22',
  interval_23 = 'interval_23',
  interval_24 = 'interval_24',
}

export interface HourlyVolumes {
  count_id: CountSessionId;
  vehicle_axle_code: VehicleAxleCode;
  year: number;
  month: number;
  day: number;
  day_of_week: DaysOfWeek;
  federal_direction: FederalDirection;
  lane_code: number;
  lanes_in_direction: number;
  collection_interval: number;

  [HourlyIntervalNames.interval_1]: number;
  [HourlyIntervalNames.interval_2]: number;
  [HourlyIntervalNames.interval_3]: number;
  [HourlyIntervalNames.interval_4]: number;
  [HourlyIntervalNames.interval_5]: number;
  [HourlyIntervalNames.interval_6]: number;
  [HourlyIntervalNames.interval_7]: number;
  [HourlyIntervalNames.interval_8]: number;
  [HourlyIntervalNames.interval_9]: number;
  [HourlyIntervalNames.interval_10]: number;
  [HourlyIntervalNames.interval_11]: number;
  [HourlyIntervalNames.interval_12]: number;
  [HourlyIntervalNames.interval_13]: number;
  [HourlyIntervalNames.interval_14]: number;
  [HourlyIntervalNames.interval_15]: number;
  [HourlyIntervalNames.interval_16]: number;
  [HourlyIntervalNames.interval_17]: number;
  [HourlyIntervalNames.interval_18]: number;
  [HourlyIntervalNames.interval_19]: number;
  [HourlyIntervalNames.interval_20]: number;
  [HourlyIntervalNames.interval_21]: number;
  [HourlyIntervalNames.interval_22]: number;
  [HourlyIntervalNames.interval_23]: number;
  [HourlyIntervalNames.interval_24]: number;

  total: number;
  flag_field: string;
  batch_id: string
}

export interface GroupedHourlyVolumes {
  vehicle_axle_code: VehicleAxleCode,
  federal_direction: FederalDirection,
  day_of_week: DaysOfWeek;
  lane_code: number;

  [HourlyIntervalNames.interval_1]: number[];
  [HourlyIntervalNames.interval_2]: number[];
  [HourlyIntervalNames.interval_3]: number[];
  [HourlyIntervalNames.interval_4]: number[];
  [HourlyIntervalNames.interval_5]: number[];
  [HourlyIntervalNames.interval_6]: number[];
  [HourlyIntervalNames.interval_7]: number[];
  [HourlyIntervalNames.interval_8]: number[];
  [HourlyIntervalNames.interval_9]: number[];
  [HourlyIntervalNames.interval_10]: number[];
  [HourlyIntervalNames.interval_11]: number[];
  [HourlyIntervalNames.interval_12]: number[];
  [HourlyIntervalNames.interval_13]: number[];
  [HourlyIntervalNames.interval_14]: number[];
  [HourlyIntervalNames.interval_15]: number[];
  [HourlyIntervalNames.interval_16]: number[];
  [HourlyIntervalNames.interval_17]: number[];
  [HourlyIntervalNames.interval_18]: number[];
  [HourlyIntervalNames.interval_19]: number[];
  [HourlyIntervalNames.interval_20]: number[];
  [HourlyIntervalNames.interval_21]: number[];
  [HourlyIntervalNames.interval_22]: number[];
  [HourlyIntervalNames.interval_23]: number[];
  [HourlyIntervalNames.interval_24]: number[];
}

export interface DayOfWeekHourlyVolumes {
  vehicle_axle_code: VehicleAxleCode,
  federal_direction: FederalDirection,
  day_of_week: DaysOfWeek;
  lane_code: number;

  [HourlyIntervalNames.interval_1]: number[];
  [HourlyIntervalNames.interval_2]: number[];
  [HourlyIntervalNames.interval_3]: number[];
  [HourlyIntervalNames.interval_4]: number[];
  [HourlyIntervalNames.interval_5]: number[];
  [HourlyIntervalNames.interval_6]: number[];
  [HourlyIntervalNames.interval_7]: number[];
  [HourlyIntervalNames.interval_8]: number[];
  [HourlyIntervalNames.interval_9]: number[];
  [HourlyIntervalNames.interval_10]: number[];
  [HourlyIntervalNames.interval_11]: number[];
  [HourlyIntervalNames.interval_12]: number[];
  [HourlyIntervalNames.interval_13]: number[];
  [HourlyIntervalNames.interval_14]: number[];
  [HourlyIntervalNames.interval_15]: number[];
  [HourlyIntervalNames.interval_16]: number[];
  [HourlyIntervalNames.interval_17]: number[];
  [HourlyIntervalNames.interval_18]: number[];
  [HourlyIntervalNames.interval_19]: number[];
  [HourlyIntervalNames.interval_20]: number[];
  [HourlyIntervalNames.interval_21]: number[];
  [HourlyIntervalNames.interval_22]: number[];
  [HourlyIntervalNames.interval_23]: number[];
  [HourlyIntervalNames.interval_24]: number[];
}


export interface AverageHourlyVolumes {
  count_id: CountSessionId;
  vehicle_axle_code: VehicleAxleCode;
  federal_direction: FederalDirection;
  day_of_week: DaysOfWeek;
  lane_code: number;

  [HourlyIntervalNames.interval_1]: number;
  [HourlyIntervalNames.interval_2]: number;
  [HourlyIntervalNames.interval_3]: number;
  [HourlyIntervalNames.interval_4]: number;
  [HourlyIntervalNames.interval_5]: number;
  [HourlyIntervalNames.interval_6]: number;
  [HourlyIntervalNames.interval_7]: number;
  [HourlyIntervalNames.interval_8]: number;
  [HourlyIntervalNames.interval_9]: number;
  [HourlyIntervalNames.interval_10]: number;
  [HourlyIntervalNames.interval_11]: number;
  [HourlyIntervalNames.interval_12]: number;
  [HourlyIntervalNames.interval_13]: number;
  [HourlyIntervalNames.interval_14]: number;
  [HourlyIntervalNames.interval_15]: number;
  [HourlyIntervalNames.interval_16]: number;
  [HourlyIntervalNames.interval_17]: number;
  [HourlyIntervalNames.interval_18]: number;
  [HourlyIntervalNames.interval_19]: number;
  [HourlyIntervalNames.interval_20]: number;
  [HourlyIntervalNames.interval_21]: number;
  [HourlyIntervalNames.interval_22]: number;
  [HourlyIntervalNames.interval_23]: number;
  [HourlyIntervalNames.interval_24]: number;
}

