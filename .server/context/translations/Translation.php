<?php

require "context/database/sqlElement.php";

const AVAILABLE_LANGUAGES = ["en", "fr",  "de"];

class Translation
{
    private ElementConnection $_element;

    public function __construct(ElementConnection $sqlElement)
    {
        $this->_element = $sqlElement;
    }

    public function id() : string
    {
        return $this->_element->id;
    }

    public function getTranslation(string $language) : string
    {
        $result = $this->_element->get($language . "_translation");

        if ($result === null) $result = $this->getDefaultTranslation();
        return $result;
    }

    public function getDefaultTranslation() : string
    {
        return $this->_element->en_translation;
    }

    public function setTranslation(string $language, string $data)
    {
        $this->_element->set($language . "_translation", $data);
    }

    public function exists() : bool
    {
        return $this->_element->exists();
    }
}

?>