import { fromString } from 'uuidv4';
import { Subject, Observable } from 'rxjs';
import {
    filter,
    map,
    groupBy,
    mergeMap,
    debounceTime,
    scan,
    window as rxWindow
} from 'rxjs/operators';

let curid = 0;
export const getMessage = (option) => {
    const { type, content, ...other } = option || {};
    curid += 1;
    return {
        id: fromString(String(curid)),
        type: type || 1,
        content: content || 'xxx进入直播间',
        timestamp: Date.now(),
        ...other
    };
};
const sub$$ = new Subject();
const socket$ = new Observable((observer) => {
    const tvl = setInterval(() => {
        observer.next(getMessage());
    }, 1000);
    return () => {
        observer.complete();
        clearInterval(tvl);
    };
});
socket$.pipe(filter(v => v.type !== 1)).subscribe(sub$$);

// 礼物
const TIME = 30 * 1000;
export const gift$ = sub$$.pipe(
    filter(v => v.type === 3),
    map(v => ({ ...v, ...v.content })),
    map(v => ({ ...v, unique: `${v.giftId}_${v.userId}` })),
    groupBy(v => v.unique),
    mergeMap((group$) => {
        const break$ = group$.pipe(debounceTime(TIME));
        return group$.pipe(
            rxWindow(break$),
            mergeMap($window => $window.pipe(scan((acc, cur) => ({
                ...cur,
                accNumber: cur.number + (acc.accNumber || 0)
            }), {})))
        );
    })
);
export default sub$$;