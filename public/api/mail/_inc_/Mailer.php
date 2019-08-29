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

}
