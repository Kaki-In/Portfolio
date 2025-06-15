<?php

set_include_path("/var/www/html/eden-morey.flopcreation.fr/.server/");

include "main.php";
include "end.php";

$_PLATFORM = new Platform();

$locations = $_PLATFORM->getContext()->getLocations()->getAllLocations();

$result = [];

foreach ($locations as $location)
{
    $result[] = [
        'name' => $location->name(),
        'logo' => base64_encode($location->logo()),
        'position' => ["latitude" => $location->latitude(), "longitude" => $location->longitude()],
        'visit_code' => $location->visit_code()
    ];
}

display_result($_PLATFORM, $result);


?>