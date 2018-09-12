import Vue from 'vue'
import Form from 'js/vue/form/Form.vue'

export default class ViewController {
    constructor() {
        if ( 'development' === process.env.NODE_ENV ) {
            console.log( this.constructor.name );
        }

        /**
         *
         * @type {Vue}
         */
        this.vm = null;
    }

    /**
     * @public
     */
    viewWillLoad() {}

    /**
     * @public
     */
    viewDidLoad() {
        this.vm = new Vue( {
            el : '#vue-form',
            components : {
                Form
            },
            template : '<Form/>'
        } );
    }

    /**
     * @public
     */
    viewWillAppear() {}

    /**
     * @public
     */
    viewDidAppear() {}

    /**
     * @public
     */
    resize() {}

    /**
     *
     * @param st {number}
     * @public
     */
    scroll( st ) {}
}