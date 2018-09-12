
============================================
このメッセージは
<?php echo $site_name; ?> WEBサイトより自動的に送信されています。
============================================


只今、<?php echo $site_name; ?> WEBサイトよりお問い合わせがありました。
ご対応をお願いいたします。


==お問い合わせ内容==

<?php

$values = json_decode( $body );
foreach ( $values as $key => $value ): ?>

■ <?php echo htmlspecialchars( $value->label ); ?>

<?php echo htmlspecialchars( $value->value ); ?>

<?php
endforeach; ?>


-------------------------------------------------------

date : <?php echo date('Y/m/d H:i:s').PHP_EOL ?>
ip : <?php echo $_SERVER['REMOTE_ADDR'].PHP_EOL ?>
host : <?php echo gethostbyaddr($_SERVER['REMOTE_ADDR']) ?>:<?php echo $_SERVER['REMOTE_PORT'].PHP_EOL ?>
ua : <?php echo $_SERVER['HTTP_USER_AGENT'].PHP_EOL ?>

-------------------------------------------------------
