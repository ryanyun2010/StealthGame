class Wall extends Enemy {
    constructor(n) {
        super(0, 0, 0, n);
        this.state = "active";
        this.playerCanPass = false;
    }
    draw() {
        fill("white");
        stroke("white");
        strokeWeight(10);
        if (this.state == "active") {
            for (var i = 0; i < this.nodes.length - 1; i++) {
                line(this.nodes[i].x, this.nodes[i].y, this.nodes[i + 1].x, this.nodes[i + 1].y);
            }
        }
    }
    states() {}
    transitions() {}

}