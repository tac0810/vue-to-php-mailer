<?php


namespace Mailer;


// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function

use PHPMailer\PHPMailer\PHPMailer;

class Mailer
{
    private $user = '';
    private $admin = [];
    private $mailVars;
    public $mail;
    public $DEBUG = false;

    public function __construct($mailVars, $user, $admin)
    {
        $this->user = $user;
        $this->admin = $admin;
        $this->mailVars = $mailVars;
        $this->mail = new PHPMailer(true);
        $this->mail->CharSet = "UTF-8";
        $this->mail->Encoding = "base64";
    }

    public function setupUser($subject)
    {
        $this->mail->clearAddresses();
        $this->mail->addAddress($this->user);

        $body = $this->_evaluate(ROOT . '/_inc_/mail/user.php', $this->mailVars);
        $this->_setContent($subject, $body);
    }

    public function setupAdmin($subject)
    {
        $this->mail->clearAddresses();

        if ($this->DEBUG) {
            $this->mail->addAddress($this->user);
        } else {
            foreach ($this->admin as $admin) {
                $this->mail->addAddress($admin);
            }
        }

        $body = $this->_evaluate(ROOT . '/_inc_/mail/admin.php', $this->mailVars);
        $this->_setContent($subject, $body);

        if (!$this->DEBUG) {
            $this->writeMailLog($body);
        }
    }

    private function _setContent($subject, $body)
    {
        $this->mail->Subject = $subject;
        $this->mail->Body = $body;
    }

    private function _evaluate($viewFile, $dataForView)
    {
        extract($dataForView);
        ob_start();
        include $viewFile;
        return ob_get_clean();
    }

    private function writeMailLog($message)
    {
        $path = ROOT . '/_inc_/logs';
        $this->checkDir($path);
        $cnt = 0;
        $file_name = date('YmdHis');
        if (file_exists($path . $file_name . sprintf('%03d', $cnt) . '.txt')) {
            while (true) {
                $cnt++;
                if (!file_exists($path . DS . $file_name . sprintf('%03d', $cnt) . '.txt')) break;
            }
        }
        $file_name = $file_name . sprintf('%03d', $cnt) . '.txt';
        file_put_contents($path . DS . $file_name, $message, FILE_APPEND | LOCK_EX);
    }

    private function checkDir($dir)
    {
        if (!file_exists($dir) || !is_dir($dir)) {
            mkdir($dir, 0777, true);
            chmod($dir, 0777);
        }
    }

}
