<?php

require "context/database/sqlElement.php";

class Project
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

    public function thumbnail() : string
    {
        return $this->element->thumbnail;
    }

    public function type() : int
    {
        return $this->element->type + 0;
    }

    public function finished() : bool
    {
        return (bool) $this->element->finished;
    }

    public function dateFrom() : int | false
    {
        return strtotime($this->element->get("date-from"));
    }

    public function dateTo() : int | false | null
    {
        $date = $this->element->get("date-to");

        if ($date === null) return null;
        else return strtotime($date);
    }

    public function link() : string | null
    {
        return $this->element->link;
    }

    public function location() : string | null
    {
        return $this->element->location;
    }
}

?>