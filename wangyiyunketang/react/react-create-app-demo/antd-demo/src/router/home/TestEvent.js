import React, { Component } from 'react';

import { listen,trigger,remove } from "../../provide/Event";

class TestEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
       
    }
    componentDidMount(){
        let fn1,fn2;
        console.log(Event);
         listen('small',fn1 = function(){
            console.log('A要买个大房子')
        })
         listen('small',fn2 = function(){
            console.log('B要买个xiao房子')
        })
        remove('small')
         trigger('big');
         trigger('small');
        
    }

    render() { 
        return ( <div>
            TestEvent111111
        </div> );
    }
}
 
export default TestEvent;