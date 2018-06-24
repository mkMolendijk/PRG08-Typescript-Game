class Game {
    private static gameInstance: Game;

    private container: any;
    private player: Player;
    private obstacles: Array<Obstacle>;

    // Properties
    private gameOver: boolean = false;

    public static getInstance() {
        if (!Game.gameInstance) {
            Game.gameInstance = new Game();
        }
        return Game.gameInstance;
    }

    // Game instance
    private constructor() {
        this.container = document.querySelector('#container');

        this.player = new Player(this.container);
        this.obstacles = Array();

        this.player.score = 0;

        // Create obstacles array.
        for (let i = 0; i < 5; i++) {
            // Create Obstacle and push it to the array
            let obstacle = new Obstacle(this.container);
            this.obstacles.push(obstacle);

            // Subscribe to player
            this.player.subscribe(obstacle);
        }

        // Loop gameLoop function
        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop(): void {
        this.player.move();

        // Check if game is over.
        if (!this.gameOver) {
            // For every obstacle. Check the collision
            for (let obstacle of this.obstacles) {
                if (Utils.Game.checkCollision(obstacle, this.player)) {
                    this.endGame();
                } else {
                    // If there is no collision move all obstacles and add score to player
                    obstacle.move();
                    this.player.score = this.player.score + 1;

                    // Display Score
                    let scoreText: string = 'Score: ' + this.player.score;
                    let scoreBoard = document.getElementsByTagName('score')[0];
                    scoreBoard.innerHTML = scoreText;
                }
            }
        }
        requestAnimationFrame(() => this.gameLoop());
    }

    private endGame(): void {
        this.gameOver = true;

        let container = document.querySelector('#container');
        let start = document.createElement('start');
        let scoreText: string = 'Final Score: ' + this.player.score;
        start.innerText = scoreText;
        document.body.appendChild(start);

        let restart = document.createElement('restart');
        restart.innerText = 'Restart';
        document.body.appendChild(restart);

        restart.addEventListener('click', function () {
            restart.remove();
            start.remove();
            Game.getInstance().restartGame();
        });

        setTimeout(function () {
            container!.remove();
        }, 1500);
    }

    private restartGame(): void {
        this.setGameStatus(false);
        window.location.reload();
    }

    public setGameStatus(s: boolean) {
        this.gameOver = s;
    }

    public getGameStatus(): boolean {
        return this.gameOver;
    }
}

window.addEventListener('load', function () {
    let startText: string = 'Highway Racer';
    let scoreBoard = document.getElementsByTagName('score')[0];
    scoreBoard.innerHTML = startText;

    let start = document.createElement('start');
    start.innerText = 'Start Game';
    document.body.appendChild(start);

    start.addEventListener('click', function () {
        start.remove();
        Game.getInstance();
    });
});