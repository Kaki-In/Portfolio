<?php

if (!isset($HEADER_EXPERIENCES_LIST))
{
    $HEADER_EXPERIENCES_LIST = 0;

    require "Experience.php";

    class ExperiencesList
    {
        private TableConnection $table;

        public function __construct(TableConnection $table)
        {
            $this->table = $table;
        }

        public function getExperience(string $name) : Experience
        {
            return new Experience($this->table->getElement($name));
        }

        public function getAllExperiences() : array
        {
            $l = [];

            foreach ($this->table->getElements([]) as $element)
            {
                $l[] = new Experience($element);
            }

            return $l;
        }

        public function getExperiencesOfType(int $type) : array
        {
            $l = [];

            foreach ($this->table->getElements(["type" => [COMPARISON_EQUAL, $type]], "`date-from`") as $element)
            {
                $l[] = new Experience($element);
            }

            return $l;
        }
    }
}

?>