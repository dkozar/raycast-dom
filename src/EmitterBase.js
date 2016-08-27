import _ from 'lodash';
import Ray from './Ray';

export default class EmitterBase {

    //<editor-fold desc="Constructor">
    constructor() {
        this.slots = [];
    }
    //</editor-fold>

    //<editor-fold desc="Connect/disconnect">
    // TODO: slot v2.0 should contain:
    // slot = {
    //     handlers, // current slot data
    //     elements, // array od elements to check for intersection before emitting a ray
    //     phase, // capture/bubbling phase
    //     useDetachedRays // fire detached rays
    // }
    connect(slot) {
        var len;

        if (this.isConnected(slot)) {
            return;
        }
        len = this.slots.length;
        this.slots.push(slot);
        this.handleSubscription(len, this.slots.length);
    }

    disconnect(slot) {
        var len = this.slots.length;

        _.remove(this.slots, function(subscriber) {
            return subscriber === slot;
        });
        this.handleSubscription(len, this.slots.length);
    }

    isConnected(slot) {
        return _.some(this.slots, function(subscriber) {
            return subscriber === slot;
        });
    }
    //</editor-fold>

    //<editor-fold desc="Subscription">
    /**
     * Abstract
     * @param previousCount
     * @param nextCount
     */
    handleSubscription(previousCount, nextCount) {
        // abstract
    }
    //</editor-fold>

    //<editor-fold desc="Emitting">
    createRayAndEmit(handlerName, root, e) {
        var ray;

        e = e || window.event;

        ray = new Ray(e, root, {
            x: e.clientX,
            y: e.clientY
        });

        this.emit(handlerName, ray);
    }

    emit(handlerName, ray) {
        var handler;

        _.forEach(this.slots, function(slot) {
            if (slot) { // might be undefined because firing some handlers could disconnect others (recursion)
                handler = slot[handlerName];

                // useDetachedRays - a switch *per slot object* (with false as default)
                if (ray && !ray.isAttached() && !slot.useDetachedRays) {
                    console.warn('Ray has been detached', ray.toString());
                    return false;
                }

                // TODO: if slot connected providing the 'elements' array, check for intersections of ray and any of the element. Emit only when intersection exists.
                if (handler) {
                    handler(ray);
                }
            }
        });
    }
    //</editor-fold>
}