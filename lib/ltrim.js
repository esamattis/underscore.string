import {makeString} from "lib/helpers/make_string";
import {defaultToWhiteSpace} from "lib/helpers/default_to_whitespace";

var nativeTrimLeft = String.prototype.trimLeft;

export function ltrim(str, characters) {
  str = makeString(str);
  if (!characters && nativeTrimLeft) return nativeTrimLeft.call(str);
  characters = defaultToWhiteSpace(characters);
  return str.replace(new RegExp('^' + characters + '+'), '');
}
