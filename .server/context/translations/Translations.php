<?php

if (!isset($HEADER_TRANSLATIONS_LIST))
{
    $HEADER_TRANSLATIONS_LIST = 0;

    require "Translation.php";

    class TranslationsList
    {
        private TableConnection $_table;

        public function __construct(TableConnection $table)
        {
            $this->_table = $table;
        }

        public function getTranslation(string $id) : Translation
        {
            $id = str_replace("\n", "", str_replace(" ", "", $id));
            $element = $this->_table->getElement($id);

            if (!$element->exists())
            {
                return $this->createNewTranslation($id, "{not translated:$id}");
            } else {
                return new Translation($element);
            }
        }

        public function createNewTranslation(string $name, string $default_translation) : Translation
        {
            $name = str_replace("\n", "", str_replace(" ", "", $name));
            $this->_table->createElement(['id' => $name, "en_translation" => $default_translation]);
            return $this->getTranslation($name);
        }

        public function getTranslations() : array
        {
            $l = [];

            foreach ($this->_table->getElements([]) as $element)
            {
                $l[] = new Translation($element);
            }

            return $l;
        }
    }
}

?>

