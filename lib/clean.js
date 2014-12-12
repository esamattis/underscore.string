import {trim} from "lib/trim";

export function clean(str){
  return trim(str).replace(/\s+/g, ' ');
}
