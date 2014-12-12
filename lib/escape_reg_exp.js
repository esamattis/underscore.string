import {makeString} from "lib/helpers/make_string";

export function escapeRegExp(str) {
  return makeString(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
}
