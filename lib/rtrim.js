import {makeString} from "lib/helpers/make_string";
import {defaultToWhiteSpace} from "lib/helpers/default_to_whitespace";

var nativeTrimRight = String.prototype.trimRight;

export function rtrim(str, characters) {
  str = makeString(str);
  if (!characters && nativeTrimRight) return nativeTrimRight.call(str);
  characters = defaultToWhiteSpace(characters);
  return str.replace(new RegExp(characters + '+$'), '');
}
