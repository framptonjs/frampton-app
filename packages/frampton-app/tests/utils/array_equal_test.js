import arrayEquals from 'frampton-app/utils/array_equal';

QUnit.module('Frampton.App.Utils.arrayEquals');

QUnit.test('returns true for identical arrays', function(assert) {
  const xs = [1, 2, 3];
  const ys = [1, 2, 3];
  const actual = arrayEquals(xs, ys);
  const expected = true;
  assert.equal(actual, expected);
});

QUnit.test('returns false for arrays with different values', function(assert) {
  const xs = [1, 2, 3];
  const ys = [1, 2, 4];
  const actual = arrayEquals(xs, ys);
  const expected = false;
  assert.equal(actual, expected);
});

QUnit.test('returns false for arrays with different lengths', function(assert) {
  const xs = [1, 2, 3];
  const ys = [1, 2, 3, 4];
  const actual = arrayEquals(xs, ys);
  const expected = false;
  assert.equal(actual, expected);
});
