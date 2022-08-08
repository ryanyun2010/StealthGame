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
            }
        }
        if (this.state == "active") {
            if (this.idleTimer == this.activetime) {
                this.idleTimer = 0;
                this.state = "idle";
            }
            if (this.intersectPlayer()) {
                currentThing = "failing";
                currentThingTimeLeft = 15;
            }
        }
    }
    draw() {
        fill(255, 0, 0, 50)
        for (var n of this.nodes) {
            ellipse(n.x, n.y, this.size, this.size)
        }
        if (this.state != "idle") {
            fill(this.colors.self);
            strokeWeight(3);
            stroke(this.colors.active);
            for (var n of this.nodes) {
                ellipse(n.x, n.y, this.size, this.size)
            }
            for (var i = 0; i < this.nodes.length - 1; i++) {
                line(this.nodes[i].x, this.nodes[i].y, this.nodes[i + 1].x, this.nodes[i + 1].y);
            }
        }
    }
    intersectPlayer() {
        for (var i = 0; i < this.nodes.length - 1; i++) {
            let n1 = this.nodes[i];
            let n2 = this.nodes[i + 1];
            if (circleLineOverlap(n1, n2, player)) {
                return true;
            }
        }
        return false;
    }
}