abstract class GameObject {

    // Props
    protected div!: HTMLElement;
    protected _x!: number;
    protected _y!: number;
    protected _width!: number;
    protected _height!: number;

    protected constructor(element: string, parent: HTMLElement, x: number, y: number, height: number, width: number) {

        // Create element and append it to parent
        this.div = document.createElement(element);
        parent.appendChild(this.div);

        // Set position
        this._x = x;
        this._y = y;

        // Set sizes
        this._height = height;
        this._width = width;
    }

    public move(): void {
        this.draw();
    }

    // Draw
    public draw(): void {
        this.div.style.transform = "translate(" + this.getX() + "px," + this.getY() + "px)";
    }

    // Getters and setters
    public getX(): number {
        return this._x;
    }

    public setX(xPos: number) {
        this._x = xPos;
    }

    public getY(): number {
        return this._y;
    }

    public setY(yPos: number) {
        this._y = yPos;
    }

    public getHeight(): number {
        return this._height;
    }

    public setHeight(height: number) {
        this._height = height;
    }

    public getWidth(): number {
        return this._width;
    }

    public setWidth(width: number) {
        this._width = width;
    }

    // Remove object div
    public removeDiv(): void {
        this.div.remove();
    }
}