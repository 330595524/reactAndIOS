import React, { useState, useEffect } from 'react';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { useObservable } from 'rxjs-hooks';
import sub$$ from './socket';

const MAX = 100;
const Notice = (props) => {
    const list = useObservable(state$ => sub$$.pipe(
        filter(v => v.type === 2),
        withLatestFrom(state$),
        map(([v, state]) => {
            state.push(v);
            const len = state.length;
            if (len > MAX) {
                state.splice(0, len - MAX);
            }
            return state.concat();
        })
    ), []);
    let listnode;
    if (list.length) {
        listnode = list.map((item, n) => {
            const key = `message_${item.id}`;
            return (
                <div key={key}>
                    {item.content}
                </div>
            );
        });
    }
    return (
        <div className="m-detail_ms">
            {listnode}
        </div>
    );
};
export default Notice;