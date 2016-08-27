/**
 * Checks whether the substring is present within element's React ID
 * @param sub Substring to check for
 * @param element DOM element
 * @returns {*|boolean}
 */
export default function evaluateReactID(sub, element) {
    var id = element.getAttribute && element.getAttribute('data-reactid');

    return id && id.indexOf(sub) > -1;
}