import {makeString} from "lib/helpers/make_string";

export function succ(str) {
  str = makeString(str);
  return str.slice(0, -1) + String.fromCharCode(str.charCodeAt(str.length - 1) + 1);
}
