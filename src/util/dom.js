export default class DomUtil {

    static buildPath(parentElement, childElement) {
        var path = [],
            node;

        path.push(childElement);

        if (childElement === parentElement) {
            return path;
        }

        node = childElement.parentNode;

        while (node != null) {
            path.push(node);
            if (node === parentElement) {
                return path;
            }
            node = node.parentNode;
        }
        return false; // not a real path
    }
}