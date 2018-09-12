export default class FormElement {
    /**
     *
     * @type {{label: string, key: string, placeholder: string, type: string, validation: string|RegExp, options: object, require: boolean, errorMsg: [string]}}
     */
    constructor( config ) {

        this.label = config.label || '__LABEL__';
        this.key = config.key || '__KEY__';
        this.placeholder = config.placeholder || null;
        this.type = config.type || 'text';
        this.validation = config.validation || null;
        this.options = config.options || {};
        this.require = config.require || false;
        this.errorMsg = config.errorMsg || [ '入力されていません', '形式が違います' ];

    }

    isRequired() {
        return null !== this.validation;
    }

    getCols() {
        if ( 'textarea' === this.type && this.options.cols ) {
            return this.options.cols;
        } else {
            return 0;
        }
    }

    getRows() {
        if ( 'textarea' === this.type && this.options.rows ) {
            return this.options.rows;
        } else {
            return 0;
        }
    }

    getOptions() {
        if ( 'select' === this.type && this.options.data ) {
            return this.options.data;
        } else {
            return [];
        }
    }

    getRadios(){
        if ( 'radio' === this.type && this.options.data ) {
            return this.options.data;
        } else {
            return [];
        }
    }

    /**
     *
     * @param data {[]}
     * @return {*}
     */
    setOptions( data ) {
        if ( 'select' !== this.type ) {
            return;
        }

        this.options.data = data;
    }

}