import {makeString} from "lib/helpers/make_string";

var nativeSlice = [].slice;

export function join() {
  var args = nativeSlice.call(arguments),
    separator = args.shift();

  return args.join(makeString(separator));
}
