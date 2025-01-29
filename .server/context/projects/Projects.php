<?php

if (!isset($HEADER_PROJECTS_LIST))
{
    $HEADER_PROJECTS_LIST = 0;

    require "Project.php";

    class ProjectsList
    {
        private TableConnection $table;

        public function __construct(TableConnection $table)
        {
            $this->table = $table;
        }

        public function getProject(string $name) : Project
        {
            return new Project($this->table->getElement($name));
        }

        public function getAllProjects() : array
        {
            $l = [];

            foreach ($this->table->getElements([]) as $element)
            {
                $l[] = new Project($element);
            }

            return $l;
        }

        public function getProjectsOfType(int $type) : array
        {
            $l = [];

            foreach ($this->table->getElements(["type" => [COMPARISON_EQUAL, $type]], "`date-from`") as $element)
            {
                $l[] = new Project($element);
            }

            return $l;
        }
    }
}

?>