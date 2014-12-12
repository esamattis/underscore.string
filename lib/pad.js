import {makeString} from "lib/helpers/make_string";
import {strRepeat} from "lib/helpers/str_repeat";

export function pad(str, length, padStr, type) {
  str = makeString(str);
  length = ~~length;

  var padlen = 0;

  if (!padStr)
    padStr = ' ';
  else if (padStr.length > 1)
    padStr = padStr.charAt(0);

  switch (type) {
    case 'right':
      padlen = length - str.length;
      return str + strRepeat(padStr, padlen);
    case 'both':
      padlen = length - str.length;
      return strRepeat(padStr, Math.ceil(padlen / 2)) + str + strRepeat(padStr, Math.floor(padlen / 2));
    default: // 'left'
      padlen = length - str.length;
      return strRepeat(padStr, padlen) + str;
  }
}

export function lpad(str, length, padStr) {
  return pad(str, length, padStr);
}

export function rpad(str, length, padStr) {
  return pad(str, length, padStr, 'right');
}

export function lrpad(str, length, padStr) {
  return pad(str, length, padStr, 'both');
}
