import isValidConfig from 'frampton-app/utils/is_valid_config';

/**
 * @name withValidConfig
 * @method
 * @private
 * @memberof Frampton.App.Utils
 * @param {Object} rules An object containing validator functions
 * @param {Function} fn The function to gate
 * @returns {Function} A function that will only be called if rules are met
 */
export default function with_valid_config(rules, fn) {
  return function (config) {
    if (isValidConfig(rules, config)) {
      return fn(config);
    } else {
      throw new Error('App config is invalid');
    }
  };
}
