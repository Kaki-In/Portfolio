<?php

include "Array.php";

class CookiesDatabase
{
    private $content;
    private $name;
    
    public function __construct($name)
    {
        $this->name = $name;
        if (isset($_COOKIE[ $name ]))
        {
            $this->content = $_COOKIE[ $name ];
        } else {
            $this->content = "{}";
        };
    }

    public function getData()
    {
        return json_decode($this->content, true);
    }

    public function setData($array)
    {
        $this->content = json_encode($array);
    }

    public function get( $name )
    {
        if (!isset($this->getData()[ $name ])) return null;

        return $this->getData()[ $name ];
    }

    public function set( $name, $value ) 
    {
        $data = $this->getData();
        $data[ $name ] = $value;
        $this->setData($data);
    }

    public function createArray( $name )
    {
        return new CookiesArray($name, $this);
    }

    public function exportToClient($expires_or_options, $path, $domain)
    {
        setcookie($this->name, $this->content, $expires_or_options, $path, $domain);
    }
};

?>
