import {makeString} from "lib/helpers/make_string";
import {defaultToWhiteSpace} from "lib/helpers/default_to_whitespace";

var nativeTrim = String.prototype.trim;

export function trim(str, characters){
  str = makeString(str);
  if (!characters && nativeTrim) return nativeTrim.call(str);
  characters = defaultToWhiteSpace(characters);
  return str.replace(new RegExp('^' + characters + '+|' + characters + '+$', 'g'), '');
}
