///<reference path="gameobject.ts"/>

class Obstacle extends GameObject implements Observer {
    private car: Car;

    // Properties
    private static obstacleY: number = 0;
    private speed!: number;

    constructor(parent: HTMLElement, p: Player) {
        super("obstacle", parent, Utils.Numbers.getRandomInt(1000, 1200), Obstacle.obstacleY, 201, 100);
        this.car = new Car(this.div, 10, 0, 201, 100);

        this.setObstacle();
        this.setSpeed(Utils.Numbers.getRandomInt(-1, -8));

        this.draw();

        // After constructing one obstacle, add the Y position with 125px so obstacles have other heights
        Obstacle.obstacleY = Obstacle.obstacleY + 125;
    }

    // Methods
    public setObstacle(): void {
        this.div.classList.add("blue-driver");
    }

    public move(): void {
        // If Obstacle is moving out of screen. Place it on the right side somewhere between 800,1000, Also give it a random speed. Else just keep driving
        if (this.getX() < -200) {
            this.setX(Utils.Numbers.getRandomInt(800, 1000));
            this.setSpeed(Utils.Numbers.getRandomInt(-1, -6));
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