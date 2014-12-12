import {makeString} from "lib/helpers/make_string";

export function stripTags(str) {
  return makeString(str).replace(/<\/?[^>]+>/g, '');
}
