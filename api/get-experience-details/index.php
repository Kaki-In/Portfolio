<?php

set_include_path("/var/www/html/eden-morey.flopcreation.fr/.server/");

include "main.php";
include "end.php";

$_PLATFORM = new Platform();

if (isset($ARGV['name']))
{
    $name = $ARGV['name'];

    $experience = $_PLATFORM->getContext()->getExperiences()->getExperience($name);

    if (!$experience->exists())
    {
        header($_SERVER['SERVER_PROTOCOL'].' 404 Not Found', true, 404);
        exit;
    }

    $uses = $_PLATFORM->getContext()->getSkillUses()->getExperienceSkills($name);

    $result = [
        'name' => $experience->name(),
        'type' => $experience->type(),
        'thumbnail' => base64_encode($experience->thumbnail()),
        'date-from' => intval(1000 * $experience->dateFrom()),
        'date-to' => intval(1000 * $experience->dateTo()),
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