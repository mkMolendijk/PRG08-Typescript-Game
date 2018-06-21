interface Observable {
    observers: Array<Observer>;

    notify(): void;
    subscribe(o: Observer): void;
    unsubscribe(o: Observer): void;
}