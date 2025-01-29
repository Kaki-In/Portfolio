<?php

if (!isset($HEADER_SKILL_USES_LIST))
{
    $HEADER_SKILL_USES_LIST = 0;

    require "ExperienceSkillUse.php";
    require "ProjectSkillUse.php";
    require "context/projects/Projects.php";
    require "context/experiences/Experiences.php";

    class SkillUsesList
    {
        private TableConnection $table;

        private ProjectsList $projects;
        private ExperiencesList $experiences;
        private SkillsList $skills;

        public function __construct(TableConnection $table, ProjectsList $projects, ExperiencesList $experiences, SkillsList $skills)
        {
            $this->table = $table;

            $this->projects = $projects;
            $this->experiences = $experiences;
            $this->skills = $skills;
        }

        public function getSkillUses(string $skill) : array
        {
            $l = [];

            foreach ($this->table->getElements(["skill" => [COMPARISON_EQUAL, $skill]]) as $element)
            {
                if ($element->type == 0)
                {
                    $l[] = new ExperienceSkillUse($element, $this->experiences, $this->skills);
                } else if ($element->type == 1) {
                    $l[] = new ProjectSkillUse($element, $this->projects, $this->skills);
                } else {
                    $l[] = new SkillUse($element);
                }
            }

            return $l;
        }

        public function getExperienceSkills(string $experience)
        {
            $l = [];

            foreach ($this->table->getElements(["element" => [COMPARISON_EQUAL, $experience], "type" => [COMPARISON_EQUAL, 0]]) as $element)
            {
                $l[] = new ExperienceSkillUse($element, $this->experiences, $this->skills);
            }

            return $l;
        }

        public function getProjectsSkills(string $experience)
        {
            $l = [];

            foreach ($this->table->getElements(["element" => [COMPARISON_EQUAL, $experience], "type" => [COMPARISON_EQUAL, 1]]) as $element)
            {
                $l[] = new ProjectSkillUse($element, $this->projects, $this->skills);
            }

            return $l;
        }
    }
}

?>