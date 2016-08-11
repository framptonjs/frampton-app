/**
 * @name isValidConfig
 * @method
 * @private
 * @memberof Frampton.App.Utils
 * @param {Object} rules A hash of functions to validate config
 * @param {Object} config The config to validate
 * @returns {Boolean} Is the config valid
 */
export default function is_valid_config(rules, config) {
  for (let key in rules) {
    const validator = rules[key];
    const next = config[key];
    if (!next) {
      return false;
    } else if (!validator(next)) {
      return false;
    }
  }

  return true;
}
