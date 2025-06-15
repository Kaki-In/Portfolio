<?php

if (!isset($HEADER_LOCATIONS_LIST))
{
    $HEADER_LOCATIONS_LIST = 0;

    require "Location.php";

    class LocationsList
    {
        private TableConnection $table;

        public function __construct(TableConnection $table)
        {
            $this->table = $table;
        }

        public function getLocation(string $name) : Location
        {
            return new Location($this->table->getElement($name));
        }

        public function getAllLocations() : array
        {
            $l = [];

            foreach ($this->table->getElements([]) as $element)
            {
                $l[] = new Location($element);
            }

            return $l;
        }
    }
}

?>