function canSeePlayer(obj) {
    if (canSee(obj, { "x": player.x + player.w / 2, "y": player.y + player.h / 2, "size": player.size }) || canSee(obj, { "x": player.x + player.w / 2, "y": player.y + player.h / 4, "size": player.size }) || canSee(obj, { "x": player.x + player.w / 2, "y": player.y + player.h * 3 / 4, "size": player.size })) {
        return true;
    }
    return false;
}
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 30;
        this.h = 60;
        this.speed = 5;
        this.bouncingy = 0;
        this.bouncingx = 0;
        this.prevposition = [0, 0];
        this.facing = "right";
        this.animationframe = 0;
        this.animationspacing = 10;
        this.attnf = 0;
        this.size = 25;
    }
    draw() {
        imageMode(CORNER);
        image(playerimages[this.facing][this.animationframe], this.x, this.y, this.w, this.h);
        if (this.attnf >= this.animationspacing) {
            this.animationframe++;
            this.attnf = 0;
            if (this.animationframe > 1) {
                this.animationframe = 0;
            }
        }
    }
    move() {
        this.prevposition = [this.x, this.y];
        if (register[UP_ARROW]) {
            if (this.y - this.speed >= 0) {
                this.y -= this.speed;

            }
            this.attnf++;
            this.facing = "up";
            if (!this.placeFree()) {
                this.y = this.prevposition[1];
                this.attnf--;
            }
        }
        if (register[DOWN_ARROW]) {

            if (this.y + this.h + this.speed <= 500) {
                this.y += this.speed;
            }
            this.attnf++;
            this.facing = "down";
            if (!this.placeFree()) {
                this.y = this.prevposition[1];
                this.attnf++;
            }
        }
        if (register[LEFT_ARROW]) {
            if (this.x - this.speed >= 0) {
                this.x -= this.speed;
            }
            this.attnf++;
            this.facing = "left";
            if (!this.placeFree()) {
                this.x = this.prevposition[0];
                this.attnf--;
            }
        }
        if (register[RIGHT_ARROW]) {
            if (this.x + this.speed + this.w <= 496) {
                this.x += this.speed;
            }

            this.attnf++;
            this.facing = "right";
            if (!this.placeFree()) {
                this.x = this.prevposition[0];
                this.attnf--;
            }
        }
    }
    update() {
        this.draw();
        this.move();
        if (doesTileHaveWater(this.x + this.w / 2, this.y + this.h / 2)) {
            this.speed = 1.5;
            this.animationspacing = 33;
        } else {
            this.speed = 5;
            this.animationspacing = 10;
        }
    }
    placeFree() {
        for (var enemy of enemies) {
            if (enemy instanceof Wall && !enemy.playerCanPass) {
                for (var i = 0; i < enemy.nodes.length - 1; i++) {
                    var smallerx = (enemy.nodes[i].x < enemy.nodes[i + 1].x) ? enemy.nodes[i].x : enemy.nodes[i + 1].x;
                    var smallery = (enemy.nodes[i].y < enemy.nodes[i + 1].y) ? enemy.nodes[i].y : enemy.nodes[i + 1].y;
                    var width = Math.abs(enemy.nodes[i].x - enemy.nodes[i + 1].x);
                    width = (width < 4) ? 4 : width;
                    var height = Math.abs(enemy.nodes[i].y - enemy.nodes[i + 1].y);
                    height = (height < 4) ? 4 : height;
                    console.log({ "x": smallerx, "y": smallery, "w": width, "h": height });
                    if (rectOverlap({ "x": smallerx, "y": smallery, "w": width, "h": height }, this)) {
                        return false;
                    }
                }
            }

        }
        return true;
    }
}