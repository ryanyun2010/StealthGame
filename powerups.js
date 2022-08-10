class Powerup {
    constructor(cooldown, duration, unlockimg, icon, index) {
        this.cooldown = cooldown;
        this.cooldowntime = 0;
        this.duration = duration;
        this.timeleft = duration;
        this.unlockimg = unlockimg;
        this.icon = icon;
        this.index = index;
        this.inUse = false;
    }
    draw() {
        fill("black");
        rect(0, 0, 100, 50);
        image(this.icon, this.index * 30 + 20, 10, 20, 20);
        fill("white");
        textSize(20);
        text(this.index, this.index * 30 + 25, 50);
        textSize(10);
        textStyle(NORMAL);
        if (this.inUse == false && this.cooldowntime != this.cooldown && this.cooldowntime != 0) {
            text(Math.ceil(this.cooldowntime / 60) + "s til next use", this.index * 30 + 25, 60);
        }
        if (this.inUse) {
            text(Math.ceil(this.timeleft / 60) + "s left", this.index * 30 + 25, 60)
        }

    }
}
class SmokeBombPowerup extends Powerup {
    constructor() {
        super(1800, 120, smokeunlockimg, smokeimg, 0);
    }
    update() {
        this.draw();
        if (this.timeleft == 0 && this.inUse) {
            this.timeleft = 0;
            this.inUse = false;
            this.disable();
        }
        if (this.inUse) {
            this.timeleft--;
        } else {
            if (this.cooldowntime > 0) {
                this.cooldowntime--;
            }

        }
    }
    useAnimation() {
        if (this.inUse == false && this.cooldowntime == 0) {
            currentThing = "usingpowerup";
            currentThingTimeLeft = 5;
            using = this;
        }
    }
    use() {
        if (this.inUse == false && this.cooldowntime == 0) {

            this.inUse = true;
            this.timeleft = this.duration;
            for (var enemy of enemies) {
                if (enemy instanceof SecurityCamera) {
                    enemy.canAlert = false;
                }
            }
        }
    }

    disable() {
        this.inUse = false;
        for (var enemy of enemies) {
            if (enemy instanceof SecurityCamera) {
                enemy.canAlert = true;
            }
        }
        this.cooldowntime = this.cooldown;
    }
}
class PowerupCollectable {
    constructor(powerup, x, y, s) {
        this.powerup = powerup;
        this.x = x;
        this.y = y;
        this.s = s;
    }
    draw() {
        image(this.powerup.icon, this.x, this.y, this.s, this.s);
    }
    update() {
        this.draw();
        if (this.touchingPlayer()) {
            this.x = 1000000;
            currentThing = "unlockingpowerup";
            unlocking = this.powerup;
            currentThingTimeLeft = 60;
            powerupsunlocked.push(this.powerup);
        }

    }
    touchingPlayer() {

        if (player.x + player.size / 2 > this.x && player.x - player.size / 2 < this.x + this.s && player.y + player.size / 2 > this.y && player.y - player.size / 2 < this.y + this.s) {
            return true;
        }
        return false;
    }
}