import isFunction from 'frampton-utils/is_function';

export default function(callback) {
  if (isFunction(window.requestAnimationFrame)) {
    window.requestAnimationFrame(callback);
  } else {
    setTimeout(callback, (1000/60));
  }
}