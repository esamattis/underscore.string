import {chars} from "lib/chars";

export function reverse(str) {
  return chars(str).reverse().join('');
}
