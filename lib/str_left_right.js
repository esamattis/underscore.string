import {makeString} from "lib/helpers/make_string";

export function strRight(str, sep){
  str = makeString(str); sep = makeString(sep);
  var pos = !sep ? -1 : str.indexOf(sep);
  return ~pos ? str.slice(pos+sep.length, str.length) : str;
}

export function strRightBack(str, sep){
  str = makeString(str); sep = makeString(sep);
  var pos = !sep ? -1 : str.lastIndexOf(sep);
  return ~pos ? str.slice(pos+sep.length, str.length) : str;
}

export function strLeft(str, sep){
  str = makeString(str); sep = makeString(sep);
  var pos = !sep ? -1 : str.indexOf(sep);
  return ~pos ? str.slice(0, pos) : str;
}

export function strLeftBack(str, sep){
  str = makeString(str); sep = makeString(sep);
  var pos = str.lastIndexOf(sep);
  return ~pos ? str.slice(0, pos) : str;
}
