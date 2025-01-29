<?php

set_include_path("/var/www/html/eden-morey.flopcreation.fr/.server/");

include "main.php";
include "end.php";

$_PLATFORM = new Platform();

if (isset($ARGV['type']))
{
    $type = $ARGV['type'];

    if (!($type == 0 || $type == 1 || $type == 2 || $type == 3 ))
    {
        header($_SERVER['SERVER_PROTOCOL'].' 400 Bad Request', true, 400);
        exit;
    }

    $experiences = $_PLATFORM->getContext()->getExperiences()->getExperiencesOfType($type);

} else {
    $experiences = $_PLATFORM->getContext()->getExperiences()->getAllExperiences();
};

$result = [];

foreach ($experiences as $experience)
{
    $result[] = [
        'name' => $experience->name(),
        'type' => $experience->type(),
        'thumbnail' => base64_encode($experience->thumbnail()),
        'date-from' => intval(1000 * $experience->dateFrom()),
        'date-to' => intval(1000 * $experience->dateTo()),
    ];
}

display_result($_PLATFORM, $result);


?>