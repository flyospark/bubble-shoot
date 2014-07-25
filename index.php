<?php

header('Content-Type: text/html; charset=UTF-8');

echo '<!DOCTYPE html>'
    .'<html>'
        .'<head>'
            .'<title>Bubbles</title>'
            .'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'
            .'<link rel="icon" type="image/png" href="images/icons/16.png" />'
            .'<link rel="icon" type="image/png" href="images/icons/32.png" sizes="32x32" />'
            .'<link rel="stylesheet" type="text/css" href="index.css" />'
        .'</head>'
        .'<body>'
            .'<img src="images/icons/128.png" />'
            .'<h1>Bubbles</h1>'
            .'<div>A bubble shooting game for Firefox OS.</div>'
            .'<a class="button" href="run/">Launch</a>'
            .'<button class="button" id="installButton">Install</button>'
            .'<h2>Description</h2>'
            .'<div id="description">'
                .'Shoot bubbles. Collect three or more of the same color to break.'
                .' Break them to gain higher score. Licensed under AGPL. Source code'
                .' is available on <a href="https://github.com/Qliavi/bubbles/">GitHub</a>.'
            .'</div>'
            .'<script type="text/javascript" src="index.js"></script>'
            .'<script type="text.javascript" src="index.js"></script>'
        .'</body>'
    .'</html>';
