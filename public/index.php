<?php
require_once './api/mail/_inc_/utils/CSRFTokenManager.php';
use CSRFTokenManager\CSRFTokenManager;
$token = CSRFTokenManager::getCSRFToken();
?>

<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0">
	<meta name="format-detection" content="telephone=no">
	<title>Vue to PHP Mailer</title>
</head>
<body>
<main data-controller="form">
  <div id="app"></div>
  <div id="vue-form"></div>
  <label for="csrf-token" hidden>
    <input type="text" hidden value="<?php echo $token; ?>" id="csrf-token">
  </label>
</main>

<script src="./assets/js/vendor.bundle.js"></script>
<script src="./assets/js/main.bundle.js"></script>
</body>
</html>
