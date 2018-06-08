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
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    GameObject.prototype.move = function () {
        this.draw();
    };
    GameObject.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.getX() + "px," + this.getY() + "px)";
    };
    Object.defineProperty(GameObject.prototype, "x", {
        get: function () {
            return this.x;
        },
        set: function (xPos) {
            this._x = xPos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (yPos) {
            this._y = yPos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (height) {
            this._height = height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (width) {
            this._width = width;
        },
        enumerable: true,
        configurable: true
    });
    GameObject.prototype.removeDiv = function () {
        this.div.remove();
    };
    return GameObject;
}());
//# sourceMappingURL=main.js.map