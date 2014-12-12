import {makeString} from "lib/helpers/make_string";

export function chars(str) {
  return makeString(str).split('');
}
