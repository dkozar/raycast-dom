import _ from 'lodash';
import EmitterBase from './EmitterBase';
import Ray from './Ray';

// [event name, event handler name]
const ON_MOUSE_OVER = ['mouseover', 'onMouseOver'],
    ON_MOUSE_OUT = ['mouseout', 'onMouseOut'],
    ON_MOUSE_ENTER = ['mouseenter', 'onMouseEnter'],
    ON_MOUSE_LEAVE = ['mouseleave', 'onMouseLeave'],
    ON_MOUSE_DOWN = ['mousedown', 'onMouseDown'],
    ON_MOUSE_UP = ['mouseup', 'onMouseUp'],
    ON_MOUSE_MOVE = ['mousemove', 'onMouseMove'],
    ON_CLICK = ['click', 'onClick'],
    ON_DOUBLE_CLICK = ['doubleclick', 'onDoubleClick'],
    ON_CONTEXT_MENU = ['contextmenu', 'onContextMenu'],
    ON_TOUCH_START = ['touchstart', 'onTouchStart'],
    ON_TOUCH_END = ['touchend', 'onTouchEnd'],
    ON_TOUCH_MOVE = ['touchmove', 'onTouchMove'],
    ON_TOUCH_CANCEL = ['touchcancel', 'onTouchCancel'],
    ON_CHANGE = ['change', 'onChange'],
    ON_INPUT = ['input', 'onInput'],
    ON_SUBMIT = ['submit', 'onSubmit'],
    ON_FOCUS = ['focus', 'onFocus'],
    ON_BLUR = ['blur', 'onBlur'],
    ON_KEY_DOWN = ['keydown', 'onKeyDown'],
    ON_KEY_UP = ['keyup', 'onKeyUp'],
    ON_PRESS = ['press', 'onPress'],
    ON_WHEEL = ['wheel', 'onWheel'],
    ON_RESIZE = ['resize', 'onResize'],
    ON_SCROLL = ['scroll', 'onScroll'];

var instance;

/**
 * Subscribes to browser events (click, contextmenu, touchstart, touchend, resize and scroll)
 * Dispatches 3 types of events - used by the menu system - by registering handlers and firing them
 * It basically *converts* browser events to another type of events
 * The choice of triggered handlers depends of:
 * 1. is the menu currently on screen
 * 2. do we click inside or outside of the menu
 * 3. do we click/contextmenu or tap/tap-and-hold
 */
export default class Emitter extends EmitterBase {

    //<editor-fold desc="Singleton">
    static getInstance() {
        if (!instance) {
            instance = new Emitter();
        }
        return instance;
    }
    //</editor-fold>

    //<editor-fold desc="Constructor">
    constructor() {
        super();

        // document
        this[ON_MOUSE_OVER[1]] = _.bind(this.createRayAndEmit, this, ON_MOUSE_OVER[1], document);
        this[ON_MOUSE_OUT[1]] = _.bind(this.createRayAndEmit, this, ON_MOUSE_OUT[1], document);
        this[ON_MOUSE_ENTER[1]] = _.bind(this.createRayAndEmit, this, ON_MOUSE_ENTER[1], document);
        this[ON_MOUSE_LEAVE[1]] = _.bind(this.createRayAndEmit, this, ON_MOUSE_LEAVE[1], document);
        this[ON_MOUSE_DOWN[1]] = _.bind(this.createRayAndEmit, this, ON_MOUSE_DOWN[1], document);
        this[ON_MOUSE_UP[1]] = _.bind(this.createRayAndEmit, this, ON_MOUSE_UP[1], document);
        this[ON_MOUSE_MOVE[1]] = _.bind(this.createRayAndEmit, this, ON_MOUSE_MOVE[1], document);
        this[ON_CLICK[1]] = _.bind(this.createRayAndEmit, this, ON_CLICK[1], document);
        this[ON_DOUBLE_CLICK[1]] = _.bind(this.createRayAndEmit, this, ON_DOUBLE_CLICK[1], document);
        this[ON_CONTEXT_MENU[1]] = _.bind(this.createRayAndEmit, this, ON_CONTEXT_MENU[1], document);
        this[ON_TOUCH_START[1]] = _.bind(this.createRayAndEmit, this, ON_TOUCH_START[1], document);
        this[ON_TOUCH_END[1]] = _.bind(this.createRayAndEmit, this, ON_TOUCH_END[1], document);
        this[ON_TOUCH_MOVE[1]] = _.bind(this.createRayAndEmit, this, ON_TOUCH_MOVE[1], document);
        this[ON_TOUCH_CANCEL[1]] = _.bind(this.createRayAndEmit, this, ON_TOUCH_CANCEL[1], document);
        this[ON_MOUSE_OVER[1]] = _.bind(this.createRayAndEmit, this, ON_MOUSE_OVER[1], document);
        this[ON_MOUSE_OVER[1]] = _.bind(this.createRayAndEmit, this, ON_MOUSE_OVER[1], document);
        this[ON_CHANGE[1]] = _.bind(this.createRayAndEmit, this, ON_CHANGE[1], document);
        this[ON_INPUT[1]] = _.bind(this.createRayAndEmit, this, ON_INPUT[1], document);
        this[ON_SUBMIT[1]] = _.bind(this.createRayAndEmit, this, ON_SUBMIT[1], document);
        this[ON_FOCUS[1]] = _.bind(this.createRayAndEmit, this, ON_FOCUS[1], document);
        this[ON_BLUR[1]] = _.bind(this.createRayAndEmit, this, ON_BLUR[1], document);
        this[ON_KEY_DOWN[1]] = _.bind(this.createRayAndEmit, this, ON_KEY_DOWN[1], document);
        this[ON_KEY_UP[1]] = _.bind(this.createRayAndEmit, this, ON_KEY_UP[1], document);
        this[ON_PRESS[1]] = _.bind(this.createRayAndEmit, this, ON_PRESS[1], document);
        this[ON_WHEEL[1]] = _.bind(this.createRayAndEmit, this, ON_WHEEL[1], document);

        // window
        this[ON_RESIZE[1]] = _.bind(this.createRayAndEmit, this, ON_RESIZE[1], window);
        this[ON_SCROLL[1]] = _.bind(this.createRayAndEmit, this, ON_SCROLL[1], window);
    }
    //</editor-fold>

