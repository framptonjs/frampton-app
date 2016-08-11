export default function array_equal(xs, ys) {
  const xsLen = xs.length;
  const ysLen = ys.length;

  if (xsLen !== ysLen) {
    return false;
  } else {
    for (let i = 0; i < xsLen; i++) {
      if (xs[i] !== ys[i]) {
        return false;
      }
    }
  }

  return true;
}
