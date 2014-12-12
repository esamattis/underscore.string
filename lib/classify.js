import {camelize} from "./camelize";
import {capitalize} from "./capitalize";

export function classify(str) {
  return capitalize(camelize(String(str).replace(/[\W_]/g, ' ')).replace(/\s/g, ''));
}
