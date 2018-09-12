<?php
/**
 * Created by PhpStorm.
 * User: tac
 * Date: 2018/08/30
 * Time: 18:48
 */

class CSRFTokenManager {
    public static function getCSRFToken() {
        session_start();

        $nonce = base64_encode( openssl_random_pseudo_bytes( 48 ) );

        if ( empty( $_SESSION[ 'csrf_tokens' ] ) ) {
            $_SESSION[ 'csrf_tokens' ] = [];
        }

        $_SESSION[ 'csrf_tokens' ][ $nonce ] = true;

        return htmlspecialchars( $nonce, ENT_QUOTES, 'UTF-8' );
    }

    public static function validateCSRFToken() {
        session_start();

        if ( $_SERVER[ "REQUEST_METHOD" ] != "POST" && !isset( $_POST[ 'csrf_token' ] ) && !self::checkCSRFToken( $_POST[ 'csrf_token' ] ) ) {
            echo 'ERROR';
            exit;
        }
    }

    private static function checkCSRFToken( $token ) {

        if ( isset( $_SESSION[ 'csrf_tokens' ][ $token ] ) ) {
            unset( $_SESSION[ 'csrf_tokens' ][ $token ] );
            return true;
        }

        return false;
    }
}