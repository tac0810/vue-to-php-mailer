/**
 *
 * @param viewController {ViewController}
 */
export default viewController => {

    window.dismissLoadingView = function() {

    };


    let initWindowWidth = window.innerWidth,
        initWidthFlg = false;

    function resize() {

        let fixHeight = Array.prototype.slice.call( document.querySelectorAll( '[data-fix-height]' ) );
        fixHeight.forEach( target => {
            initWidthFlg = true;
            target.style.height = window.innerHeight * Number( target.getAttribute( 'data-fix-height' ) ) + 'px';
        } );

        let $html = document.querySelector( 'html' );
        $html.classList.toggle( 'is-landing', !window.overTheBreakPoint() && window.innerHeight < window.innerWidth );

        if ( initWindowWidth > window.BREAK_POINT ) {
            if ( window.innerWidth <= window.BREAK_POINT ) {
                location.reload();
            }
        } else {
            if ( window.innerWidth > window.BREAK_POINT ) {
                location.reload();
            }
        }

        viewController.resize();
    }


    window.addEventListener( 'DOMContentLoaded', function() {
        viewController.viewWillLoad();
    }, false );

    window.addEventListener( 'load', function() {
        viewController.viewDidLoad();

        viewController.viewWillAppear();
        viewController.viewDidAppear();

        // setTimeout( () => {
        //     viewController.viewWillAppear();
        // }, 100 );
        //
        // $( '#loading' ).stop().fadeOut( {
        //     duration : 800,
        //     complete : function() {
        //         viewController.viewDidAppear();
        //         $( this ).remove();
        //     }
        // } );

        viewController.scroll( window.pageYOffset || document.documentElement.scrollTop );
    }, false );

    resize();
    window.addEventListener( 'resize', resize, false );

    window.addEventListener( 'scroll', function() {
        viewController.scroll( window.pageYOffset || document.documentElement.scrollTop );
    }, false );
};