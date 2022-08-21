class Powerup {
    constructor(duration, unlockimg, icon, index, spu) {
        this.duration = duration;
        this.timeleft = duration;
        this.unlockimg = unlockimg;
        this.icon = icon;
        this.index = index;
        this.inUse = false;
        this.skillpointsused = spu;
        this.unlockedthislevel = false;
    }
    draw() {
        fill("black");
        image(this.icon, this.index * 30 + 20, 10, 20, 20);
        fill("white");
        textSize(20);
        text(this.index, this.index * 30 + 25, 50);
        textSize(10);
        textStyle(NORMAL);
        if (this.inUse) {
            text(Math.ceil(this.timeleft / 60) + "s left", this.index * 30 + 25, 60)
        }

    }
    useAnimation() {
        if (this.inUse == false && spb.current >= this.skillpointsused) {
            currentThing = "usingpowerup";
            currentThingTimeLeft = 5;
            using = this;
        }
    }
}
class SmokeBombPowerup extends Powerup {
    constructor() {
        super(120, smokeunlockimg, smokeimg, 0, 8);
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
        }
    }

    use() {
        if (this.inUse == false) {
            spb.current -= this.skillpointsused;
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
    }
}

class WallPhasePowerup extends Powerup {
    constructor() {
        super(30, wallphaseunlockimg, wallphaseimg, 1, 5);
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
        }
    }
    use() {
        if (this.inUse == false) {
            spb.current -= this.skillpointsused;
            this.inUse = true;
            this.timeleft = this.duration;
            for (var enemy of enemies) {
                if (enemy instanceof Wall) {
                    enemy.playerCanPass = true;
                }
            }
        }
    }
    disable() {
        this.inUse = false;
        for (var enemy of enemies) {
            if (enemy instanceof Wall) {
                enemy.playerCanPass = false;
            }
        }
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
        for (var powerup of powerupsunlocked) {
            if (this.powerup == powerup) {
                this.x = 100000;
                return;
            }
        }
        this.draw();
        if (this.touchingPlayer()) {
            this.x = 100000;
            currentThing = "unlockingpowerup";
            this.powerup.unlockedthislevel = true;
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