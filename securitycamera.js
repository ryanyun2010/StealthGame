class SecurityCamera extends Enemy {
    constructor(x, y, s, n, dof, speed, idletime, start, fov) {
        super(x, y, s, n);
        this.turnspeed = speed || PI / 180;
        this.dof = dof;
        this.state = "pan";
        this.focus = start || this.nodes[0];
        this.idletime = idletime || 60;
        this.fov = fov || PI / 2;
        this.colors = {
            "idle": color(200, 150, 150, 80),
            "alert": color(200, 60, 60, 190),
            "pan": color(200, 150, 150, 80),
            "self": color(120, 120, 120)
        };
        this.canAlert = true;
    }
    draw() {
        if (this.canAlert) {
            fill(this.colors[this.state]);
            noStroke();
            let left = this.focus - this.fov / 2;
            let right = this.focus + this.fov / 2;
            let diameter = this.dof * 2;
            arc(this.x, this.y, diameter, diameter, left, right);
        }

        //draw the enemy as a red circle
        rotatedimg(cameraimg, this.x, this.y, this.size * 1.5, this.size * 0.75, this.focus);

    }
    states() {
        if (this.state == "idle") {
            this.idleTimer++;
        }
        if (this.state == "pan") {
            let theta = this.nodes[this.index];
            let dt = simplifyAngle(theta - this.focus);
            if (abs(dt) < this.turnspeed) {
                return;
            }
            let t = simplifyAngle(theta);
            let f = simplifyAngle(this.focus);
            if (f < t) {
                if (abs(f - t) < PI) {
                    this.focus += this.turnspeed;
                } else {
                    this.focus -= this.turnspeed;
                }
            } else {
                if (abs(f - t) < PI) {
                    this.focus -= this.turnspeed;
                } else {
                    this.focus += this.turnspeed;
                }
            }
        }
        if (this.state == "alert") {
            this.lookAt(player);
        }
    }
    transitions() {
        if (this.state == "idle") {
            if (this.idleTimer == this.idletime) {
                this.state = "pan";
                this.idleTimer = 0;
                this.index++;
                if (this.index >= this.nodes.length) {
                    this.index = 0;
                }
            }
        }
        if (this.state == "pan") {
            let theta = this.nodes[this.index];
            let dt = simplifyAngle(theta - this.focus);
            if (dt < PI / 60) {
                this.state = "idle";
                this.idleTimer = 0;
                return;
            }
        }
        if (this.state != "alert") {
            if (canSeePlayer(this) && this.canAlert) {
                this.state = "alert";
            }
        }
        if (this.state == "alert") {
            if (!canSeePlayer(this)) {
                this.state = "idle";
            }
        }

    }
}