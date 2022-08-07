var enemies, player, playing;

function setup() {
    createCanvas(500, 500);
    enemies = []
    enemies.push(new PatrolGuard(250, 250, 25, [
        { x: 250, y: 250 },
        { x: 100, y: 100 },
        { x: 100, y: 400 },
        { x: 400, y: 400 },
        { x: 400, y: 100 }
    ]));
    enemies.push(new SecurityCamera(250, 50, 20, [PI * 0.25, PI * 0.75], 175));
    enemies.push(new Laser(50, 50, 10, [
        { x: 250, y: 350 },
        { x: 400, y: 350 },
        { x: 400, y: 250 }
    ]));
    player = new Player(250, 400, 25);
    playing = true;
}

function draw() {
    if (playing) {
        background(200, 255, 200);
        for (enemy of enemies) {
            enemy.update();
        }
        player.update();
        checkGameOver();
        checkAlert();
    } else {
        drawGameOver();
    }
}

function checkGameOver() {
    for (var enemy of enemies) {
        if (enemy instanceof PatrolGuard) {
            let d = dist(enemy.x, enemy.y, player.x, player.y);
            let s = (player.size + enemy.size) / 2;
            if (d < s) {
                playing = false;
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

function drawGameOver() {
    background(0, 0, 0, 8);
    fill("red");
    textSize(48);
    textAlign(CENTER, CENTER);
    text("You Failed!", 250, 250);

}