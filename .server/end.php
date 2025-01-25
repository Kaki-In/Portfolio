<?php

function display_result($_PLATFORM, $result)
{
    $_PLATFORM->getLocalUser()->getDatabase()->exportToClient(time() + 60 * 60, "/", "");
    echo json_encode($result);
}

?>