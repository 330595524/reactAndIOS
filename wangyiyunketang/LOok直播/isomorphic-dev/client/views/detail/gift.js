import React, { useCallback } from 'react';
import sub$$, { getMessage } from './socket';

const send = (giftId, giftName) => {
    sub$$.next(getMessage({
        type: 3,
        content: {
            giftId,
            giftName,
            userId: 4234234,
            name: '电视发射塔',
            number: 1
        }
    }));
};
const GIFTS = [{
    id: 3212,
    name: '礼物1'
}, {
    id: 3213,
    name: '礼物2'
}, {
    id: 3214,
    name: '礼物3'
}];
const GiftItem = (props) => {
    const { onClick, name, id } = props;
    const clk = useCallback(() => {
        onClick(id, name);
    });
    return (
        <span className="m-detail_gf" onClick={clk}>{name}</span>
    );
};
const Gift = () => {
    const giftNodes = GIFTS.map((item) => {
        const key = `gift_${item.id}`;
        return (<GiftItem key={key} { ...item } onClick={send} />);
    });
    return (
        <div className="m-detail_gfs">
            {giftNodes}
        </div>
    );
};
export default Gift;