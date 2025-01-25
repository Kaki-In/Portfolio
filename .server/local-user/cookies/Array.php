<?php

class CookiesArray
{
    private $key;
    private $database;

    public function __constructor( $key, $database ) {
        $this->key = $key;
        $this->database = $database;

		if ($this->getData() === null) {
            $this->setData([]);
        }
    }

	public function getData () {
        return $this->database->get($this->key);
	}
	
	public function setData ($value) {
        $this->database->set($this->key, $value);
	}

    public function get( $name )
    {
        return $this->getData() [$name];
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
}

?>