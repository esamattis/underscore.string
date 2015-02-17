var ok = require('assert').ok;
var strictEqual = require('assert').strictEqual;
var endsWith = require('../endsWith');


test('#endsWith', function() {
  ok(endsWith('foobar', 'bar'), 'foobar ends with bar');
  ok(endsWith('foobarfoobar', 'bar'), 'foobar ends with bar');
  ok(endsWith('foo', 'o'), 'foobar ends with o');
  ok(endsWith('foobar', 'bar'), 'foobar ends with bar');
  ok(endsWith('00018-0000062.Plone.sdh264.1a7264e6912a91aa4a81b64dc5517df7b8875994.mp4', 'mp4'), 'endsWith .mp4');
  ok(!endsWith('fooba', 'bar'), 'fooba does not end with bar');
  ok(endsWith(12345, 45), '12345 ends with 45');
  ok(!endsWith(12345, 6), '12345 does not end with 6');
  ok(endsWith('', ''), 'empty string ends with empty string');
  ok(endsWith(null, ''), 'null ends with empty string');
  ok(!endsWith(null, 'foo'), 'null ends with foo');
  ok(endsWith('foobar?', 'bar', 6), 'foobar ends with bar at position 6');
  ok(endsWith(12345, 34, 4), 'number ends with 34 at position 4');
  ok(!endsWith(12345, 45, 4), 'number ends not with 45 at position 4');
  ok(endsWith('foobä', 'ä'), 'string ends with a unicode');

  strictEqual(endsWith('vader', 'der'), true);
  strictEqual(endsWith('VADER', 'DER'), true);
  strictEqual(endsWith('VADER', 'der'), false);
  strictEqual(endsWith('VADER', 'DeR'), false);
  strictEqual(endsWith('VADER'), false);
  strictEqual(endsWith('undefined'), true);
  strictEqual(endsWith('null', null), true);
  strictEqual(endsWith('vader', 'der', 5), true);
  strictEqual(endsWith('VADER', 'DER', 5), true);
  strictEqual(endsWith('VADER', 'der', 5), false);
  strictEqual(endsWith('VADER', 'DER', 5), true);
  strictEqual(endsWith('VADER', 'der', 5), false);
  strictEqual(endsWith('vader', 'der', -20), false);
  strictEqual(endsWith('vader', 'der', 0), false);
  strictEqual(endsWith('vader', 'der', 1), false);
  strictEqual(endsWith('vader', 'der', 2), false);
  strictEqual(endsWith('vader', 'der', 3), false);
  strictEqual(endsWith('vader', 'der', 4), false);
});

