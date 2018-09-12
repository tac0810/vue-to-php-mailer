// =============================================
// --- USE ONLY ES5 ----------------------------
// =============================================
//

//
// global extensions
// ======================================================================================================================

/**
 * Return true if the value is exist.
 * @param any
 * @return {Boolean}
 */
window.isSet = function( any ) {
    'use strict';
    return any !== undefined && any !== null;
};

//
// Math extensions
// ======================================================================================================================

/**
 * Return random int value from min to max.
 * @param min
 * @param max
 * @return {number}
 */
Math.randomRange = Math.randomRang || function( min, max ) {
    return Math.floor( Math.random() * ( max - min ) + min );
};

/**
 * This is polyfill for f*ck'n IE.
 * @param x
 * @returns {number}
 */
Math.log2 = Math.log2 || function( x ) {
    return Math.log( x ) / Math.LN2;
};

/**
 * Transform degrees to radian
 * @param degrees {number}
 * @return {number}
 */
Math.degToRad = Math.degToRad || function( degrees ) {
    return degrees * Math.PI / 180;
};

//
// Array extensions
// ======================================================================================================================

/**
 * Return the value in the array used by random keys.
 * @return {*}
 */
Array.prototype.random = Array.prototype.random || function() {
    return this[ Math.floor( Math.random() * this.length ) ];
};


/**
 *
 * Return array separated by argument value.
 * @param chunkSize
 * @returns {Array}
 */

Array.prototype.chunk = Array.prototype.chunk || function( chunkSize ) {
    if ( 1 >= chunkSize ) return [ this ];

    var temporal = [];

    for ( var i = 0; i < this.length; i += chunkSize ) {
        temporal.push( this.slice( i, i + chunkSize ) );
    }


    return temporal;
};

/**
 * Return array"s last.
 * @type {*|(function(): *)}
 */
Array.prototype.last = Array.prototype.last || function() {
    return this[ this.length - 1 ];
};


//
// Number extensions
// ======================================================================================================================

/**
 *
 * Return zero padded number as String
 * @param n {number}
 * @type {*|Function}
 * @return {string}
 */
Number.prototype.zfill = Number.prototype.zfill || function( n ) {
    if ( n <= 1 ) return String( this );

    var i = n,
        fill = '';

    while ( i-- ) fill += '0';

    return ( '00' + Math.abs( this ) ).slice( -n );
};


//
// Strings extensions
// ======================================================================================================================

/**
 * Transform first character uppercase.
 * @returns {string}
 */
String.prototype.ucfirst = String.prototype.ucfirst || function() {
    return this.charAt( 0 ).toUpperCase() + this.slice( 1 );
};

/**
 * Transform 'Hiragana' to "Katagana".
 * @returns {string}
 */
String.prototype.hiraganaToKatagana = String.prototype.hiraganaToKatagana || function() {
    return this.replace( /[\u3041-\u3096]/g, function( match ) {
        return String.fromCharCode( match.charCodeAt( 0 ) + 0x60 );
    } );
};

/**
 * Transform "Katagana" to 'Hiragana'.
 * @returns {string}
 */
String.prototype.katakanaToHiragana = String.prototype.katakanaToHiragana || function() {
    return this.replace( /[\u30a1-\u30f6]/g, function( match ) {
        return String.fromCharCode( match.charCodeAt( 0 ) - 0x60 );
    } );
};

/**
 * Transform lowercase Japanese to uppercase by "Katakana".
 * @returns {string}
 */
String.prototype.toUpperCaseInJapanese = String.prototype.toUpperCaseInJapanese || function() {
    var letter = '',
        list = {
            '\u30a1' : '\u30a2',
            '\u30a3' : '\u30a4',
            '\u30a5' : '\u30a6',
            '\u30a7' : '\u30a8',
            '\u30a9' : '\u30aa',
            '\u30f5' : '\u30ab',
            '\u30f6' : '\u30b1',
            '\u30c3' : '\u30c4',
            '\u30e3' : '\u30e4',
            '\u30e5' : '\u30e6',
            '\u30e7' : '\u30e8',
            '\u30ee' : '\u30ef'
        },
        lower = /[\u30a1\u30a3\u30a5\u30a7\u30a9\u30f5\u30f6\u30c3\u30e3\u30e5\u30e7\u30ee]/g;

    this.split( '' ).forEach( function( l ) {
        var mc = l.match( lower );
        letter += mc ? list[ mc ] : l;
    } );

    return letter;
};

/**
 * Encode to unicode.
 * @returns {string}
 */
String.prototype.unicodeEscape = String.prototype.unicodeEscape || function() {
    var code, pref = { 1 : '\\u000', 2 : '\\u00', 3 : '\\u0', 4 : '\\u' };
    return this.replace( /\W/g, function( c ) {
        return pref[ ( code = c.charCodeAt( 0 ).toString( 16 ) ).length ] + code;
    } );
};

/**
 * Decode from unicode.
 * @returns {string}
 */
String.prototype.unicodeUnEscape = String.prototype.unicodeUnEscape || function() {
    var a = this.match( /\\u.{4}/g ),
        t = "";
    for ( var i = 0; i < a.length; i++ ) {
        t += String.fromCharCode( arrs[ i ].replace( "\\u", "0x" ) );
    }
    return t;
};