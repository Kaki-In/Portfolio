<?php

require "context/database/sqlElement.php";

const VISIT_CODE_NEVER_VISITED = 0;
const VISIT_CODE_VISITED = 1;
const VISIT_CODE_BASELAND = 2;

class Country
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

    public function visit_code() : int
    {
        return $this->element->visit_code;
    }

    public function shape() : array
    {
        $shape_data = $this->element->shape;
        return $shape_data?json_decode($shape_data, true):[];
    }

}

?>