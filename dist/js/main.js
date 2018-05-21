"use strict";
var Game = (function () {
    function Game() {
        var _this = this;
        var container = document.getElementById("container");
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.getInstance = function () {
        if (!Game.gameInstance) {
            Game.gameInstance = new Game();
        }
        return Game.gameInstance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () {
    var game = Game.getInstance();
});
var GameObject = (function () {
    function GameObject(element, parent, x, y, height, width) {
        this.div = document.createElement(element);
        parent.appendChild(this.div);
        this.setX(x);
        this.setY(y);
        this.setWidth(width);
        this.setHeight(height);
    }
    GameObject.prototype.move = function () {
        this.draw();
    };
    GameObject.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.getX() + "px," + this.getY() + "px)";
    };
    GameObject.prototype.getX = function () {
        return this.x;
    };
    GameObject.prototype.setX = function (xPos) {
        this.x = xPos;
    };
    GameObject.prototype.getY = function () {
        return this.y;
    };
    GameObject.prototype.setY = function (yPos) {
        this.y = yPos;
    };
    GameObject.prototype.getHeight = function () {
        return this.height;
    };
    GameObject.prototype.setHeight = function (height) {
        this.height = height;
    };
    GameObject.prototype.getWidth = function () {
        return this.width;
    };
    GameObject.prototype.setWidth = function (width) {
        this.width = width;
    };
    GameObject.prototype.removeDiv = function () {
        this.div.remove();
    };
    return GameObject;
}());
//# sourceMappingURL=main.js.map