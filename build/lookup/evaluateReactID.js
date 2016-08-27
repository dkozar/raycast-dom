'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = evaluateReactID;
/**
 * Checks whether the substring is present within element's React ID
 * @param sub Substring to check for
 * @param element DOM element
 * @returns {*|boolean}
 */
function evaluateReactID(sub, element) {
  var id = element.getAttribute && element.getAttribute('data-reactid');

  return id && id.indexOf(sub) > -1;
}