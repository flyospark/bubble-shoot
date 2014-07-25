#!/usr/bin/env node

process.chdir(__dirname)
process.chdir('..')

var fs = require('fs')
var uglifyJs = require('uglify-js')

var files = [
    'js/Background.js',
    'js/BlurCanvas.js',
    'js/BreakingBubble.js',
    'js/BreakingCanvas.js',
    'js/Collide.js',
    'js/FallingCanvas.js',
    'js/FallingBubble.js',
    'js/Laser.js',
    'js/MainCanvas.js',
    'js/MainPanel.js',
    'js/MovingBubble.js',
    'js/MovingCanvas.js',
    'js/Neighbors.js',
    'js/NextBubble.js',
    'js/Orphans.js',
    'js/RandomXY.js',
    'js/ResultCanvas.js',
    'js/StillBubble.js',
    'js/StillCanvas.js',
    'js/Score.js',
    'js/BubbleShape/Blue.js',
    'js/BubbleShape/Green.js',
    'js/BubbleShape/Random.js',
    'js/BubbleShape/Red.js',
    'js/BubbleShape/Violet.js',
    'js/BubbleShape/White.js',
    'js/BubbleShape/Yellow.js',
    'js/Main.js',
]

var source = '(function () {\n'
files.forEach(function (file) {
    source += fs.readFileSync(file, 'utf8') + ';\n'
})
source += '\n})()'

var ast = uglifyJs.parse(source)
ast.figure_out_scope()
var compressor = uglifyJs.Compressor({})
var compressedAst = ast.transform(compressor)
compressedAst.figure_out_scope()
compressedAst.compute_char_frequency()
compressedAst.mangle_names()
var compressedSource = compressedAst.print_to_string()

fs.writeFileSync('combined.js', source)
fs.writeFileSync('compressed.js', compressedSource)
