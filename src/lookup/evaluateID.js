/**
 * Checks whether the substring is present within element ID
 * @param sub Substring to check for
 * @param element DOM element
 * @returns {*|boolean}
 */
export default function evaluateID(sub, element) {
    var id = element.id;

    return id && id.indexOf(sub) === 0;
}