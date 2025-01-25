<?php
/*
 * changepins.php
 *
 * Copyright 2020 Kaki In <kaki@mifamofi.net>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 *
 *
 */

if (!isset($HEADER_DATABASE_CONNECTION))
{
    $HEADER_DATABASE_CONNECTION = 1;

    require "sqlTable.php";

    class DatabaseConnection {
        private PDO $dbconn;

        public function __construct (string $dbname, string $password, string $servname, string $username) {
            $this->dbconn = new PDO("mysql:host=".$servname.";dbname=".$dbname, $username, $password);
            $this->dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }

        function quote(string $string, $type = PDO::PARAM_STR) : string
        {
            return $this->dbconn->quote($string, $type);
        }

        function sendrequest(string $request, bool $get_return=true)
        {
            $sth = $this->dbconn->prepare($request);
            $sth->execute();

            if ($get_return) {
                $result = $sth->fetchAll(PDO::FETCH_ASSOC);
                return $result;
            }
        }

        function getTable(string $tablename) : TableConnection
        {
            return new TableConnection($this, $tablename);
        }
    }

}

?>