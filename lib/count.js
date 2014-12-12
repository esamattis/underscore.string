import {makeString} from "lib/helpers/make_string";

export function count(str, substr){
  str = makeString(str);
  substr = makeString(substr);

  var count = 0,
    pos = 0,
    length = substr.length;

  while (true) {
    pos = str.indexOf(substr, pos);
    if (pos === -1) break;
    count++;
    pos += length;
  }

  return count;
}
