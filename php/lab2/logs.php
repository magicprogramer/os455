<?php
require_once 'vendor/autoload.php';
$content = file_get_contents(conf()["fpath"]);
$arr = explode("\n", $content);
foreach($arr as $a)
{
    echo $a."<br>";
}
