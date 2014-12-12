import {makeString} from "./helpers/make_string";

export function capitalize(str) {
  str = makeString(str);
  return str.charAt(0).toUpperCase() + str.slice(1);
}
