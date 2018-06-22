///<reference path="gameobject.ts"/>

class Obstacle extends GameObject implements Observer {

    // Properties
    private static obstacleY: number = 0;
    private speed!: number;

    constructor(parent: HTMLElement) {
        super('obstacle', parent, Utils.Numbers.getRandomInt(1500, 2000), Obstacle.obstacleY, 100, 201);

        this.setObstacle(Utils.Numbers.getRandomInt(-1, 3));
        this.setSpeed(Utils.Numbers.getRandomInt(-4, -10));

        this.draw();

        // Obstacle.obstacleY = Utils.Numbers.getRandomInt(0, 400) + 100;
        Obstacle.obstacleY = Obstacle.obstacleY + 120;
    }

    // Methods
    public setObstacle(num: number): void {
        switch (num) {
            case 0:
                this.div.classList.add('blue-driver');
                break;
            case 1:
                this.div.classList.add('green-driver');
                break;
            case 2:
                this.div.classList.add('yellow-driver');
                break;
            default:
                this.div.classList.add('blue-driver');
                break;
        }
    }

    public move(): void {
        // If Obstacle is moving out of screen. Place it on the right side somewhere between 800,1000, Also give it a random speed. Else just keep driving
        if (this.getX() < -201) {
            this.setX(Utils.Numbers.getRandomInt(1500, 3000));
            this.setSpeed(Utils.Numbers.getRandomInt(-3, -8));
            this.setObstacle(Utils.Numbers.getRandomInt(0, 2));
        } else {
            this._x += this.speed;
            this.draw();
        }

    }

    public notify(): void {
        this.setSpeed(0);
    }

    // Getters & Setters
    public getSpeed(): number {
        return this.speed;
    }

    public setSpeed(s: number): void {
        this.speed = s;
    }
}