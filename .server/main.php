<?php

require "config.php";
require "context/Context.php";
require "local-user/LocalUser.php";

$ARGV = $_GET;//json_decode(trim(file_get_contents('php://input')));

class Platform
{
    private $_context;
    private $_local_user;

    public function __construct()
    {
        $this->_context = new Context();
        $this->_local_user = new LocalUser($this->_context);
    }

    public function getContext()
    {
        return $this->_context;
    }

    public function getLocalUser()
    {
        return $this->_local_user;
    }
}

?>