var enemies, player, playing, objective, levels;
var curlevel = 0;
var startscreenimg, howtoplayscreenimg, successimg, failureimg, smokeunlockimg, smokeimg;
var unlocking = "";
var powerupsunlocked = [];
var currentThing = "starting";
var currentThingTimeLeft = 0;
var using;


function preload() {
    startscreenimg = loadImage("img/startscreen.png");
    howtoplayscreenimg = loadImage("img/HowToPlay.png");
    successimg = loadImage("img/Success.png");
    failureimg = loadImage("img/Failure.png");
    smokeunlockimg = loadImage("img/smokebomb.png");
    smokeimg = loadImage("img/smokebombicon.png");
}

function setup() {

    levels = [];
    levels.push({
        "enemies": [new PatrolGuard(250, 250, 25, [
                { x: 250, y: 250 },
                { x: 160, y: 40 },
                { x: 160, y: 160 },
                { x: 40, y: 160 },
                { x: 40, y: 460 },
                { x: 250, y: 460 }
            ]),
            new PatrolGuard(40, 160, 25, [
                { x: 40, y: 160 },
                { x: 40, y: 460 },
                { x: 250, y: 460 },
                { x: 250, y: 250 },
                { x: 160, y: 40 },
                { x: 160, y: 160 }
            ]),
            new PatrolGuard(300, 250, 25, [
                { x: 300, y: 40 },
                { x: 300, y: 460 },
                { x: 460, y: 460 },
                { x: 460, y: 40 },
                { x: 300, y: 460 },
            ]),
            new SecurityCamera(40, 40, 20, [Math.PI * -0.2, Math.PI * 0.7], 150),
            new SecurityCamera(460, 460, 20, [Math.PI * 1.6, Math.PI * 0.7], 150),
            new Laser(50, 50, 10, [
                { x: 140, y: 10 },
                { x: 140, y: 140 },
                { x: 10, y: 140 }
            ], 120, 40)
        ],
        "player": new Player(250, 400, 25),
        "objective": new Objective(100, 100, 40)
    });
    levels.push({
        "enemies": [
            new SecurityCamera(500, 0, 25, [PI, PI * 0.5], 150, PI / 90, 10, PI * 0.7),
            new SecurityCamera(500, 500, 25, [PI, PI * 1.5], 120, PI / 90, 10, PI * 1.3),
            new SecurityCamera(0, 500, 25, [0, PI * 1.5], 120, PI / 90, 10, PI * 0.55),
            new SecurityCamera(0, 0, 25, [0, PI * 0.5], 120, PI / 90, 10, PI * 0.3),
            new Laser(50, 50, 10, [
                { x: 370, y: 10 },
                { x: 370, y: 130 },
                { x: 490, y: 130 }
            ]),
            new Laser(50, 50, 10, [
                { x: 50, y: 50 },
                { x: 100, y: 50 },
                { x: 100, y: 250 },
                { x: 50, y: 250 },
                { x: 50, y: 450 },
            ]),
            new PatrolGuard(480, 160, 25, [
                { x: 470, y: 150 },
                { x: 310, y: 150 },
                { x: 310, y: 40 },
                { x: 310, y: 150 }
            ]),
            new PatrolGuard(340, 160, 25, [
                { x: 370, y: 180 },
                { x: 330, y: 40 },
                { x: 360, y: 180 },
                { x: 450, y: 180 }
            ]),
            new PatrolGuard(340, 40, 25, [
                { x: 340, y: 40 },
                { x: 350, y: 160 },
                { x: 480, y: 160 },
                { x: 340, y: 160 }
            ]),
            new PatrolGuard(20, 20, 25, [
                { x: 20, y: 20 },
                { x: 100, y: 100 },
                { x: 20, y: 180 },
                { x: 100, y: 260 },
                { x: 20, y: 340 },
                { x: 100, y: 420 },
                { x: 20, y: 480 }
            ], 20),
            new PatrolGuard(20, 450, 25, [
                { x: 20, y: 450 },
                { x: 450, y: 450 }
            ])
        ],
        "player": new Player(250, 400, 25),
        "objective": new Objective(400, 100, 40)
    });
    levels.push({
        "enemies": [
            new Laser(50, 50, 10, [
                { "x": 0, "y": 430 },
                { "x": 200, "y": 430 }
            ], 30, 1),
            new Laser(50, 50, 10, [
                { "x": 200, "y": 430 },
                { "x": 200, "y": 390 },
                { "x": 250, "y": 390 },
                { "x": 250, "y": 430 },
                { "x": 400, "y": 430 }
            ], 30, 1),
            new Laser(50, 50, 10, [
                { "x": 300, "y": 150 },
                { "x": 500, "y": 150 },
            ], 30, 30),
            new PatrolGuard(400, 460, 25, [
                { "x": 400, "y": 460 },
                { "x": 120, "y": 460 }
            ], 30, PI / 10, 40),
            new SecurityCamera(500, 0, 20, [PI, PI * 0.5], 250, PI / 60, 1, PI * 0.7),
            new PatrolGuard(400, 150, 25, [{ "x": 400, "y": 150 }, { "x": 200, "y": 150 }], 11, PI * 0.6, 70, PI / 60),
            new PatrolGuard(260, 150, 25, [{ "x": 400, "y": 150 }, { "x": 200, "y": 150 }], 7, PI * 0.3, 70, PI / 60),
            new PatrolGuard(90, 50, 25, [{ "x": 400, "y": 50 }, { "x": 200, "y": 50 }], 15, PI * 0.4, 70, PI / 60),
            new PatrolGuard(400, 50, 25, [{ "x": 400, "y": 50 }, { "x": 200, "y": 50 }], 12, PI * 0.5, 70, PI / 60)
        ],
        "player": new Player(40, 460, 25),
        "objective": new Objective(400, 100, 40)
    });

    playing = true;
    setLevel(levels[curlevel]);
    createCanvas(500, 500);
}

