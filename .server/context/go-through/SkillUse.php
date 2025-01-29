<?php

if (!isset($HEADER_SKILL_USE))
{
    $HEADER_SKILL_USE = 0;

    require "context/database/sqlElement.php";

    class SkillUse
    {
        protected ElementConnection $element;

        public function __construct(ElementConnection $element)
        {
            $this->element = $element;
        }

        public function element() : string
        {
            return $this->element->element;
        }

        public function type() : int
        {
            return $this->element->type;
        }
        
    }
}

?>