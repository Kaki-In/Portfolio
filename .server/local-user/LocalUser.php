<?php

require "cookies/Database.php";

class LocalUser
{
    private $_database;
    private $_context;
    
    public function __construct($context)
    {
        $this->_database = new CookiesDatabase( "em-portfolio" );
        $this->_context = $context;
    }

    public function getDatabase()
    {
        return $this->_database;
    }

    public function getContext()
    {
        return $this->_context;
    }

}

?>