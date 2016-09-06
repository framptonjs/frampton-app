import isValidConfig from 'frampton-app/utils/is_valid_config';
import isFunction from 'frampton-utils/is_function';

QUnit.module('Frampton.App.Utils.isValidConfig');

QUnit.test('Should validate an object based on a set of rules', function(assert) {
  const mockConfig = {
    init : function() {},
    update : function() {},
    view : function() {}
  };

  const mockRules = {
    init : isFunction,
    update : isFunction,
    view : isFunction
  };

  const actual = isValidConfig(mockRules, mockConfig);
  const expected = true;

  assert.equal(actual, expected);
});

QUnit.test('Should return false for an invalid config', function(assert) {
  const mockConfig = {
    init : {},
    update : function() {},
    view : function() {}
  };

  const mockRules = {
    init : isFunction,
    update : isFunction,
    view : isFunction
  };

  const actual = isValidConfig(mockRules, mockConfig);
  const expected = false;

  assert.equal(actual, expected);
});
