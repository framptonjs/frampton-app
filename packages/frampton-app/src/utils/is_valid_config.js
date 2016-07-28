import isFunction from 'frampton-utils/is_function';

export default function is_valid_config(config) {
  if (!isFunction(config.init)) {
    return false;
  } else if (!isFunction(config.update)) {
    return false;
  } else if (!isFunction(config.view)) {
    return false;
  } else {
    return true;
  }
}
