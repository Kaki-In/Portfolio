<?php

include "config.php";
include "database/sqlDatabase.php";
include "translations/Translations.php";
include "translation-utility/Translator.php";
include "skills/Skills.php";
include "experiences/Experiences.php";
include "projects/Projects.php";
include "go-through/SkillUses.php";
include "countries/Countries.php";
include "locations/Locations.php";

class Context
{
    private DatabaseConnection $_database;
    private TranslationsList $_translations;
    private Translator $_translator;
    private SkillsList $_skills;
    private ExperiencesList $_experiences;
    private ProjectsList $_projects;
    private CountriesList $_countries;
    private LocationsList $_locations;
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
        $this->_countries = new CountriesList($this->_database->getTable("Countries"));
        $this->_locations = new LocationsList($this->_database->getTable("Locations"));

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

    public function getCountries() : CountriesList
    {
        return $this->_countries;
    }

    public function getLocations() : LocationsList
    {
        return $this->_locations;
    }

    public function getSkillUses() : SkillUsesList
    {
        return $this->_skill_uses;
    }

}

?>