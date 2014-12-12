import {makeString} from "lib/helpers/make_string";
import {reversedEscapeChars} from "lib/helpers/escape_chars";

export function escapeHTML(str) {
  return makeString(str).replace(/[&<>"']/g, function(m) {
    return '&' + reversedEscapeChars[m] + ';';
  });
}
