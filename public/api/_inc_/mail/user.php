
============================================
このメッセージは <?php echo $site_name; ?> WEBサイトより自動的に送信されています。
心当たりのない場合やご不明な点がある場合は、
「<?php echo $admin; ?>」までご連絡ください。
============================================
<?php

$values = json_decode( $body );
foreach ( $values as $key => $value ): ?>

■ <?php echo htmlspecialchars( $value->label ); ?>

<?php echo htmlspecialchars( $value->value ); ?>

<?php
endforeach; ?>

--------------------------------------------------------------

--------------------------------------------------------------