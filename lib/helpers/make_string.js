// Ensure some object is a coerced to a string
export function makeString(object) {
  if (object == null) return '';
  return '' + object;
}
