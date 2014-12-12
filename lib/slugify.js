import {makeString} from "lib/helpers/make_string";
import {defaultToWhiteSpace} from "lib/helpers/default_to_whitespace";
import {trim} from "lib/trim";
import {dasherize} from "lib/dasherize";

export function slugify(str) {
  var from = "ąàáäâãåæăćčĉęèéëêĝĥìíïîĵłľńňòóöőôõðøśșšŝťțŭùúüűûñÿýçżźž",
    to = "aaaaaaaaaccceeeeeghiiiijllnnoooooooossssttuuuuuunyyczzz",
    regex = new RegExp(defaultToWhiteSpace(from), 'g');

  str = makeString(str).toLowerCase().replace(regex, function(c) {
    var index = from.indexOf(c);
    return to.charAt(index) || '-';
  });

  return trim(dasherize(str.replace(/[^\w\s-]/g, '-')), '-');
}
