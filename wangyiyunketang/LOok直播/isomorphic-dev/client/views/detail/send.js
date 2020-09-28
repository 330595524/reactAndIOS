import React, { useState, useCallback } from 'react';
import { useEventCallback } from 'rxjs-hooks';
import { throttleTime, withLatestFrom, map } from 'rxjs/operators';
import sub$$, { getMessage } from './socket';

const Send = () => {
    const [value, setValue] = useState('');
    const changeValue = useCallback((e) => {
        setValue(e.target.value);
    }, []);
    const [sendCallback] = useEventCallback(
        (event$, state$, inputs$) =>
            event$.pipe(
                throttleTime(200),
                withLatestFrom(inputs$),
                map((eventAndInput) => {
                    const [s, [val]] = eventAndInput;
                    if (val !== '') {
                        sub$$.next(getMessage({
                            type: 2,
                            content: val
                        }));
                        setValue('');
                    }
                })
            ),
        '',
        [value]
    );

    return (
        <div className="m-detail_sd">
            <input value={value} onChange={changeValue} />
            <button onClick={sendCallback}>发送</button>
        </div>
    );
};
export default Send;