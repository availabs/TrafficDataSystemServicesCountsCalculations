import {
  DaysOfWeek,
  VehicleAxleCode,
  FederalDirection,
  CountSessionId,
} from '../domain/types'

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

