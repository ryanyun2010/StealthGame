    if (starting) {
        image(startscreenimg, 0, 0, 500, 400);
        return;
    } else if (inhowtoplay) {
        image(howtoplayscreenimg, -100, 0, 650, 400);
        return;
    } else if (unlockingpowerup) {
        if (unlocking == "smoke") {
            background(0, 0, 0);
            image(smokeunlockimg, 0, 100, 500, 300);
            timetilunlockgone--;
            if (timetilunlockgone == 0) {
                unlockingpowerup = false;
                winning = false;
                playing = true;
                setup();
            }
            return;
        }
    } else if (winning) {
        background(0, 0, 0);
        image(successimg, 0, 100, 500, 300);
        playing = false;
        timetilnextlevel--;
        if (timetilnextlevel == 0) {
            winning = false;
            playing = true;
            setup();
        }
    } else {
        background(0, 0, 0)
        image(failureimg, 0, 100, 500, 300);
        timetilrestart--;
        if (timetilrestart == 0) {
            playing = true;
            timetilrestart = 30;
            setup();
        }
    }