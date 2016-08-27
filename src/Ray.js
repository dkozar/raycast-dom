import _ from 'lodash';
import DomUtil from './util/dom';
import evaluateID from './lookup/evaluateID';
import evaluateClassName from './lookup/evaluateClassName';
import equalID from './lookup/equalID';

/**
 * Ray emitted by an emitter
 */
export default class Ray {

    /**
     * @param e Event
     * @param root Root element (optional, defaults to document)
     * @param position Position in screen coordinates (optional)
     */
    constructor(e, root, position) {
        this.e = e;
        this.target = e.target;
        this.root = root || document;
        this.position = position;
    }

    /**
     * @Private
     * Gets the reversed (bottom up)
     * @returns {*} Array of DOM nodes
     */
    _getPath() {
        if (!this.path) { // be lazy for performance
            this.path = DomUtil.buildPath(this.root, this.target);
        }
        return this.path;
    }

    /**
     * Gets intersections (bottom-up)
     * @returns {*} Array of DOM nodes
     */
    getIntersections(topDown) {
        var bottomUpPath = this._getPath();

        if (!topDown) {
            return bottomUpPath;
        }

        if (!this.topDownPath) { // be lazy for performance
            this.topDownPath = _.reverse(bottomUpPath);
        }

        return this.topDownPath;
    }

    /**
     * Checks if the ray is attached to the DOM
     * @returns {boolean}
     */
    isAttached() {
        var reversed = this._getPath();

        //return reversed && reversed[reversed.length - 1] === this.parentElement;
        return !!reversed;
    }

    //<editor-fold desc="Ray operations">
    /**
     * Returns true if path intersects node
     * @param node
     * @returns {boolean}
     */
    intersects(node) {
        var path = this._getPath();

        return path && path.indexOf(node) > -1;
    }

    /**
     * Returns node with specified ID if ray intersects it, otherwise false
     * @param id ID to check for
     * @param strict If true, look for exact ID. If false, use substring.
     * @returns {*}
     */
    intersectsId(id, strict) {
        var func = strict ? equalID : evaluateID;

        return this.findNode(_.partial(func, id)) || false;
    }

    /**
     * Returns node with specified className if ray intersects it, otherwise false
     * @param id ID to check for
     * @returns {*}
     */
    intersectsClass(className) {
        return this.findNode(_.partial(evaluateClassName, className));
    }

    /**
     * Finds the node using a predicate
     * @param predicate Function accepting and item and returning boolean (match)
     * @param topDown Should we start from root
     * @returns {*}
     */
    findNode(predicate, topDown) {
        var path = this._getPath();

        return topDown ?
            _.findLast(path, predicate) :
            _.find(path, predicate);
    }
    //</editor-fold>

    //<editor-fold desc="Event operations">
    preventDefault() {
        this.e.preventDefault();
    }
    //</editor-fold>

    //<editor-fold desc="toString">
    toString() {
        return 'Ray(' + this._getPath().length + ' intersections)';
    }
    //</editor-fold>
}