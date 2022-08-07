function simplifyAngle(angle) {
    let reduce = angle % (PI * 2);
    if (reduce < 0) {
        return (PI * 2) - abs(reduce);
    } else {
        return reduce;
    }

}

function canSee(looker, target) {
    if (dist(looker.x, looker.y, target.x, target.y) < looker.dof + target.size / 2) {
        let dx = target.x - looker.x;
        let dy = target.y - looker.y;
        let theta = simplifyAngle(atan2(dy, dx));
        let left = simplifyAngle(looker.focus - looker.fov / 2);
        let right = simplifyAngle(looker.focus + looker.fov / 2);
        if (left < theta && theta < right) {
            return true;
        } else if (left > right && (theta > left || theta < right)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function circleLineOverlap(n1, n2, c) {
    let r = c.size / 2;
    let deltaX = n2.x - n1.x;
    let deltaY = n2.y - n1.y;
    let u = ((c.x - n1.x) * deltaX + (c.y - n1.y) * deltaY) / (deltaX * deltaX + deltaY * deltaY);
    if (u < 0 || u > 1) { return false; } else {
        let i = {};
        i.x = n1.x + u * deltaX;
        i.y = n1.y + u * deltaY;
        if (dist(c.x, c.y, i.x, i.y) < r) { return true; } else { return false; }
    }
}