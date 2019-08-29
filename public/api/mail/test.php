<?php
header( 'Content-Type: application/json; charset=utf-8' );

require_once './_inc_/utils/CSRFTokenManager.php';
CSRFTokenManager::validateCSRFToken();

echo $_POST['csrf_token'];
