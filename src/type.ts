import './styles/style.scss';


// Challenge: Create Observable
    // 1. Create an observable class that takes a producer function
        // A - Produces Value
        // B - Produces error if any
        // C - Completes.

    // 2. Exposes a subscribe function
        // Executes the passed observer function when user subscribes.

interface MyObserver<T> {
    next: (v: T) => void;
    error: (err: any) => void;
    complete: () => void;
}

class MyObservable<T> {
    constructor(private producer: (observer: MyObserver<T>) => void) {}

    subscribe(observer: MyObserver<T>) {
        this.producer(observer);
    }
}

let obs$ = new MyObservable((observer: MyObserver<number>) => {
    setTimeout(() => observer.next(1), 200);
    setTimeout(() => observer.error('error'), 400);
    setTimeout(() => observer.complete(), 600);
})

obs$.subscribe({
    next: (n: number) => console.log(n),
    error: (err: any) => console.log(err),
    complete: () => console.log('completed')
})


