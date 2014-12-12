import {makeString} from "lib/helpers/make_string";

export function include(str, needle) {
  if (needle === '') return true;
  return makeString(str).indexOf(needle) !== -1;
}
