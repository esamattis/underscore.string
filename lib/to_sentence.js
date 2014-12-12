import {rtrim} from "lib/trim";

export function toSentence(array, separator, lastSeparator, serial) {
  separator = separator || ', ';
  lastSeparator = lastSeparator || ' and ';
  var a = array.slice(),
    lastMember = a.pop();

  if (array.length > 2 && serial) lastSeparator = rtrim(separator) + lastSeparator;

  return a.length ? a.join(separator) + lastSeparator + lastMember : lastMember;
}

export function toSentenceSerial(array, sep, lastSep) {
  return toSentence(array, sep, lastSep, true);
}
