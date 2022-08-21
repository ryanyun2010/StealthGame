class Objective {
    constructor(x, y, s) {
        this.x = x;
        this.y = y;
        this.s = s;
    }
    draw() {
        rectMode(CENTER, CENTER)
        fill("yellow");
        noStroke();
        rect(this.x, this.y, this.s, this.s);
    }
    isTouchingPlayer() {
        if (rectOverlap({ "x": this.x - this.s / 2, "y": this.y - this.y / 2, "w": this.s, "h": this.s }, player)) {
            return true;
        }
        return false;
    }
    update() {
        this.draw();
        if (this.isTouchingPlayer()) {
            curlevel++;
            if (curlevel == levels.length) {
                currentThing = "winning";
                currentThingTimeLeft = -1;
            } else {
                currentThingTimeLeft = 30;
                currentThing = "winning";
                for (var powerup of powerupsunlocked) {
                    powerup.unlockedthislevel = false;
                }
            }
        }
    }
}