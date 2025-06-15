<?php

if (!isset($HEADER_COUNTRIES_LIST))
{
    $HEADER_COUNTRIES_LIST = 0;

    require "Country.php";

    class CountriesList
    {
        private TableConnection $table;

        public function __construct(TableConnection $table)
        {
            $this->table = $table;
        }

        public function getCountry(string $name) : Country
        {
            return new Country($this->table->getElement($name));
        }

        public function getAllCountries() : array
        {
            $l = [];

            foreach ($this->table->getElements([]) as $element)
            {
                $l[] = new Country($element);
            }

            return $l;
        }
    }
}

?>