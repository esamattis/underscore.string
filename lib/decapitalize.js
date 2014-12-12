import {makeString} from "./helpers/make_string";

export function decapitalize(str) {
  str = makeString(str);
  return str.charAt(0).toLowerCase() + str.slice(1);
}
