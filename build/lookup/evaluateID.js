"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = evaluateID;
/**
 * Checks whether the substring is present within element ID
 * @param sub Substring to check for
 * @param element DOM element
 * @returns {*|boolean}
 */
function evaluateID(sub, element) {
  var id = element.id;

  return id && id.indexOf(sub) === 0;
}