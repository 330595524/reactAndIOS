import React, { Component } from 'react';
import ReactDOM from 'react-dom';
class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  <div>loading</div>);
    }
    
}
let node = null;
const load ={
    show(){
        node  = document.createElement('div');
        document.body.appendChild(node);
        ReactDOM.render(<Loading/>, node);
    },
    hide(){
        if(node){
            ReactDOM.unmountComponentAtNode(node);
            document.body.removeChild(node);
        }
    }
}

class FormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount() {
        load.show();
        setTimeout(() => {
            load.hide();
        }, 200);
    }
    render() { 
        return ( <div>
            <Loading/> 
        </div> );
    }
}
 
export default FormComponent;