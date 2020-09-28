import React, { useEffect, useRef, useState, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';

const Number = (props) => {
    const { number } = props;
    const numbers = String(number).split();
    const key = `number_${number}`;
    const numNodes = numbers.map((n, i) => {
        const nkey = `num_${i}`;
        return (<span key={nkey} className="m-detail_numsg">{n}</span>);
    });
    return (
        <div key={key} className="m-detail_num">
            <div className="m-detail_scale">
                <span>x</span>
                {numNodes}
            </div>
        </div>
    );
};

const Card = (props) => {
    const { info, onExit } = props;
    const { name, giftName } = info;
    const exitout = useRef(null);
    useEffect(() => {
        if (exitout.current) {
            window.clearTimeout(exitout.current);
        }
        exitout.current = window.setTimeout(() => {
            if (onExit) {
                onExit(info);
            }
        }, 1500);
        return () => {
            window.clearTimeout(exitout.current);
            exitout.current = null;
        };
    }, [info.accNumber]);
    return (
        <div className="m-detail_card">
            <div className="m-detail_avatar" />
            <div className="m-detail_cdf">
                <p className="m-detail_cdnm">{name}</p>
                <p>{`送了${giftName}`}</p>
            </div>
            <div className="m-detail_ng"></div>
        </div>
    );
};

const Slot = (props) => {
    const { info, className, onHide } = props;
    const [show, setShow] = useState();
    useEffect(() => {
        if (info) {
            setShow(true);
        }
    }, [info]);
    const onExit = useCallback(() => {
        setShow(false);
    });
    const onExited = useCallback(() => {
        setShow();
        onHide(info);
    }, [info]);
    const cls = `m-detail_slot ${className || ''}`;
    const inshow = typeof show === 'undefined' ? !!info : show;
    return (
        <div className={cls}>
            <CSSTransition
                in={inshow}
                classNames="trans"
                timeout={300}
                onExited={onExited}
                appear
                enter>
                {state => (
                    <div>
                        {info
                            ? <Card
                                onExit={onExit}
                                key={info.unique}
                                info={info} />
                            : null}
                        {state === 'entered' && info ? <Number number={info.accNumber} /> : null}
                    </div>
                )}
            </CSSTransition>
        </div>
    );
};
export default Slot;