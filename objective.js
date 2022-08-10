class Objective {
    constructor(x, y, s) {
        this.x = x;
        this.y = y;
        this.s = s;
    }
    draw() {
        rectMode(CENTER, CENTER)
        fill("yellow");
        noStroke();
        rect(this.x, this.y, this.s, this.s);
    }
    isTouchingPlayer() {
        var leftx = this.x - this.s / 2;
        var rightx = this.x + this.s / 2;
        var topy = this.y - this.s / 2;
        var bottomy = this.y + this.s / 2;
        var playerleftx = player.x - player.size / 2;
        var playerrightx = player.x + player.size / 2;
        var playertopy = player.y - player.size / 2;
        var playerbottomy = player.y + player.size / 2;
        if (playerrightx > leftx && playerbottomy > topy && playertopy < bottomy && playerleftx < rightx) {
            return true;
        }
    }
    update() {
        this.draw();
        if (this.isTouchingPlayer()) {
            curlevel++;
            if (curlevel == levels.length) {
                currentThing = "winning";
                currentThingTimeLeft = -1;
            } else {
                currentThingTimeLeft = 30;
                currentThing = "winning";
            }
        }
    }
}