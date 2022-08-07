class Player {
    constructor(x, y, s) {
        this.x = x;
        this.y = y;
        this.size = s;
        this.speed = 5;
    }
    draw() {
        noStroke();
        fill(0, 255, 0);
        ellipse(this.x, this.y, this.size, this.size);
    }
    move() {
        if (register[UP_ARROW]) { this.y -= this.speed; }
        if (register[DOWN_ARROW]) { this.y += this.speed; }
        if (register[LEFT_ARROW]) { this.x -= this.speed; }
        if (register[RIGHT_ARROW]) { this.x += this.speed; }
    }
    update() {
        this.draw();
        this.move();
    }
}