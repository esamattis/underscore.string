import {makeString} from "lib/helpers/make_string";
import {defaultToWhiteSpace} from "lib/helpers/default_to_whitespace";

var nativeTrim = String.prototype.trim;
var nativeTrimLeft = String.prototype.trimLeft;
var nativeTrimRight = String.prototype.trimRight;

export function trim(str, characters){
  str = makeString(str);
  if (!characters && nativeTrim) return nativeTrim.call(str);
  characters = defaultToWhiteSpace(characters);
  return str.replace(new RegExp('^' + characters + '+|' + characters + '+$', 'g'), '');
}

export function ltrim(str, characters) {
  str = makeString(str);
  if (!characters && nativeTrimLeft) return nativeTrimLeft.call(str);
  characters = defaultToWhiteSpace(characters);
  return str.replace(new RegExp('^' + characters + '+'), '');
}

export function rtrim(str, characters) {
  str = makeString(str);
  if (!characters && nativeTrimRight) return nativeTrimRight.call(str);
  characters = defaultToWhiteSpace(characters);
  return str.replace(new RegExp(characters + '+$'), '');
}
