import isValidConfig from 'frampton-app/utils/is_valid_config';

export default function with_valid_config(fn) {
  return function (config) {
    if (isValidConfig(config)) {
      return fn(config);
    } else {
      throw new Error('App config is invalid');
    }
  };
}
