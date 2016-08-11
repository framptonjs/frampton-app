import isFunction from 'frampton-utils/is_function';
import isArray from 'frampton-utils/is_array';
import isNode from 'frampton-utils/is_node';

export default {
  init : isFunction,
  update : isFunction,
  view : isFunction,
  inputs : isArray,
  rootElement : isNode
};
