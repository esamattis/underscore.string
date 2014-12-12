import {camelize} from "lib/camelize";
import {capitalize} from "lib/capitalize";

export function classify(str) {
  return capitalize(camelize(String(str).replace(/[\W_]/g, ' ')).replace(/\s/g, ''));
}
