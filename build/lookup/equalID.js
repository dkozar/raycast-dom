"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = equalID;
/**
 * Checks whether the element ID is equal to ID
 * @param id ID to check for
 * @param element DOM element
 * @returns {*|boolean}
 */
function equalID(id, element) {
  return id === element.id;
}