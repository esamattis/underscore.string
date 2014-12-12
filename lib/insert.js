import {splice} from "lib/splice";

export function insert(str, i, substr) {
  return splice(str, i, 0, substr);
}
