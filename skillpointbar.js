class SkillPointBar {
    constructor(max, current, regenspeed) {
        this.max = max;
        this.current = current;
        this.regenspeed = regenspeed;
        this.timetilnextregen = regenspeed;
    }
    draw() {
        fill("white");
        rectMode(CENTER);
        stroke(0, 255, 255);
        fill("black");
        rect(250, 20, 200, 20);
        fill(0, 200, 200);
        rectMode(CORNER);
        strokeWeight(2);
        rect(150, 10, (this.current / this.max) * 200, 20);
        fill("black");
        noStroke();
        textSize(18);
        textStyle(BOLD);
        text(this.current + " / " + this.max, 158, 26);
    }
    regen() {
        this.timetilnextregen--;

        if (this.timetilnextregen == 0) {
            this.timetilnextregen = this.regenspeed;
            if (this.current < this.max) {
                this.current++;
            }
        }
    }
    reset() {
        this.current = this.max;
        this.timetilnextregen = this.regenspeed;
    }
    update() {
        this.regen();
        this.draw();
    }
}