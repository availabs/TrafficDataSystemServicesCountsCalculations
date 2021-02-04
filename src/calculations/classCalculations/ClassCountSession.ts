import _ from 'lodash'

import gaussianRound from '../../utils/gaussianRound'

export default class CountSession {
  constructor(data: ShortCountVolumeSessionRecord) {
    this.count_id = sessionRecord.count_id;
    this.metadata = sessionRecord.meta;
    this.data = sessionRecord.data;
    this.axle_adjustment_factor = sessionRecord.axle_adjustment_factor;
    this.seasonal_adjustment_factor = sessionRecord.seasonal_adjustment_factor;

    this.hourlyVolumes = getHourlyVolumes(this.data)
    this.groupedHourlyVolumes = getGroupedHourlyVolumes(this.hourlyVolumes)
    this.hourlyTotalVolumes = getHourlyTotals(this.groupedHourlyVolumes)

    this.hourIntervalAvgsByDirection = getHourIntervalAvgsByDirection(this.hourlyTotalVolumes)

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
    // console.log(JSON.stringify(this.directionalAadt, null, 4))
    // console.log(JSON.stringify(this.finalAadt, null, 4))
  }
}
