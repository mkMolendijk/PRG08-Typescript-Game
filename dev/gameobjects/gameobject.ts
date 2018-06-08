abstract class GameObject {

    // Props
    protected div: HTMLElement;
    protected _x!: number;
    protected _y!: number;
    protected _width!: number;
    protected _height!: number;

    constructor(element: string, parent: HTMLElement, x: number, y: number, height: number, width: number) {

        // Create element and append it to parent
        this.div = document.createElement(element);
        parent.appendChild(this.div);

        // Set position
        this.x = x;
        this.y = y;

        // Set sizes
        this.width = width;
        this.height = height;
    }

    public move(): void {
        this.draw();
    }

    // Draw
    public draw(): void {
        this.div.style.transform = "translate(" + this.getX() + "px," + this.getY() + "px)";
    }

    // Getters and setters
    get x(): number {
        return this.x;
    }

    set x(xPos: number) {
        this._x = xPos;
    }

    get y(): number {
        return this._y;
    }

    set y(yPos: number) {
        this._y = yPos;
    }

    get height(): number {
        return this._height;
    }

    set height(height: number) {
        this._height = height;
    }

    get width(): number {
        return this._width;
    }

    set width(width: number) {
        this._width = width;
    }

    // Remove object div
    public removeDiv(): void {
        this.div.remove();
    }

}