    //<editor-fold desc="Browser event subscription">
    handleSubscription(previousCount, nextCount) {
        if (previousCount === 0 && nextCount >= 1) {
            this.browserSubscribe();
        } else if (previousCount && nextCount === 0) {
            this.browserUnsubscribe();
        }
    }

    browserSubscribe() {
        // TODO: optimize, so we add listeners only for events actually used by subscribers (keep each event type count)
        // TODO: also, allow specifying the capture/bubble phase per handler
        document.body.addEventListener(ON_MOUSE_OVER[0], this[ON_MOUSE_OVER[1]], false);
        document.body.addEventListener(ON_MOUSE_OUT[0], this[ON_MOUSE_OUT[1]], false);
        document.body.addEventListener(ON_MOUSE_ENTER[0], this[ON_MOUSE_ENTER[1]], false);
        document.body.addEventListener(ON_MOUSE_LEAVE[0], this[ON_MOUSE_LEAVE[1]], false);
        document.body.addEventListener(ON_MOUSE_DOWN[0], this[ON_MOUSE_DOWN[1]], false);
        document.body.addEventListener(ON_MOUSE_UP[0], this[ON_MOUSE_UP[1]], false);
        document.body.addEventListener(ON_MOUSE_MOVE[0], this[ON_MOUSE_MOVE[1]], false);
        document.body.addEventListener(ON_CLICK[0], this[ON_CLICK[1]], false);
        document.body.addEventListener(ON_DOUBLE_CLICK[0], this[ON_DOUBLE_CLICK[1]], false);
        document.body.addEventListener(ON_CONTEXT_MENU[0], this[ON_CONTEXT_MENU[1]], false);
        document.body.addEventListener(ON_TOUCH_START[0], this[ON_TOUCH_START[1]], false);
        document.body.addEventListener(ON_TOUCH_END[0], this[ON_TOUCH_END[1]], false);
        document.body.addEventListener(ON_TOUCH_MOVE[0], this[ON_TOUCH_MOVE[1]], false);
        document.body.addEventListener(ON_TOUCH_CANCEL[0], this[ON_TOUCH_CANCEL[1]], false);
        document.body.addEventListener(ON_CHANGE[0], this[ON_CHANGE[1]], false);
        document.body.addEventListener(ON_INPUT[0], this[ON_INPUT[1]], false);
        document.body.addEventListener(ON_SUBMIT[0], this[ON_SUBMIT[1]], false);
        document.body.addEventListener(ON_FOCUS[0], this[ON_FOCUS[1]], false);
        document.body.addEventListener(ON_BLUR[0], this[ON_BLUR[1]], false);
        document.body.addEventListener(ON_KEY_DOWN[0], this[ON_KEY_DOWN[1]], false);
        document.body.addEventListener(ON_KEY_UP[0], this[ON_KEY_UP[1]], false);
        document.body.addEventListener(ON_PRESS[0], this[ON_PRESS[1]], false);
        document.body.addEventListener(ON_WHEEL[0], this[ON_WHEEL[1]], false);
        window.addEventListener(ON_RESIZE[0], this[ON_RESIZE[1]], false);
        window.addEventListener(ON_SCROLL[0], this[ON_SCROLL[1]], false);
        //console.log('subscribed')
    }

