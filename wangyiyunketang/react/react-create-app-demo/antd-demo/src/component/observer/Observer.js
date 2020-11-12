import React, { Component } from 'react';

class EventComponent extends Component {
    cb= {}
    on(name,cb){
        this.cb[name] = cb;
    }
    off(name){
        delect this.cb[name];
    }
    trigger(name,arg){
        this.cb[name](arg);
    }
}
 
export default EventComponent;