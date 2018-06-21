///<reference path="gameobject.ts"/>

class Car extends GameObject {

    constructor(parent: HTMLElement, x: number, y: number, width: number, height: number) {
        super("car", parent, x, y, width, height);
    }
}