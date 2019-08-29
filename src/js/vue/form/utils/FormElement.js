export default class FormElement {
  /**
   *
   * @param label {String}
   * @param key {String}
   * @param placeholder {String}
   * @param type {String}
   * @param validation {Validator}
   * @param options {{}}
   * @param require {Boolean}
   * @param errorMsg {[]}
   */
  constructor({
    label,
    key,
    placeholder,
    type,
    validation,
    options,
    require,
    errorMsg
  }) {
    this.label = label || null;
    this.key = key || "__KEY__";
    this.placeholder = placeholder || null;
    this.type = type || "text";
    this.validation = validation || null;
    this.options = options || {};
    this.require = require || false;
    this.errorMsg = errorMsg || ["入力されていません", "形式が違います"];
  }

  isRequired() {
    return null !== this.validation;
  }

  getCols() {
    if ("textarea" === this.type && this.options.cols) {
      return this.options.cols;
    } else {
      return 0;
    }
  }

  getRows() {
    if ("textarea" === this.type && this.options.rows) {
      return this.options.rows;
    } else {
      return 0;
    }
  }

  getOptions() {
    if ("select" === this.type && this.options.data) {
      return this.options.data;
    } else {
      return [];
    }
  }

  getRadios() {
    if ("radio" === this.type && this.options.data) {
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
  setOptions(data) {
    if ("select" !== this.type) {
      return;
    }

    this.options.data = data;
  }
}
