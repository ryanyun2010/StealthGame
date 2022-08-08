class Enemy {
    constructor(x, y, s, n) {
        this.x = x;
        this.y = y;
        this.size = s;
        this.state = "idle";
        this.idleTimer = 0;
        this.shape = "circle";

        this.speed = 3;
        this.index = 0;
        this.nodes = n;

        this.focus = 0;
        this.dof = 100;
        this.fov = PI / 3;

        this.turnspeed = PI / 50;

    }

    lookAt(loc) {
        let dx = loc.x - this.x;
        let dy = loc.y - this.y;
        let theta = atan2(dy, dx);
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


    moveTo(loc) {
        let theta = atan2(loc.y - this.y, loc.x - this.x);
        let xspeed = this.speed * cos(theta);
        let yspeed = this.speed * sin(theta);
        this.x += xspeed;
        this.y += yspeed;
    }



    update() {
        this.draw();
        this.states();
        this.transitions();
    }
}