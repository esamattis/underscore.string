import {trim} from "./trim";

export function clean(str){
  return trim(str).replace(/\s+/g, ' ');
}
