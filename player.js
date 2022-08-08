class Player {
    constructor(x, y, s) {
        this.x = x;
        this.y = y;
        this.size = s;
        this.speed = 5;
        this.bouncingy = 0;
        this.bouncingx = 0;
    }
    draw() {
        noStroke();
        fill(0, 255, 0);
        ellipse(this.x, this.y, this.size, this.size);
    }
    move() {
        if (register[UP_ARROW]) {
            if (this.bouncingy > 0) {
                this.y += this.bouncingy;
                this.bouncingy -= 2 * this.speed;
                if (this.bouncingy < 0) {
                    this.bouncingy = 0;
                }
            } else {
                this.y -= this.speed;
            }
            if ((this.y - this.speed - this.size / 2) < 0) {
                this.y += this.speed;
                this.bouncingy = this.speed * 4;
            }
        }
        if (register[DOWN_ARROW]) {
            if (this.bouncingy < 0) {
                this.y += this.bouncingy;
                this.bouncingy += 2 * this.speed;
                if (this.bouncingy > 0) {
                    this.bouncingy = 0;
                }
            } else {
                this.y += this.speed;
            }
            if ((this.y + this.speed + this.size / 2) > 500) {
                this.y -= this.speed;
                this.bouncingy = this.speed * -4;
            }
        }
        if (register[LEFT_ARROW]) {
            if (this.bouncingx > 0) {
                this.x += this.bouncingx;
                this.bouncingx -= 2 * this.speed;
                if (this.bouncingx < 0) {
                    this.bouncingx = 0;
                }
            } else {
                this.x -= this.speed;
            }
            if ((this.x - this.speed - this.size / 2) < 0) {
                this.x += this.speed;
                this.bouncingx = this.speed * 4;
            }
        }
        if (register[RIGHT_ARROW]) {
            if (this.bouncingx < 0) {
                this.x += this.bouncingx;
                this.bouncingx += 2 * this.speed;
                if (this.bouncingx > 0) {
                    this.bouncingx = 0;
                }
                console.log(this.bouncingx);
            } else {
                this.x += this.speed;
            }
            if ((this.x + this.speed + this.size / 2) > 500) {
                this.x -= this.speed;
                this.bouncingx = this.speed * -4;

            }
        }
    }
    update() {
        this.draw();
        this.move();
    }
}