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

    $projects = $_PLATFORM->getContext()->getProjects()->getProjectsOfType($type);

} else {
    $projects = $_PLATFORM->getContext()->getProjects()->getAllProjects();
};

$result = [];

foreach ($projects as $project)
{
    $result[] = [
        'name' => $project->name(),
        'type' => $project->type(),
        'thumbnail' => base64_encode($project->thumbnail()),
        'date-from' => intval(1000 * $project->dateFrom()),
        'date-to' => intval(1000 * $project->dateTo()),
        'finished' => $project->finished()
    ];
}

display_result($_PLATFORM, $result);


?>