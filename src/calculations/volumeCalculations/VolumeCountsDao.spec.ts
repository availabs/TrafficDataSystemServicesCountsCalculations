import test from 'tape';

import {makeVolumeCountsDataIterator} from './VolumeCountsDao'

test('Get Short Counts Session Record', (t) => {
  const iter = makeVolumeCountsDataIterator()

  for (const row of iter) {
    t.ok(row.data.length > 0)
  }

  t.end()
});
