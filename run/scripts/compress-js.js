#!/usr/bin/env node

process.chdir(__dirname)
process.chdir('..')

var fs = require('fs')
var uglifyJs = require('uglify-js')

var files = [
    'js/Background.js',
    'js/BlurCanvas.js',
    'js/BombNeighbors.js',
    'js/BombParticleCanvases.js',
    'js/BreakingBubble.js',
    'js/BreakingCanvas.js',
    'js/Collide.js',
    'js/ColumnsAndRows.js',
    'js/FallingCanvas.js',
    'js/FallingBubble.js',
    'js/InjectionNeighbors.js',
    'js/Laser.js',
    'js/LaserGradient.js',
    'js/MainCanvas.js',
    'js/MainPanel.js',
    'js/MovingBubble.js',
    'js/MovingCanvas.js',
    'js/Neighbors.js',
    'js/NextBubble.js',
    'js/Orphans.js',
    'js/ParticleCanvas.js',
    'js/ParticleCanvases.js',
    'js/RandomShape.js',
    'js/RandomXY.js',
    'js/ResultCanvas.js',
    'js/Score.js',
    'js/Shuffle.js',
    'js/StillBubble.js',
    'js/StillCanvas.js',
    'js/BubbleShape/AnyColor.js',
    'js/BubbleShape/Black.js',
    'js/BubbleShape/Blue.js',
    'js/BubbleShape/Canvas.js',
    'js/BubbleShape/Green.js',
    'js/BubbleShape/Red.js',
    'js/BubbleShape/Violet.js',
    'js/BubbleShape/White.js',
    'js/BubbleShape/Yellow.js',
    'js/BubbleShape/Bomb/Blue.js',
    'js/BubbleShape/Bomb/Canvas.js',
    'js/BubbleShape/Bomb/Green.js',
    'js/BubbleShape/Bomb/Red.js',
    'js/BubbleShape/Bomb/Violet.js',
    'js/BubbleShape/Bomb/White.js',
    'js/BubbleShape/Bomb/Yellow.js',
    'js/BubbleShape/Injection/Blue.js',
    'js/BubbleShape/Injection/Canvas.js',
    'js/BubbleShape/Injection/Green.js',
    'js/BubbleShape/Injection/Red.js',
    'js/BubbleShape/Injection/Violet.js',
    'js/BubbleShape/Injection/White.js',
    'js/BubbleShape/Injection/Yellow.js',
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
