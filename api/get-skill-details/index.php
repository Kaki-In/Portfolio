<?php

set_include_path("/var/www/html/eden-morey.flopcreation.fr/.server/");

include "main.php";
include "end.php";

$_PLATFORM = new Platform();

if (isset($ARGV['name']))
{
    $name = $ARGV['name'];

    $skill = $_PLATFORM->getContext()->getSkills()->getSkill($name);

    if (!$skill->exists())
    {
        header($_SERVER['SERVER_PROTOCOL'].' 404 Not Found', true, 404);
        exit;
    }

    $uses = $_PLATFORM->getContext()->getSkillUses()->getSkillUses($name);

    $result = [
        'logo' => base64_encode($skill->logo()),
        'type' => $skill->type(),
        'experiences-uses' => [],
        'projects-uses' => [],
    ];

    foreach ($uses as $use)
    {
        if ($use->type() == 0)
        {
            $experience = $use->experience();
            $result['experiences-uses'][] = [
                'name' => $experience->name(),
                'type' => $experience->type(),
                'thumbnail' => base64_encode($experience->thumbnail()),
                'date-from' => intval(1000 * $experience->dateFrom()),
                'date-to' => intval(1000 * $experience->dateTo()),
            ];
        } else if ($use->type() == 1) {
            $project = $use->project();
            $result['projects-uses'][] = [
                'name' => $project->name(),
                'type' => $project->type(),
                'thumbnail' => base64_encode($project->thumbnail()),
                'date-from' => intval(1000 * $project->dateFrom()),
                'date-to' => intval(1000 * $project->dateTo()),
                'finished' => $project->finished(),
                'link' => $project->link()
            ];
        }
    }

    $dates  = array_column($result['experiences-uses'], 'date-from');
    array_multisort($dates, SORT_ASC, $result['experiences-uses']);
    
    $dates  = array_column($result['projects-uses'], 'date-from');
    array_multisort($dates, SORT_ASC, $result['projects-uses']);
    
    display_result($_PLATFORM, $result);

} else {
    header($_SERVER['SERVER_PROTOCOL'].' 400 Bad Request', true, 400);
};


?>