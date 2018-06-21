///<reference path="gameobject.ts"/>
///<reference path="../observers/observable.ts"/>

class Player extends GameObject implements Observable {
    private car: Car;

    // Properties
    public score!: number;
    public observers!: Array<Obstacle>;
    public behavior!: Behavior;

    constructor(parent: HTMLElement) {
        super("player", parent, 50, 250, 201, 100);
        this.car = new Car(this.div, 100, 250, 201, 100);

        this.setPlayer();

        // Initialize Array
        this.observers = new Array();

        // Set default behavior Driving
        this.behavior = new Driving(this);
    }

    // Methods
    private setPlayer(): void {
        // Set sprite
        this.div.classList.add("driver");
    }

    public setCrash(): void {
        // Remove and set new sprite
        this.div.classList.remove("driver");
        this.div.classList.add("crashed");

        // Foreach observer. Set speed to 0.
        for (let observer of this.observers) {
            observer.notify();
        }
    }

    public move(): void {
        this.behavior.execute();
    }

    // Observable methods
    public notify(){

    }

    public subscribe(o: any): void {
        this.observers.push(o);
    }

    public unsubscribe(o: any): void {
        let i: number = this.observers.indexOf(o);
        if (i != -1) {
            this.observers.splice(i, 1);
        }
    }

}