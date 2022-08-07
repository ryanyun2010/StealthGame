class PatrolGuard extends Enemy {
    constructor(x, y, s, n) {
        super(x, y, s, n);
        this.colors = {
            "chase": color(255, 0, 0, 100),
            "idle": color(50, 250, 250, 150),
            "patrol": color(50, 250, 250, 150),
            "self": color(0, 0, 0)
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

        //draw the current state above the enemy
        textAlign(CENTER, CENTER);
        textSize(20);
        text(this.state, this.x, this.y - this.size * 0.85);

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
            if (this.idleTimer == 60) {
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