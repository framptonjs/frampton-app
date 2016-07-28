import isValidConfig from 'frampton-app/utils/is_valid_config';

QUnit.module('Frampton.App.Utils.isValidConfig');

QUnit.test('Should return true for a valid config', function(assert) {
  const mockConfig = {
    init : function() {},
    update : function() {},
    view : function() {}
  };

  const actual = isValidConfig(mockConfig);
  const expected = true;

  assert.equal(actual, expected);
});

QUnit.test('Should return false for an invalid config', function(assert) {
  const mockConfig = {
    init : {},
    update : function() {},
    view : function() {}
  };

  const actual = isValidConfig(mockConfig);
  const expected = false;

  assert.equal(actual, expected);
});
