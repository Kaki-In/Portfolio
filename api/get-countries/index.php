<?php

set_include_path("/var/www/html/eden-morey.flopcreation.fr/.server/");

include "main.php";
include "end.php";

$_PLATFORM = new Platform();

$countries = $_PLATFORM->getContext()->getCountries()->getAllCountries();

$result = [];

foreach ($countries as $country)
{
    $result[] = [
        'name' => $country->name(),
        'visit_code' => $country->visit_code(),
        'shape' => $country->shape()
    ];
}

display_result($_PLATFORM, $result);


?>