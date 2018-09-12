<?php
header( 'Content-Type: application/json; charset=utf-8' );

// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require_once './_inc_/vendor/autoload.php';
require_once './_inc_/utils/CSRFTokenManager.php';

CSRFTokenManager::validateCSRFToken();

$mail = new PHPMailer( true );

function _evaluate( $viewFile, $dataForView ) {
    extract( $dataForView );
    ob_start();
    include $viewFile;
    return ob_get_clean();
}

try {
    $config = require_once './_inc_/config.php';

    //Recipients
    date_default_timezone_set( 'Asia/Tokyo' );
    mb_internal_encoding( 'UTF-8' );
    $mail->CharSet = "UTF-8";
    $mail->Encoding = "base64";

    $mail->setFrom( $config[ 'from' ][ 0 ], $config[ 'from' ][ 1 ] );

    $mail_vars = array(
        'body'      => $_POST[ 'body' ],
        'admin' => $config[ 'admin' ],
        'site_name' => $config[ 'site_name' ],
    );

    // user
    // =====================================
    $mail->addAddress( $_POST[ 'mail' ] );

    $body = _evaluate( './_inc_/mail/user.php', $mail_vars );

    //Content
    $mail->Subject = $config[ 'title' ];
    $mail->Body = $body;
    $mail->send();

    // admin
    // =====================================
    if ( $config[ 'debug' ] ) {
        $mail->addAddress( $_POST[ 'mail' ] );
    } else {
        $mail->addAddress( $config[ 'admin' ] );
    }

    $body = _evaluate( './_inc_/mail/admin.php', $mail_vars );

    //Content
    $mail->Subject = 'WEBサイトよりお問い合わせがありました';
    $mail->Body = $body;
    $mail->send();

    echo 'Message has been sent';
} catch ( Exception $e ) {
    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo, $_POST;
}