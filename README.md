# PRG08-Typescript-Game

## Class diagram

## Pull requests
Week 4:

Week 6: 
## Singleton
The Singleton pattern is applied at the game instance:

```
public static getInstance() {
    if (!Game.gameInstance) {
        Game.gameInstance = new Game();
    }
    return Game.gameInstance;
}
```
It is called by the following code:
```
window.addEventListener("load", function () {
    let game = Game.getInstance();
});
```
## Polymorphism

## Strategy pattern

## Observers
