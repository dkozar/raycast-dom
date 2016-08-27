/**
 * Checks whether the element ID is equal to ID
 * @param id ID to check for
 * @param element DOM element
 * @returns {*|boolean}
 */
export default function equalID(id, element) {
    return id === element.id;
}