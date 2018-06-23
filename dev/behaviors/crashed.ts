///<reference path="behavior.ts"/>

class Crashed implements Behavior {
    public player: Player;

    constructor(p: Player) {
        this.player = p;

        this.player.setCrash();
    }

    public execute() {

    }
}