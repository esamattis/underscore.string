import {makeString} from "lib/helpers/make_string";
import {strRepeat} from "lib/helpers/str_repeat";

export function repeat(str, qty, separator) {
  str = makeString(str);

  qty = ~~qty;

  // using faster implementation if separator is not needed;
  if (separator == null) return strRepeat(str, qty);

  // this one is about 300x slower in Google Chrome
  for (var repeat = []; qty > 0; repeat[--qty] = str) {}
  return repeat.join(separator);
}
