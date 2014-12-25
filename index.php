<?php

include_once 'fns/get_revisions.php';
$revisions = get_revisions();

header('Content-Type: text/html; charset=UTF-8');

echo '<!DOCTYPE html>'
    .'<html>'
        .'<head>'
            .'<title>Bubble Shoot</title>'
            .'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'
            .'<meta name="viewport" content="width=device-width, user-scalable=no" />'
            .'<link rel="icon" type="image/png"'
            .' href="images/icons/16.png?'.$revisions['images/icons/16.png'].'" />'
            .'<link rel="icon" type="image/png" sizes="32x32"'
            .' href="images/icons/32.png?'.$revisions['images/icons/32.png'].'" />'
            .'<link rel="icon" type="image/png" sizes="64x64"'
            .' href="images/icons/64.png?'.$revisions['images/icons/64.png'].'" />'
            .'<link rel="stylesheet" type="text/css" href="index.css?3" />'
        .'</head>'
        .'<body>'
            .'<img id="logoImage" src="images/icons/128.png?'.$revisions['images/icons/128.png'].'" />'
            .'<h1>Bubble Shoot</h1>'
            .'<div>A bubble shooting game.</div>'
            .'<a class="button" href="run/">Launch</a>'
            .'<button disabled="disabled" class="button" id="installButton">Install</button>'
            .'<h2>Description</h2>'
            .'<div id="description">'
                .'Shoot bubbles. Collect three or more of the same color to break.'
                .' The more your break the more score you gain.'
                .' Source code is available on'
                .' <a href="https://github.com/Qliavi/bubble-shoot/">GitHub</a>.'
                .' Licensed under AGPL.'
            .'</div>'
            .'<div>'
                .'<br />'
                .'<a href="http://qliavi.com/">qliavi.com</a>'
            .'</div>'
            .'<script type="text/javascript" src="index.js?1"></script>'
        .'</body>'
    .'</html>';
