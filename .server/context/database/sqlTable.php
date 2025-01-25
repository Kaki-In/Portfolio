<?php

const COMPARISON_EQUAL   = 0;
const COMPARISON_LOWER   = 1;
const COMPARISON_GREATER = 2;
const COMPARISON_LIKE    = 3;

if (!isset($HEADER_TABLE_CONNECTION))
{
    $HEADER_TABLE_CONNECTION = 1;

    require "sqlElement.php";

    class TableConnection
    {
        private DatabaseConnection $_database;
        private string $_name;

        public function __construct(DatabaseConnection $database, string $name) {
            $this->_database = $database;
            $this->_name = $name;
        }

        public function getElement(string $name) : ElementConnection
        {  
            return new ElementConnection($this, $name);
        }

        public function getElements(array $required_attributes, string | null $sort=null, bool $desc=false) : array
        {
            $data = "";
            foreach ($required_attributes as $attr => $val)
            {
                if (strlen($data) > 0) $data .= " AND ";
                $data .= "`$attr`".["=", "<", ">", " LIKE "][$val[0]].$this->quote($val[1]);
            };

            $sort_string = "";

            if ($sort)
            {
                $sort_string = " ORDER BY " . $sort;
                if ($desc)
                {
                    $sort_string .= " DESC";
                }
            }

            if ($data)
            {
                $results = $this->sendrequest("SELECT `id` FROM `{$this->_name}` WHERE {$data}{$sort_string};", true);
            } else {
                $results = $this->sendrequest("SELECT `id` FROM `{$this->_name}`{$sort_string};", true);
            }

            $return = [];
            foreach ($results as $element_id)
            {
                $return[] = $this->getElement($element_id["id"]);
            }

            return $return;
        }

        public function deleteElements(array $required_attributes) : void
        {
            $data = "";
            foreach ($required_attributes as $attr => $val)
            {
                if (strlen($data) > 0) $data .= " AND ";
                $data .= "`$attr`".["=", "<", ">", " LIKE "][$val[0]].$this->quote($val[1]);
            };

            $this->sendrequest("DELETE FROM `{$this->_name}` WHERE {$data};", false);
        }

        public function quote(string $string, $type = PDO::PARAM_STR) : string
        {
            return $this->_database->quote($string, $type);
        }

        public function sendrequest(string $request, $get_return=true)
        {
            return $this->_database->sendrequest($request, $get_return);
        }

        public function name() : string
        {
            return $this->_name;
        }

        public function createElement( array $properties ) : void
        {
            $data = "";
            $values = "";
            foreach ($properties as $attr => $val)
            {
                if (strlen($data) > 0) $data .= ", ";
                if (strlen($values) > 0) $values .= ", ";
                $data .= $attr;
                $values .= $this->quote($val);
            };

            $this->sendrequest("INSERT INTO `{$this->_name}` ($data) VALUES ($values);", false);
        }

        public function deleteElement( ElementConnection $element ) : void
        {
            $this->sendrequest("DELETE FROM `{$this->_name}` WHERE `id`={$element->id};", false);
        }

    }

}

?>