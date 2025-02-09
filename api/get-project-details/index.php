<?php

set_include_path("/var/www/html/eden-morey.flopcreation.fr/.server/");

include "main.php";
include "end.php";

$_PLATFORM = new Platform();

if (isset($ARGV['name']))
{
    $name = $ARGV['name'];

    $project = $_PLATFORM->getContext()->getProjects()->getProject($name);

    if (!$project->exists())
    {
        header($_SERVER['SERVER_PROTOCOL'].' 404 Not Found', true, 404);
        exit;
    }

    $uses = $_PLATFORM->getContext()->getSkillUses()->getProjectSkills($name);

    $result = [
        'name' => $project->name(),
        'type' => $project->type(),
        'thumbnail' => base64_encode($project->thumbnail()),
        'date-from' => intval(1000 * $project->dateFrom()),
        'date-to' => intval(1000 * $project->dateTo()),
        'finished' => $project->finished(),
        'link' => $project->link(),
        'skills' => []
    ];

    foreach ($uses as $use)
    {
        $skill = $use->skill();
        $result['skills'][] = [
            'name' => $skill->name(),
            'type' => $skill->type(),
            'logo' => base64_encode($skill->logo()),
        ];
    }

    display_result($_PLATFORM, $result);

} else {
    header($_SERVER['SERVER_PROTOCOL'].' 400 Bad Request', true, 400);
};


?>