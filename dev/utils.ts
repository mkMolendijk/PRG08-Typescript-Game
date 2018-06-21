namespace Utils {

    export class Game {
        public static checkCollision(instance1: GameObject, instance2: GameObject): boolean {
            return (instance1.getX() < instance2.getX() + instance2.getWidth() &&
                instance1.getX() + instance1.getWidth() > instance2.getX() &&
                instance1.getY() < instance2.getY() + instance2.getHeight() &&
                instance1.getHeight() + instance1.getY() > instance2.getY())
        }

        public static removeFromGame(go: GameObject, arr: Array<any>) {
            go.removeDiv();
            let i: number = arr.indexOf(go);
            if (i != -1) {
                arr.splice(i, 1);
            }
        }
    }

    export class Numbers {
        public static getRandomInt(min: number, max: number) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
    }


}