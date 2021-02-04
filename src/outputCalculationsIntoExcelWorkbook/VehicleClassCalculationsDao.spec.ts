import test from 'tape';

import {
  primaryDirectionWorkweekAvgHourlyCounts,
  nonprimaryDirectionWorkweekAvgHourlyCounts,
  primaryDirectionVehicleVolumes,
  nonprimaryDirectionVehicleVolumes,
  primaryDirectionNumberOfAxles,
  nonprimaryDirectionNumberOfAxles,
  primaryDirectionVehicleVolumeSum,
  nonprimaryDirectionVehicleVolumeSum,
  primaryDirectionNumberOfAxleSum,
  nonprimaryDirectionNumberOfAxleSum,
  primaryDirectionFAxle,
  nonprimaryDirectionFAxle,
  bidirectionalVehicleVolumes,
  bidirectionalNumberOfAxles,
  bidirectionalVehicleVolumeSum,
  bidirectionNumberOfAxleSum,
  bidirectionalFAxle
} from './VehicleClassCalculationsDao'


test.only('No SQL crash', (t) => {
  console.log(JSON.stringify({
    primaryDirectionWorkweekAvgHourlyCounts,
    nonprimaryDirectionWorkweekAvgHourlyCounts,

    primaryDirectionVehicleVolumes,
    nonprimaryDirectionVehicleVolumes,

    primaryDirectionNumberOfAxles,
    nonprimaryDirectionNumberOfAxles,

    primaryDirectionVehicleVolumeSum,
    nonprimaryDirectionVehicleVolumeSum,

    primaryDirectionNumberOfAxleSum,
    nonprimaryDirectionNumberOfAxleSum,

    primaryDirectionFAxle,
    nonprimaryDirectionFAxle,

    bidirectionalVehicleVolumes,
    bidirectionalNumberOfAxles,
    bidirectionalVehicleVolumeSum,
    bidirectionNumberOfAxleSum,
    bidirectionalFAxle
  }, null, 4))

  t.end()
});
