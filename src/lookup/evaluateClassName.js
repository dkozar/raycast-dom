const BLANK_STRING = ' ';

/**
 * Checks whether the substring is present within element className
 * @param sub Substring to check for
 * @param element DOM element
 * @returns {*|boolean}
 */
export default function evaluateClassName(sub, element) {
    var className = BLANK_STRING + element.className + BLANK_STRING;

    sub = BLANK_STRING + sub + BLANK_STRING;
    return className && className.indexOf(sub) > -1;
}