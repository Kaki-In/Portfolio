<?php

require "context/database/sqlElement.php";

class Location
{
    private ElementConnection $element;

    public function __construct(ElementConnection $element)
    {
        $this->element = $element;
    }

    public function exists() : bool
    {
        return $this->element->exists();
    }

    public function name() : string
    {
        return $this->element->id;
    }

    public function logo() : string
    {
        return $this->element->logo;
    }

    public function longitude() : float
    {
        return $this->element->longitude;
    }

    public function latitude() : float
    {
        return $this->element->latitude;
    }

    public function visit_code() : int
    {
        return $this->element->visit_code;
    }
}

?>