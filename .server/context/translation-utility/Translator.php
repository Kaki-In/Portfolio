<?php

include "context/translations/Translations.php";

class Translator
{
    private TranslationsList $translations;

    public function __construct(TranslationsList $translations)
    {
        $this->translations = $translations;
    }

    public function resolveTranslations(string $name) : array | null
    {
        $element = $this->translations->getTranslation($name);
    
        if (!$element->exists())
        {
            return null;
        }
    
        $translations = [];
        foreach (AVAILABLE_LANGUAGES as $lang)
        {
            $translation = $element->getTranslation($lang);
    
            if ($translation != false)
            {
                $translations[$lang] = $this->resolveRaw($translation, $lang);
            }
        }
    
        return $translations;
    }

    public function resolveRaw(string $raw, $lang) : string
    {
        $cut_data = $this->cut($raw);

        for ($i=0; $i < sizeof($cut_data) ; ++$i)
        {
            $word = $cut_data[$i];

            if ($i % 2 == 1 && str_contains($word, ":"))
            {
                $data_info = substr($word, 0, strpos($word, ":"));

                $data_arg = substr($word, strpos($word, ":")+1);
                if ($data_info !== "raw") $data_arg = $this->resolveRaw($data_arg, $lang);

                if ($data_info === "translate")
                {
                    $cut_data[$i] = $this->resolveTranslations($data_arg)[$lang];
                } else {
                    $cut_data[$i] = "{" . $data_info . ":" . $data_arg . "}";
                }
            }
        }
        
        return join("", $cut_data);
    }

    public function cut(string $data) : array
    {
        $result = [""];
        $inside = 0;

        foreach (str_split($data) as $char)
        {
            if ($char == "{") {
                if ($inside === 0) $result[] = "";
                else $result[sizeof($result) - 1] = $result[sizeof($result) - 1]."{";
                $inside += 1;
            } else if ($inside > 0 && $char === "}")
            {
                $inside -= 1;
                if ($inside === 0) $result[] = "";
                else $result[sizeof($result) - 1] = $result[sizeof($result) - 1]."}";
            } else {
                $result[sizeof($result) - 1] = $result[sizeof($result) - 1].$char;
            }
        }

        return $result;
    }
}

?>