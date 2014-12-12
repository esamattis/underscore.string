import {makeString} from "lib/helpers/make_string";

export function isBlank(str) {
  return (/^\s*$/).test(makeString(str));
}
