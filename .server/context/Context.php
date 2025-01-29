<?php

include "config.php";
include "database/sqlDatabase.php";
include "translations/Translations.php";
include "translation-utility/Translator.php";
include "skills/Skills.php";
include "experiences/Experiences.php";
include "projects/Projects.php";
include "go-through/SkillUses.php";

class Context
{
    private DatabaseConnection $_database;
    private TranslationsList $_translations;
    private Translator $_translator;
    private SkillsList $_skills;
    private ExperiencesList $_experiences;
    private ProjectsList $_projects;
    private SkillUsesList $_skill_uses;

    public function __construct()
    {
        global $_DATABASE;

        $this->_database = new DatabaseConnection($_DATABASE["database"], $_DATABASE["password"], $_DATABASE["host"], $_DATABASE["username"]);

        $this->_translations = new TranslationsList($this->_database->getTable("Translations"));
        $this->_translator = new Translator($this->_translations);

        $this->_skills = new SkillsList($this->_database->getTable('Skills'));
        $this->_experiences = new ExperiencesList($this->_database->getTable('Experiences'));
        $this->_projects = new ProjectsList($this->_database->getTable("Projects"));

        $this->_skill_uses = new SkillUsesList($this->_database->getTable("UsedSkills"), $this->_projects, $this->_experiences, $this->_skills);

    }

    public function getDatabase() : DatabaseConnection
    {
        return $this->_database;
    }

    public function getTranslations() : TranslationsList
    {
        return $this->_translations;
    }

    public function getTranslator() : Translator
    {
        return $this->_translator;
    }

    public function getSkills() : SkillsList
    {
        return $this->_skills;
    }

    public function getExperiences() : ExperiencesList
    {
        return $this->_experiences;
    }

    public function getProjects() : ProjectsList
    {
        return $this->_projects;
    }

    public function getSkillUses() : SkillUsesList
    {
        return $this->_skill_uses;
    }

}

?>