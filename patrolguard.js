class PatrolGuard extends Enemy {
    constructor(x, y, n, idletime, fov, dof, turnspeed) {
        super(x, y, 35, n);
        this.idletime = idletime || 60;
        this.fov = fov || PI / 4;
        this.dof = dof || 150;
        this.turnspeed = turnspeed || PI / 120;
        this.colors = {
            "chase": color(200, 0, 0, 150),
            "idle": color(40, 160, 160, 150),
            "patrol": color(40, 160, 160, 190)
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

        imageMode(CENTER);
        if (this.state == "chase") {

            rotatedimg(guardimgs[1], this.x, this.y, this.size, this.size * 0.7, this.focus);
        } else {
            rotatedimg(guardimgs[0], this.x, this.y, this.size, this.size * 0.7, this.focus);
        }
        imageMode(CORNER);

    }
    transitions() {
        if (this.state != "chase") {
            if (canSeePlayer(this)) {
                this.state = "chase";
            }
        }
        if (this.state == "chase") {
            if (!canSeePlayer(this)) {
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