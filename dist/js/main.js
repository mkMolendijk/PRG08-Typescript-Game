"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game = (function () {
    function Game() {
        var _this = this;
        this.gameOver = false;
        this.container = document.querySelector("#container");
        this.player = new Player(this.container);
        this.obstacles = new Array();
        this.player.score = 0;
        for (var i = 0; i < 3; i++) {
            var obstacle = new Obstacle(this.container, this.player);
            this.obstacles.push(obstacle);
            this.player.subscribe(obstacle);
        }
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
        this.player.move();
        if (!this.gameOver) {
            for (var _i = 0, _a = this.obstacles; _i < _a.length; _i++) {
                var obstacle = _a[_i];
                if (Utils.Game.checkCollision(this.player, obstacle)) {
                    this.endGame();
                }
                else {
                    obstacle.move();
                    this.player.score = this.player.score + 1;
                    var scoreText = "Score: " + this.player.score;
                    var board = document.getElementsByTagName("score")[0];
                    board.innerHTML = scoreText;
                }
            }
        }
        else {
            var start = document.createElement("start");
            var scoreText = "Final Score: " + this.player.score;
            start.innerText = scoreText;
            document.body.appendChild(start);
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.endGame = function () {
        this.gameOver = true;
    };
    Game.prototype.getGameStatus = function () {
        return this.gameOver;
    };
    return Game;
}());
window.addEventListener("load", function () {
    var startText = "Highway Racer";
    var board = document.getElementsByTagName("score")[0];
    board.innerHTML = startText;
    var start = document.createElement("start");
    start.innerText = "Start Game";
    document.body.appendChild(start);
    start.addEventListener("click", function () {
        start.remove();
        Game.getInstance();
    });
});
var Utils;
(function (Utils) {
    var Game = (function () {
        function Game() {
        }
        Game.checkCollision = function (instance1, instance2) {
            return (instance1.getX() < instance2.getX() + instance2.getWidth() &&
                instance1.getX() + instance1.getWidth() > instance2.getX() &&
                instance1.getY() < instance2.getY() + instance2.getHeight() &&
                instance1.getHeight() + instance1.getY() > instance2.getY());
        };
        Game.removeFromGame = function (go, arr) {
            go.removeDiv();
            var i = arr.indexOf(go);
            if (i != -1) {
                arr.splice(i, 1);
            }
        };
        return Game;
    }());
    Utils.Game = Game;
    var Numbers = (function () {
        function Numbers() {
        }
        Numbers.getRandomInt = function (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        };
        return Numbers;
    }());
    Utils.Numbers = Numbers;
})(Utils || (Utils = {}));
var GameObject = (function () {
    function GameObject(element, parent, x, y, height, width) {
        this.div = document.createElement(element);
        parent.appendChild(this.div);
        this._x = x;
        this._y = y;
        this._height = height;
        this._width = width;
    }
    GameObject.prototype.move = function () {
        this.draw();
    };
    GameObject.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.getX() + "px," + this.getY() + "px)";
    };
    GameObject.prototype.getX = function () {
        return this._x;
    };
    GameObject.prototype.setX = function (xPos) {
        this._x = xPos;
    };
    GameObject.prototype.getY = function () {
        return this._y;
    };
    GameObject.prototype.setY = function (yPos) {
        this._y = yPos;
    };
    GameObject.prototype.getHeight = function () {
        return this._height;
    };
    GameObject.prototype.setHeight = function (height) {
        this._height = height;
    };
    GameObject.prototype.getWidth = function () {
        return this._width;
    };
    GameObject.prototype.setWidth = function (width) {
        this._width = width;
    };
    GameObject.prototype.removeDiv = function () {
        this.div.remove();
    };
    return GameObject;
}());
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(parent) {
        var _this = _super.call(this, "player", parent, 50, 250, 201, 100) || this;
        _this.car = new Car(_this.div, 100, 250, 201, 100);
        _this.setPlayer();
        _this.observers = new Array();
        _this.behavior = new Driving(_this);
        return _this;
    }
    Player.prototype.setPlayer = function () {
        this.div.classList.add("driver");
    };
    Player.prototype.setCrash = function () {
        this.div.classList.remove("driver");
        this.div.classList.add("crashed");
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.notify();
        }
    };
    Player.prototype.move = function () {
        this.behavior.execute();
    };
    Player.prototype.notify = function () {
    };
    Player.prototype.subscribe = function (o) {
        this.observers.push(o);
    };
    Player.prototype.unsubscribe = function (o) {
        var i = this.observers.indexOf(o);
        if (i != -1) {
            this.observers.splice(i, 1);
        }
    };
    return Player;
}(GameObject));
var Obstacle = (function (_super) {
    __extends(Obstacle, _super);
    function Obstacle(parent, p) {
        var _this = _super.call(this, "obstacle", parent, Utils.Numbers.getRandomInt(1000, 1200), Obstacle.obstacleY, 201, 100) || this;
        _this.car = new Car(_this.div, 10, 0, 201, 100);
        _this.setObstacle();
        _this.setSpeed(Utils.Numbers.getRandomInt(-1, -8));
        _this.draw();
        Obstacle.obstacleY = Obstacle.obstacleY + 125;
        return _this;
    }
    Obstacle.prototype.setObstacle = function () {
        this.div.classList.add("blue-driver");
    };
    Obstacle.prototype.move = function () {
        if (this.getX() < -200) {
            this.setX(Utils.Numbers.getRandomInt(800, 1000));
            this.setSpeed(Utils.Numbers.getRandomInt(-1, -6));
        }
        else {
            this._x += this.speed;
            this.draw();
        }
    };
    Obstacle.prototype.notify = function () {
        this.div.classList.remove("toad");
        this.div.classList.add("toad_laugh");
        this.setSpeed(0);
    };
    Obstacle.prototype.getSpeed = function () {
        return this.speed;
    };
    Obstacle.prototype.setSpeed = function (s) {
        this.speed = s;
    };
    Obstacle.obstacleY = 0;
    return Obstacle;
}(GameObject));
var Car = (function (_super) {
    __extends(Car, _super);
    function Car(parent, x, y, width, height) {
        return _super.call(this, "car", parent, x, y, width, height) || this;
    }
    return Car;
}(GameObject));
var Crashed = (function () {
    function Crashed(p) {
        this.player = p;
    }
    Crashed.prototype.execute = function () {
    };
    return Crashed;
}());
var Keys;
(function (Keys) {
    Keys[Keys["ArrowUp"] = 38] = "ArrowUp";
    Keys[Keys["ArrowDown"] = 40] = "ArrowDown";
})(Keys || (Keys = {}));
var Driving = (function () {
    function Driving(p) {
        var _this = this;
        this.moveSpeedY = 0;
        this.player = p;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function () { return _this.onKeyUp(); });
    }
    Driving.prototype.execute = function () {
        var position;
        position = this.player.getY() + this.getMoveSpeedY();
        if (position == 0 || position == 500) {
        }
        else {
            this.player.setY(position);
        }
        var g = Game.getInstance();
        if (!g.getGameStatus()) {
            this.player.draw();
        }
        else {
            this.crashed();
        }
    };
    Driving.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case Keys.ArrowUp:
                this.setMoveSpeedY(-5);
                break;
            case Keys.ArrowDown:
                this.setMoveSpeedY(5);
                break;
            default:
                break;
        }
    };
    Driving.prototype.onKeyUp = function () {
        this.setMoveSpeedY(0);
    };
    Driving.prototype.crashed = function () {
        var _this = this;
        window.removeEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.removeEventListener("keyup", function () { return _this.onKeyUp(); });
        this.player.behavior = new Crashed(this.player);
    };
    Driving.prototype.getMoveSpeedY = function () {
        return this.moveSpeedY;
    };
    Driving.prototype.setMoveSpeedY = function (s) {
        this.moveSpeedY = s;
    };
    return Driving;
}());
//# sourceMappingURL=main.js.map