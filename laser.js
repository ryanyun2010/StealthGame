class Laser extends Enemy {
    constructor(x, y, s, n, activetime, idletime) {
        super(x, y, s, n);
        this.colors = {
            "idle": color(230, 230, 230, 150),
            "active": color(255, 0, 0, 150),
            "self": color(255, 255, 255)
        };
        this.activetime = activetime || 120;
        this.idletime = idletime || 60;
        this.opacity = 40;
    }
    states() {
        if (this.state == "idle") {
            this.idleTimer++;
        }
        if (this.state == "active") {
            this.idleTimer++;
        }
    }
    transitions() {
        if (this.state == "idle") {
            if (this.idleTimer == this.idletime) {
                this.idleTimer = 0;
                this.state = "active";
                this.opacity = 100;
            }
        }
        if (this.state == "active") {
            if (this.idleTimer == this.activetime) {
                this.idleTimer = 0;
                this.state = "idle";
                this.opacity = 40;
            }
            if (this.intersectPlayer()) {
                currentThing = "failing";
                currentThingTimeLeft = 15;
            }
        }
    }
    draw() {
        if (this.state != "idle") {
            if (this.idleTimer > this.activetime / 2) {
                this.opacity -= 155 / this.activetime;
                if (this.opacity < 100) {
                    this.opacity = 100;
                }
            } else {
                this.opacity += 155 / this.activetime;
                if (this.opacity > 254) {
                    this.opacity = 254;
                }
            }
        } else {
            if (this.idleTimer > this.idletime / 2) {
                this.opacity -= 20 / this.idletime;
            } else {
                this.opacity += 20 / this.idletime;
            }
            if (this.opacity < 10) {
                this.opacity = 10;
            }
            if (this.opacity > 80) {
                this.opacity = 30;
            }
        }
        fill(255, 0, 0, 50);
        noStroke();
        for (var n of this.nodes) {
            ellipse(n.x, n.y, this.size, this.size)
        }
        fill(this.colors.self);
        strokeWeight(3);
        for (var n of this.nodes) {
            ellipse(n.x, n.y, this.size, this.size);
        }
        rectMode(CORNER);
        fill(255, 0, 0, this.opacity);
        for (var i = 0; i < this.nodes.length - 1; i++) {
            var largerx = (this.nodes[i].x > this.nodes[i + 1].x) ? this.nodes[i].x : this.nodes[i + 1].x;
            var largery = (this.nodes[i].y > this.nodes[i + 1].y) ? this.nodes[i].y : this.nodes[i + 1].y;
            var smallerx = (this.nodes[i].x < this.nodes[i + 1].x) ? this.nodes[i].x : this.nodes[i + 1].x;
            var smallery = (this.nodes[i].y < this.nodes[i + 1].y) ? this.nodes[i].y : this.nodes[i + 1].y;

            rect(smallerx - 2, smallery - 2, largerx - smallerx + 4, largery - smallery + 4);
        }
    }
    intersectPlayer() {
        for (var i = 0; i < this.nodes.length - 1; i++) {
            let n1 = this.nodes[i];
            let n2 = this.nodes[i + 1];
            var width = (Math.abs(n1.x - n2.x) < 4) ? 4 : Math.abs(n1.x - n2.x);
            var height = (Math.abs(n1.y - n2.y) < 4) ? 4 : Math.abs(n1.y - n2.y);
            var smallerx = (n1.x <= n2.x) ? n1.x : n2.x;
            var smallery = (n1.y <= n2.y) ? n1.y : n2.y

            var rect1 = { "x": smallerx, "y": smallery, "w": width, "h": height };
            if (rectOverlap(rect1, player)) {
                return true;
            }
        }
        return false;
    }
}