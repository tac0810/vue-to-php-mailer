export default class UserAgent {
    constructor() {
        this.tablet = false;
        this.mobile = false;
        this.android = false;
        this.iphone = false;

        this._init();
        this._addDevice();
    }

    /**
     *
     * @private
     */
    _init() {
        let u = window.navigator.userAgent.toLowerCase();
        this.tablet = (u.indexOf( "windows" ) !== -1 && u.indexOf( "touch" ) !== -1 && u.indexOf( "tablet pc" ) === -1)
            || u.indexOf( "ipad" ) !== -1
            || (u.indexOf( "android" ) !== -1 && u.indexOf( "mobile" ) === -1)
            || (u.indexOf( "firefox" ) !== -1 && u.indexOf( "tablet" ) !== -1)
            || u.indexOf( "kindle" ) !== -1
            || u.indexOf( "silk" ) !== -1
            || u.indexOf( "playbook" ) !== -1;
        this.mobile = (u.indexOf( "windows" ) !== -1 && u.indexOf( "phone" ) !== -1)
            || u.indexOf( "iphone" ) !== -1
            || u.indexOf( "ipod" ) !== -1
            || (u.indexOf( "android" ) !== -1 && u.indexOf( "mobile" ) !== -1)
            || (u.indexOf( "firefox" ) !== -1 && u.indexOf( "mobile" ) !== -1)
            || u.indexOf( "blackberry" ) !== -1;
        this.android = (u.indexOf( "android" ) !== -1 && u.indexOf( "mobile" ) !== -1);
        this.iphone = (u.indexOf( "iphone" ) !== -1) || u.indexOf( "ipod" ) !== -1
    }

    /**
     *
     * @private
     */
    _addDevice() {
        let $html = document.querySelector( 'html' );
        if ( this.tablet ) {
            $html.setAttribute( 'class', 'is-tablet' )
        } else if ( this.mobile ) {
            $html.setAttribute( 'class', 'is-mobile' )
        } else if ( this.android ) {
            $html.setAttribute( 'class', 'is-android' )
        } else if ( this.iphone ) {
            $html.setAttribute( 'class', 'is-iphone' )
        } else {
            $html.setAttribute( 'class', 'is-others' )
        }
    }

    /**
     * https://qiita.com/Evolutor_web/items/162bfcf83695c83f1077
     * @returns {string}
     */
    static getBrowser() {
        let ua = window.navigator.userAgent.toLowerCase();
        let ver = window.navigator.appVersion.toLowerCase();
        let name = 'unknown';


        let isIE = null;
        let ieVersion = null;
        let userAgent = window.navigator.userAgent.toLowerCase();
        if ( userAgent.match( /(msie|MSIE)/ ) || userAgent.match( /(T|t)rident/ ) ) {
            isIE = true;
            ieVersion = userAgent.match( /((msie|MSIE)\s|rv:)([\d\.]+)/ )[ 3 ];
            ieVersion = parseInt( ieVersion );
        } else {
            isIE = false;
        }

        if ( isIE ) {
            name = 'ie' + ieVersion
        } else {
            if ( ua.indexOf( 'chrome' ) !== -1 ) {
                name = 'chrome';
            } else if ( ua.indexOf( 'safari' ) !== -1 ) {
                name = 'safari';
            } else if ( ua.indexOf( 'opera' ) !== -1 ) {
                name = 'opera';
            } else if ( ua.indexOf( 'firefox' ) !== -1 ) {
                name = 'firefox';
            }
        }

        return name;
    }

    /**
     * https://qiita.com/Evolutor_web/items/162bfcf83695c83f1077
     * @param browsers
     * @returns {boolean}
     */
    static isSupported( browsers ) {
        let thusBrowser = UserAgent.getBrowser();
        for ( let i = 0; i < browsers.length; i++ ) {
            if ( browsers[ i ] === thusBrowser ) {
                return true;
            }
        }
        return false;
    }

    /**
     * https://hacknote.jp/archives/6631/
     * @returns {Number}
     */
    static androidVersion() {
        let ua = window.navigator.userAgent.toLowerCase();
        if ( ua.indexOf( "android" ) > 0 ) {
            return parseFloat( ua.slice( ua.indexOf( "android" ) + 8 ) );
        }
        return null;


    }

    /**
     *
     * @return {boolean}
     */
    static isMajor() {
        return !(window.navigator.userAgent.indexOf( "DoCoMo" ) === -1 && window.navigator.userAgent.indexOf( "KDDI" ) === -1 && window.navigator.userAgent.indexOf( "Vodafone" ) === -1 && window.navigator.userAgent.indexOf( "SoftBank" ) === -1);
    }

    /**
     * https://hacknote.jp/archives/22633/
     *
     */
    static iphoneVersion() {
        let u = window.navigator.userAgent.toLowerCase();
        let version = u.match( /iphone os ([\d]+)_([\d]+)_([\d]+)/ );
        if ( !version ) {
            version = u.match( /iphone os ([\d]+)_([\d]+)/ );
        }
        return version;
    }

    /**
     * https://qiita.com/narikei/items/ada44891cb0902efc165
     * @returns {boolean}
     */
    static isAndroidBrowser() {
        let ua = window.navigator.userAgent.toLowerCase();
        return /android/.test( ua ) && /linux; u;/.test( ua ) && !/chrome/.test( ua );
    }

    /**
     *
     * @param device {String}
     * @param width {Number}
     */
    viewPort( device, width ) {
        if ( this[ device ] ) {
            let viewPort = document.querySelector( 'meta[name="viewport"]' );
            viewPort.setAttribute( 'content', 'width=' + width + ',user-scalable=no' )
        }
    }

}