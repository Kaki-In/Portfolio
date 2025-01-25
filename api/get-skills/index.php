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

    $skills = $_PLATFORM->getContext()->getSkills()->getSkillsOfType($type);

} else {
    $skills = $_PLATFORM->getContext()->getSkills()->getAllSkills();
};

$result = [];

foreach ($skills as $skill)
{
    $result[] = [
        'name' => $skill->name(),
        'type' => $skill->type(),
        'logo' => base64_encode($skill->logo()),
    ];
}

display_result($_PLATFORM, $result);


?>