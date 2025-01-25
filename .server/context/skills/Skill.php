<?php

require "context/database/sqlElement.php";

class Skill
{
    private ElementConnection $element;

    public function __construct(ElementConnection $element)
    {
        $this->element = $element;
    }

    public function name() : string
    {
        return $this->element->id;
    }

    public function logo() : string
    {
        return $this->element->logo;
    }

    public function type() : int
    {
        return $this->element->type + 0;
    }
}

?>