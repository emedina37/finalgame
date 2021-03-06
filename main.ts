// Is called by the setDifficulty function, creates the "hard" gamemode.
function hardDifficulty () {
    info.setLife(3)
    tiles.setCurrentTilemap(tilemap`hardMap`)
    for (let index = 0; index < 15; index++) {
        badTank = sprites.create(assets.image`badTankRIght`, SpriteKind.Enemy)
        badTank.setPosition(randint(80, 700), randint(80, 700))
        badTank.setBounceOnWall(true)
        badTank.setVelocity(randint(-50, 50), randint(-50, 50))
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (rightStatus == 1) {
        goodShot = sprites.createProjectileFromSprite(img`
            ................................................................
            ................................................................
            ................................................................
            ................................................................
            ................................................................
            ................................................................
            ................................................................
            ................................................................
            .....................................fffff......................
            ................................................................
            ................................................................
            ................................................................
            ................................................................
            ................................................................
            ................................................................
            ................................................................
            `, goodTank, 800, 0)
        pause(500)
    } else if (leftStatus == 1) {
        goodShot = sprites.createProjectileFromSprite(img`
            ................................................................
            ................................................................
            ................................................................
            ................................................................
            ................................................................
            ................................................................
            ................................................................
            ................................................................
            ....ffff........................................................
            ................................................................
            ................................................................
            ................................................................
            ................................................................
            ................................................................
            ................................................................
            ................................................................
            `, goodTank, -800, 0)
        pause(500)
    }
})
// Changes Sprite to the "left image" when left is pressed, and helps with the orientation of projectiles.
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    goodTank.setImage(tankImages[1])
    leftStatus = 1
    rightStatus = 0
})
// Function setDifficulty is made to evaluate user input for the prompt to select a difficulty and then accordingly creates a tilemap and number of enemies for that selected difficulty.
function setDifficulty (chosenDifficulty: string) {
    for (let index = 0; index <= difficultyTypes.length - 1; index++) {
        if (chosenDifficulty.charAt(0) == difficultyTypes[0] || chosenDifficulty.charAt(0) == difficultyTypes[1]) {
            difficultySet = 0
            easyDifficulty()
            break;
        } else if (chosenDifficulty.charAt(0) == difficultyTypes[2] || chosenDifficulty.charAt(0) == difficultyTypes[3]) {
            difficultySet = 1
            normalDifficulty()
            break;
        } else if (chosenDifficulty.charAt(0) == difficultyTypes[4] || chosenDifficulty.charAt(0) == difficultyTypes[5]) {
            difficultySet = 2
            hardDifficulty()
            break;
        } else {
            game.splash("Please select a valid difficulty.")
            game.reset()
        }
    }
}
// Changes Sprite to the "right image" when right is pressed, and helps with the orientation of projectiles.
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    goodTank.setImage(tankImages[0])
    leftStatus = 0
    rightStatus = 1
})
// Is called by the setDifficulty function, creates the "normal" gamemode.
function normalDifficulty () {
    info.setLife(2)
    tiles.setCurrentTilemap(tilemap`normalMap`)
    for (let index = 0; index < 10; index++) {
        badTank = sprites.create(assets.image`badTankRIght`, SpriteKind.Enemy)
        badTank.setPosition(randint(60, 600), randint(60, 450))
        badTank.setBounceOnWall(true)
        badTank.setVelocity(randint(-50, 50), randint(-50, 50))
    }
}
info.onLifeZero(function () {
    game.over(false, effects.dissolve)
})
// Is called by the setDifficulty function, creates the "easy" gamemode.
function easyDifficulty () {
    info.setLife(1)
    tiles.setCurrentTilemap(tilemap`easyMap`)
    for (let index = 0; index < 5; index++) {
        badTank = sprites.create(assets.image`badTankRIght`, SpriteKind.Enemy)
        badTank.setPosition(randint(40, 400), randint(40, 300))
        badTank.setBounceOnWall(true)
        badTank.setVelocity(randint(-50, 50), randint(-50, 50))
    }
}
// Function scoreChecker is called upon when a sprite of the kind enemy is destroyed by collision with a player's projectile or player's sprite. The function determines if the maximum score has been reached and then accordingly allows the game to continue or ends the game with a win when the max score is reached.
function scoreChecker () {
    if (difficultySet == 0 && info.score() == 5) {
        game.over(true, effects.confetti)
    } else if (difficultySet == 1 && info.score() == 10) {
        game.over(true, effects.confetti)
    } else if (difficultySet == 2 && info.score() == 15) {
        game.over(true, effects.confetti)
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    goodShot.destroy()
    otherSprite.destroy(effects.fire, 500)
    info.changeScoreBy(1)
    scoreChecker()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.fire, 500)
    scoreChecker()
})
// This program should entertain a user by allowing them to play as a tank and destroy enemy sprites. The game should take the user's input for a difficulty and accordingly create a tilemap and number of sprites for the selected difficulty. The game will be able to determine if a user wins or loses based on whether they lose all their lives or destroy all enemy sprites.
let difficultySet = 0
let goodShot: Sprite = null
let leftStatus = 0
let rightStatus = 0
let badTank: Sprite = null
let tankImages: Image[] = []
let goodTank: Sprite = null
let difficultyTypes: string[] = []
scene.setBackgroundColor(1)
difficultyTypes = [
"E",
"e",
"N",
"n",
"H",
"h"
]
setDifficulty(game.askForString("Choose a difficulty of Hard, Normal, or Easy!", 6))
goodTank = sprites.create(img`
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ...............................f................................
    ...........6666666666666...999999...............................
    ...........f666666666669666666666666666.........................
    ...........f6666666666696666666666669669.................ffff.8.
    ...........f66666666666966666666666696669fffffffffffffffffffff8f
    ...........f666666666666966666666666696669ffffffffffffffffffff8f
    ...........99999966666669666666666666966669.....................
    .................999996669666666666666966669....................
    .......6ffffff6.......9999999999999999966666....................
    .......66ffff6666666...88888888888888...........................
    .......66666666666666666666666666666666666666666................
    ......66666666999999999999999999999999999999999666666666........
    ......66ffffff966666669666666696666666966666669ffffff66.........
    ......6ffacecc966666669666666696666666966666669ccecaff6.........
    ......6fecacf69666666696666666966666669666666696fcacef..........
    ......6ffebc6f966666669666666696666666966666669f6cbeff..........
    ......66febc6ff9999999999999999999999999999999ff6cbef...........
    .......6ffbc6fff6cbc6fff6cbc6fff6cbc6fff6cbc6fff6cbff...........
    .......66ffcf666fcecf666fcecf666fcecf666fcecf666fcff............
    ..........ffccccceeeccccceeeccccceeeccccceeecccccff.............
    ...........fffffffffffffffffffffffffffffffffffffff..............
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    `, SpriteKind.Player)
controller.moveSprite(goodTank)
scene.cameraFollowSprite(goodTank)
tankImages = [img`
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ...............................f................................
    ...........6666666666666...999999...............................
    ...........f666666666669666666666666666.........................
    ...........f6666666666696666666666669669.................ffff.8.
    ...........f66666666666966666666666696669fffffffffffffffffffff8f
    ...........f666666666666966666666666696669ffffffffffffffffffff8f
    ...........99999966666669666666666666966669.....................
    .................999996669666666666666966669....................
    .......6ffffff6.......9999999999999999966666....................
    .......66ffff6666666...88888888888888...........................
    .......66666666666666666666666666666666666666666................
    ......66666666999999999999999999999999999999999666666666........
    ......66ffffff966666669666666696666666966666669ffffff66.........
    ......6ffacecc966666669666666696666666966666669ccecaff6.........
    ......6fecacf69666666696666666966666669666666696fcacef..........
    ......6ffebc6f966666669666666696666666966666669f6cbeff..........
    ......66febc6ff9999999999999999999999999999999ff6cbef...........
    .......6ffbc6fff6cbc6fff6cbc6fff6cbc6fff6cbc6fff6cbff...........
    .......66ffcf666fcecf666fcecf666fcecf666fcecf666fcff............
    ..........ffccccceeeccccceeeccccceeeccccceeecccccff.............
    ...........fffffffffffffffffffffffffffffffffffffff..............
    `, img`
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................f...............................
    ...............................999999...6666666666666...........
    .........................666666666666666966666666666f...........
    .8.ffff.................9669666666666666966666666666f...........
    f8fffffffffffffffffffff96669666666666666966666666666f...........
    f8ffffffffffffffffffff966696666666666669666666666666f...........
    .....................96666966666666666696666666999999...........
    ....................966669666666666666966699999.................
    ....................6666699999999999999999.......6ffffff6.......
    ...........................88888888888888...6666666ffff66.......
    ................66666666666666666666666666666666666666666.......
    ........66666666699999999999999999999999999999999966666666......
    .........66ffffff966666669666666696666666966666669ffffff66......
    .........6ffacecc966666669666666696666666966666669ccecaff6......
    ..........fecacf69666666696666666966666669666666696fcacef6......
    ..........ffebc6f966666669666666696666666966666669f6cbeff6......
    ...........febc6ff9999999999999999999999999999999ff6cbef66......
    ...........ffbc6fff6cbc6fff6cbc6fff6cbc6fff6cbc6fff6cbff6.......
    ............ffcf666fcecf666fcecf666fcecf666fcecf666fcff66.......
    .............ffccccceeeccccceeeccccceeeccccceeecccccff..........
    ..............fffffffffffffffffffffffffffffffffffffff...........
    `]
