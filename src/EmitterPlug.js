import _ from 'lodash';
import Emitter from './Emitter';
import EmitterBase from './EmitterBase';
import Ray from './Ray';

/**
 * A plug that could be subclassed
 * Connects to Emitter passing this.handlers (defined by subclass)
 */
export default class EmitterPlug extends EmitterBase {

    //<editor-fold desc="Constructor">
    constructor() {
        super();
        this.emitter = Emitter.getInstance();
    }
    //</editor-fold>

    //<editor-fold desc="Emitter subscription">
    handleSubscription(previousCount, nextCount) {
        if (previousCount === 0 && nextCount >= 1) {
            this.emitter.connect(this.handlers);
        } else if (previousCount && nextCount === 0) {
            this.emitter.disconnect(this.handlers);
        }
    }
    //</editor-fold>
}