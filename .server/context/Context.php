<?php

include "config.php";
include "database/sqlDatabase.php";
include "translations/Translations.php";
include "translation-utility/Translator.php";
include "skills/Skills.php";

class Context
{
    private DatabaseConnection $_database;
    private TranslationsList $_translations;
    private Translator $_translator;
    private SkillsList $_skills;

    public function __construct()
    {
        global $_DATABASE;

        $this->_database = new DatabaseConnection($_DATABASE["database"], $_DATABASE["password"], $_DATABASE["host"], $_DATABASE["username"]);

        $this->_translations = new TranslationsList($this->_database->getTable("Translations"));
        $this->_translator = new Translator($this->_translations);

        $this->_skills = new SkillsList($this->_database->getTable('Skills'));
    }

    public function getDatabase()
    {
        return $this->_database;
    }

    public function getTranslations()
    {
        return $this->_translations;
    }

    public function getTranslator()
    {
        return $this->_translator;
    }

    public function getSkills()
    {
        return $this->_skills;
    }

}

?>