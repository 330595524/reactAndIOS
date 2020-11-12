import React, { useState, useEffect, useRef, useCallback } from 'react';
import useConstant from 'use-constant';
import { gift$ } from './socket';
import Slot from './slot';

const MAX_GIFTS = 2;
const completeSlots = (slots, queue) => {
    const realSlots = slots.filter(item => !!item);
    const wait = queue.splice(0, MAX_GIFTS - realSlots.length);
    const newSlots = slots.map(item => (item || wait.splice(0, 1)[0]));
    return newSlots;
};

class GiftQueue {
    constructor(option = {}) {
        this.cb = option.cb;
        this.StaticQueue = [];
        this.slots = new Array(MAX_GIFTS).fill(null);
        this.init();
    }

    init() {
        this.subscription = gift$.subscribe((v) => {
            const hasV = item => (item ? item.unique === v.unique : false);
            const idx = this.StaticQueue.findIndex(hasV);
            const sidx = this.slots.findIndex(hasV);
            if (idx === -1 && sidx === -1) {
                this.StaticQueue.push(v);
            }
            if (sidx > -1) {
                this.slots[sidx] = v;
            }
            this.slots = completeSlots(this.slots, this.StaticQueue);
            if (this.cb) {
                this.cb(this.slots);
            }
        });
    }

    remove(slot) {
        const idx = this.slots.findIndex(item => (item ? item.unique === slot.unique : false));
        if (idx > -1) {
            const first = this.StaticQueue.splice(0, 1);
            this.slots[idx] = first.length > 0 ? first[0] : null;
        }
        this.slots = this.slots.concat();
        if (this.cb) {
            this.cb(this.slots);
        }
        return this.slots;
    }

    getSlots() {
        return this.slots;
    }

    destroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

const StaticGift = () => {
    const [slots, setSlots] = useState([]);
    const Queue = useRef(null);
    const subcb = useCallback((st) => {
        setSlots(st);
    });
    useEffect(() => {
        if (Queue.current === null) {
            Queue.current = new GiftQueue({
                cb: subcb
            });
        }
        return () => Queue.current.destroy();
    }, []);

    const hideSlot = useCallback((slot) => {
        Queue.current.remove(slot);
    });

    console.log('=slots=', slots);
    return (
        <div className="m-detail_stgift">
            <Slot onHide={hideSlot} info={slots[1]} />
            <Slot onHide={hideSlot} className="last" info={slots[0]} />
        </div>
    );
};
export default StaticGift;