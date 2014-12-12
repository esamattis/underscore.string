import {parseNumber} from "lib/helpers/parse_number";
import {trim} from "lib/trim";

export function toNumber(str, decimals) {
  if (!str) return 0;
  str = trim(str);
  if (!str.match(/^-?\d+(?:\.\d+)?$/)) return NaN;
  return parseNumber(parseNumber(str).toFixed(~~decimals));
}
