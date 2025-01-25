<?php

if (!isset($HEADER_SKILLS_LIST))
{
    $HEADER_SKILLS_LIST = 0;

    require "Skill.php";

    class SkillsList
    {
        private TableConnection $table;

        public function __construct(TableConnection $table)
        {
            $this->table = $table;
        }

        public function getSkill(string $name) : Skill
        {
            return new Skill($this->table->getElement($name));
        }

        public function getAllSkills() : array
        {
            $l = [];

            foreach ($this->table->getElements([]) as $element)
            {
                $l[] = new Skill($element);
            }

            return $l;
        }

        public function getSkillsOfType(int $type) : array
        {
            $l = [];

            foreach ($this->table->getElements(["type" => [COMPARISON_EQUAL, $type]]) as $element)
            {
                $l[] = new Skill($element);
            }

            return $l;
        }
    }
}

?>