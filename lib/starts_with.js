import {makeString} from "lib/helpers/make_string";
import {toPositive} from "lib/helpers/to_positive";

export function startsWith(str, starts, position) {
  str = makeString(str);
  starts = '' + starts;
  position = position == null ? 0 : Math.min(toPositive(position), str.length);
  return str.lastIndexOf(starts) == position;
}
