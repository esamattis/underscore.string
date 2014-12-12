import {capitalize} from "lib/capitalize";
import {underscored} from "lib/underscored";

export function humanize(str) {
  return capitalize(underscored(str).replace(/_id$/, '').replace(/_/g, ' '));
}
