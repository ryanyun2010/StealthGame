class PatrolGuard extends Enemy {
    constructor(x, y, s, n, idletime) {
        super(x, y, s, n);
        this.idletime = idletime || 60;
        this.colors = {
            "chase": color(255, 0, 0, 255),
            "idle": color(255, 40, 40, 150),
            "patrol": color(255, 40, 40, 190),
            "self": color(255, 255, 255)
        };
    }
    states() {
        if (this.state === "idle") {
            this.idleTimer++;
        }
        if (this.state == "patrol") {
            let loc = this.nodes[this.index];
            this.moveTo(loc);
            this.lookAt(loc);
        }
        if (this.state == "chase") {
            this.moveTo(player);
            this.lookAt(player);
        }
    }

    draw() {
        fill(this.colors[this.state]);
        noStroke();
        let left = this.focus - this.fov / 2;
        let right = this.focus + this.fov / 2;
        let diameter = this.dof * 2;
        arc(this.x, this.y, diameter, diameter, left, right);

        //draw the enemy as a red circle
        fill(this.colors.self);
        ellipse(this.x, this.y, this.size, this.size);

    }
    transitions() {
        if (this.state != "chase") {
            if (canSee(this, player)) {
                this.state = "chase";
            }
        }
        if (this.state == "chase") {
            if (!canSee(this, player)) {
                this.state = "idle";
            }
        }
        if (this.state === "idle") {
            if (this.idleTimer == this.idletime) {
                this.state = "patrol";
                this.idleTimer = 0;
                this.index++;
                if (this.index >= this.nodes.length) {
                    this.index = 0;
                }
            }
        }
        if (this.state == "patrol") {
            let loc = this.nodes[this.index];
            if (dist(this.x, this.y, loc.x, loc.y) <= this.speed) {
                this.state = "idle";
            }
        }

    }
}