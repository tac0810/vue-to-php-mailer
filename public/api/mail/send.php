<?php
define('ROOT', dirname(__FILE__));

header('Content-Type: application/json; charset=utf-8');
date_default_timezone_set('Asia/Tokyo');
mb_internal_encoding('UTF-8');

//Load Composer's autoloader
require_once ROOT . '/_inc_/vendor/autoload.php';
require_once ROOT . '/_inc_/utils/CSRFTokenManager.php';
require_once ROOT . '/_inc_/Mailer.php';

use Mailer\Mailer;
use CSRFTokenManager\CSRFTokenManager;

try {
    CSRFTokenManager::validateCSRFToken();

    $json = file_get_contents(ROOT . '/_inc_/config.mail.json');
    $json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
    $config = json_decode($json, true);
    $config = $config['mailer'];

    $admin = $config['admin'];

    $mailer = new Mailer([
        'body' => json_decode($_POST['body']),
        'admin' => $admin[0],
        'site_name' => $config['site_name'],
    ], $_POST['mail'], $admin);

    $mailer->DEBUG = $config['debug'];
    $mailer->mail->setFrom($config['from']['mail'], $config['from']['name']);

    // user
    // =====================================
    $mailer->setupUser($config['subject']);
    $mailer->mail->send();

    // admin
    // =====================================
    $mailer->setupAdmin('WEBサイトよりお問い合わせがありました');
    $mailer->mail->send();

    echo 'Message has been sent';
} catch (Exception $e) {
    echo 'Message could not be sent. Mailer Error: ', $mailer->mail->ErrorInfo, $_POST, $config['mailer'];
}
