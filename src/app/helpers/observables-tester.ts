import { Observable, range, map, filter } from "rxjs";

const source$: Observable<number> = range(0, 10);

source$.pipe(
    map(x => x * 3),
    filter(x => x % 2 === 0)
).subscribe(x => console.log(x));

