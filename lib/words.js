import {isBlank} from "lib/is_blank";
import {trim} from "lib/trim";

export function words(str, delimiter) {
  if (isBlank(str)) return [];
  return trim(str, delimiter).split(delimiter || /\s+/);
}
