class Objective {
    constructor(x, y, s) {
        this.x = x;
        this.y = y;
        this.s = s;
        this.timeInBetween = 5;
        this.randomnum = 175;
    }
    draw() {
        imageMode(CENTER);
        this.timeInBetween++;
        if (this.timeInBetween > 10) {
            this.randomnum = random(150, 200);
            this.timeInBetween = 0;
        }
        fill(200, 200, 200, this.randomnum);
        image(energyimg, this.x, this.y, this.s, this.s * 0.87);
        ellipse(this.x, this.y, this.s * 0.75, this.s * 0.75);
        imageMode(CORNER);
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