function setLevel(level) {
    enemies = level.enemies;
    player = level.player;
    objective = level.objective;
}

document.getElementById("playbtn").addEventListener("click", function() {
    currentThing = "playing";
});
document.getElementById("howbtn").addEventListener("click", function() {
    document.getElementById("back").style.display = "block";
    currentThing = "howtoplay";
});
document.getElementById("back").addEventListener("click", function() {
    currentThing = "starting";
    document.getElementById("back").style.display = "none";
});

function draw() {
    if (currentThing != "playing") {
        doCurrentAction();
        return;
    }
    background(0, 0, 0);
    for (enemy of enemies) {
        enemy.update();
    }
    player.update();
    checkGameOver();
    checkAlert();
    objective.update();
    for (var powerup of powerupsunlocked) {
        powerup.update();
    }
    if (register[48]) {
        powerupsunlocked[0].useAnimation();
    }
}

function doCurrentAction() {
    if (currentThing == "starting") {
        background(0, 0, 0);
        image(startscreenimg, 0, 0, 500, 400);
    }
    if (currentThing == "howtoplay") {
        background(0, 0, 0);
        image(howtoplayscreenimg, -100, 0, 650, 400);
    }
    if (currentThing == "usingpowerup") {
        background(0, 0, 0);
        image(using.unlockimg, 0, 100, 500, 300);
        if (currentThingTimeLeft == 0) {
            using.use();
            currentThing = "playing";
        }
    }
    if (currentThing == "unlockingpowerup") {
        background(0, 0, 0);
        image(unlocking.unlockimg, 0, 100, 500, 300);
        if (currentThingTimeLeft == 0) {
            currentThing = "playing";
            setup();
        }
    }
    if (currentThing == "winning") {
        if (currentThingTimeLeft == 0) {
            currentThing = "playing";
            setup();
        }
        background(0, 0, 0);
        image(successimg, 0, 100, 500, 300);
    }
    if (currentThing == "failing") {
        if (currentThingTimeLeft == 0) {
            for (var powerup of powerupsunlocked) {
                powerup.cooldowntime = 0;
                powerup.inUse = false;
            }
            currentThing = "playing";
            setup();
        }
        background(0, 0, 0);
        image(failureimg, 0, 100, 500, 300);
    }
    currentThingTimeLeft--;

}

function checkGameOver() {
    for (var enemy of enemies) {
        if (enemy instanceof PatrolGuard) {
            let d = dist(enemy.x, enemy.y, player.x, player.y);
            let s = (player.size + enemy.size) / 2;
            if (d < s) {
                currentThingTimeLeft = 15;
                currentThing = "failing";
            }
        }
    }
}

function alertOn() {
    for (var enemy of enemies) {
        if (enemy.state == "alert") {
            return true;
        }
    }
    return false;
}

function checkAlert() {
    if (alertOn()) {
        for (var enemy of enemies) {
            if (enemy instanceof PatrolGuard) {
                enemy.state = "chase";
            }
            if (enemy instanceof SecurityCamera) {
                enemy.state = "alert";
            }
        }
    }
}