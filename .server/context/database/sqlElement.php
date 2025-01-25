<?php

if (!isset($HEADER_ELEMENT_CONNECTION))
{
    $HEADER_ELEMENT_CONNECTION = 1;

    class ElementConnection
    {
        private TableConnection $table;
        private string $id;

        public function __construct(TableConnection $table, string $id) {
            $this->table = $table;
            $this->id = $table->quote($id);
        }

        public function __get(string $attr)
        {
            return $this->get($attr);
        }

        public function get(string $attr)
        {
            $result = $this->table->sendrequest("SELECT `$attr` FROM `{$this->table->name()}` WHERE `id`={$this->id};", true);
            return $result[ 0 ][ $attr ];
        }

        public function __set(string $attr, $value)
        {
            return $this->set($attr, $value);
        }

        public function set(string $attr, $value)
        {
            $valname = $this->table->quote($value);
            $result = $this->table->sendrequest("UPDATE `{$this->table->name()}` SET `$attr`=$valname WHERE `id`={$this->id};", false);
            return $result;
        }

        public function exists() : bool
        {
            return (bool) $this->table->sendrequest("SELECT `id` FROM `{$this->table->name()}` WHERE `id`={$this->id};", true);
        }
    };
}

?>
