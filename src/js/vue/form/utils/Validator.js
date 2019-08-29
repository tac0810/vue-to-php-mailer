export default class Validator {
  /**
   * 半角数
   * @return {RegExp}
   * @constructor
   */
  static get PAT_NUMBER() {
    return /^[0-9]+$/;
  }

  /**
   *
   * メールアドレス
   * @return {RegExp}
   * @constructor
   */
  static get PAT_EMAIL() {
    return /^[0-9,A-Z,a-z][0-9,a-z,A-Z,_,\.,\-,\+]+@[0-9,A-Z,a-z][0-9,a-z,A-Z,\.,\-]+\.[a-z]+$/;
  }

  /**
   * 半角英
   * @return {RegExp}
   * @constructor
   */
  static get PAT_ALPHABET() {
    return /^[a-zA-Z]+$/;
  }

  /**
   * 半角英数
   * @return {RegExp}
   * @constructor
   */
  static get PAT_ALPHANUMERIC() {
    return /^[0-9A-Za-z]+$/;
  }

  /**
   * 全角文字 (半角以外)
   * @return {RegExp}
   * @constructor
   */
  static get PAT_ZENKAKU() {
    return /^[^\x01-\x7E\xA1-\xDF]+$/;
  }

  /**
   * 全角カタカナ
   * @return {RegExp}
   * @constructor
   */
  static get PAT_KATAKANA() {
    return /^[ァ-ヶー　]*$/;
  }

  /**
   * 全角ひらがな
   * @return {RegExp}
   * @constructor
   */
  static get PAT_KANA() {
    return /^ぁ-ん/;
  }

  /**
   * 電話番号(xxx-xxxx-xxxx)
   * @return {RegExp}
   * @constructor
   */
  static get PAT_PHONENUMBER_WITH_HYPHEN() {
    return /^\d{2,4}\-?\d{2,4}\-?\d{2,4}$/;
  }

  /**
   * 電話番号
   * @return {RegExp}
   * @constructor
   */
  static get PAT_PHONENUMBER() {
    return /^(0{1}\d{1,4}-{0,1}\d{1,4}-{0,1}\d{4})$/;
  }

  /**
   * 郵便番号
   * @return {RegExp}
   * @constructor
   */
  static get PAT_ZIPCODE() {
    return /^\d{3}-\d{4}$/;
  }

  /**
   *
   * @param value value {string | number}
   * @param from value {number}
   * @param to {number}
   * @return {boolean}
   */
  static between(value, from, to) {
    let len = String(value).length;
    return from <= len && len <= to;
  }

  /**
   *
   * @param value value {string | number}
   * @param min {number}
   * @return {boolean}
   */
  static minLength(value, min) {
    let len = String(value).length;
    return min <= len;
  }

  /**
   *
   * @param value value {string | number}
   * @param max {number}
   * @return {boolean}
   */
  static maxLength(value, max) {
    let len = String(value).length;
    return len <= max;
  }

  /**
   *
   * @param value {string | number}
   * @param pattern {RegExp}
   * @return {*}
   */
  static pattern(value, pattern) {
    return pattern.test(value);
  }

  static isEmpty(value) {
    return "" !== value && null !== value;
  }

  /**
   *
   * @param config {{value: *, key: string, isValid: boolean}}
   */
  constructor(config) {
    this.value = config.value;
    this.key = config.key;
    this.isValid = config.isValid;
  }
}
