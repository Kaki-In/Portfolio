<?php

set_include_path("/var/www/html/eden-morey.flopcreation.fr/.server/");

include "main.php";
include "end.php";

$_PLATFORM = new Platform();

if (isset($ARGV['name']))
{
    $name = $ARGV['name'];

    $data = $_PLATFORM->getContext()->getTranslator()->resolveTranslations($name);

    if (!$data)
    {
        header($_SERVER['SERVER_PROTOCOL'].' 404 Not Found', true, 404);
        exit;
    }

    display_result($_PLATFORM, $data);

} else {
    header($_SERVER['SERVER_PROTOCOL'].' 400 Bad Request', true, 400);
};

?>