    browserUnsubscribe() {
        document.body.removeEventListener(ON_MOUSE_OVER[0], this[ON_MOUSE_OVER[1]]);
        document.body.removeEventListener(ON_MOUSE_OUT[0], this[ON_MOUSE_OUT[1]]);
        document.body.removeEventListener(ON_MOUSE_ENTER[0], this[ON_MOUSE_ENTER[1]]);
        document.body.removeEventListener(ON_MOUSE_LEAVE[0], this[ON_MOUSE_LEAVE[1]]);
        document.body.removeEventListener(ON_MOUSE_DOWN[0], this[ON_MOUSE_DOWN[1]]);
        document.body.removeEventListener(ON_MOUSE_UP[0], this[ON_MOUSE_UP[1]]);
        document.body.removeEventListener(ON_MOUSE_MOVE[0], this[ON_MOUSE_MOVE[1]]);
        document.body.removeEventListener(ON_CLICK[0], this[ON_CLICK[1]]);
        document.body.removeEventListener(ON_DOUBLE_CLICK[0], this[ON_DOUBLE_CLICK[1]]);
        document.body.removeEventListener(ON_CONTEXT_MENU[0], this[ON_CONTEXT_MENU[1]]);
        document.body.removeEventListener(ON_TOUCH_START[0], this[ON_TOUCH_START[1]]);
        document.body.removeEventListener(ON_TOUCH_END[0], this[ON_TOUCH_END[1]]);
        document.body.removeEventListener(ON_TOUCH_MOVE[0], this[ON_TOUCH_MOVE[1]]);
        document.body.removeEventListener(ON_TOUCH_CANCEL[0], this[ON_TOUCH_CANCEL[1]]);
        document.body.removeEventListener(ON_CHANGE[0], this[ON_CHANGE[1]]);
        document.body.removeEventListener(ON_INPUT[0], this[ON_INPUT[1]]);
        document.body.removeEventListener(ON_SUBMIT[0], this[ON_SUBMIT[1]]);
        document.body.removeEventListener(ON_FOCUS[0], this[ON_FOCUS[1]]);
        document.body.removeEventListener(ON_BLUR[0], this[ON_BLUR[1]]);
        document.body.removeEventListener(ON_KEY_DOWN[0], this[ON_KEY_DOWN[1]]);
        document.body.removeEventListener(ON_KEY_UP[0], this[ON_KEY_UP[1]]);
        document.body.removeEventListener(ON_PRESS[0], this[ON_PRESS[1]]);
        document.body.removeEventListener(ON_WHEEL[0], this[ON_WHEEL[1]]);
        window.removeEventListener(ON_RESIZE[0], this[ON_RESIZE[1]]);
        window.removeEventListener(ON_SCROLL[0], this[ON_SCROLL[1]]);
        //console.log('unsubscribed')
    }
    //</editor-fold>
}

//<editor-fold desc="Constants">
// make accessible from the outside
Emitter.ON_MOUSE_OVER = ON_MOUSE_OVER[1];
Emitter.ON_MOUSE_OUT = ON_MOUSE_OUT[1];
Emitter.ON_MOUSE_ENTER = ON_MOUSE_ENTER[1];
Emitter.ON_MOUSE_LEAVE = ON_MOUSE_LEAVE[1];
Emitter.ON_TOUCH_START_INSIDE = ON_MOUSE_DOWN[1];
Emitter.ON_MOUSE_UP = ON_MOUSE_UP[1];
Emitter.ON_MOUSE_MOVE = ON_MOUSE_MOVE[1];
Emitter.ON_CLICK = ON_CLICK[1];
Emitter.ON_DOUBLE_CLICK = ON_DOUBLE_CLICK[1];
Emitter.ON_CONTEXT_MENU = ON_CONTEXT_MENU[1];
Emitter.ON_TOUCH_START_INSIDE = ON_TOUCH_START[1];
Emitter.ON_TOUCH_END = ON_TOUCH_END[1];
Emitter.ON_TOUCH_CANCEL = ON_TOUCH_CANCEL[1];
Emitter.ON_CHANGE = ON_CHANGE[1];
Emitter.ON_INPUT = ON_INPUT[1];
Emitter.ON_SUBMIT = ON_SUBMIT[1];
Emitter.ON_FOCUS = ON_FOCUS[1];
Emitter.ON_BLUR = ON_BLUR[1];
Emitter.ON_KEY_DOWN = ON_KEY_DOWN[1];
Emitter.ON_KEY_UP = ON_KEY_UP[1];
Emitter.ON_PRESS = ON_PRESS[1];
Emitter.ON_WHEEL = ON_WHEEL[1];
Emitter.ON_RESIZE = ON_RESIZE[1];
Emitter.ON_SCROLL = ON_SCROLL[1];
//</editor-fold>