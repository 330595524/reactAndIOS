import React, { Component } from 'react';

class Child extends Component{
    render() {
        console.log('child render')
        return (
            <div>
                {this.props.name}
            </div>
        );
    }
 
    componentDidUpdate(prevProps, prevState) {
        console.log('child update')
    }
 
}
 
class Parent extends Component{
    state = {
        name: 'aaa'
    }
    render() {
        console.log('parent render')
        return (
            <div>
                <Child name={this.state.name}/>
                <button onClick={e => {
 
                    this.setState({name:'bbb'})
                }}>change</button>
            </div>
        );
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('parent update')
    }
}

class Child2 extends Component{
    render() {
        return (
            <div>
                {this.props.name}
            </div>
        );
    }
    componentDidMount() {
        console.log('mount',this.props.name)
    }
    componentDidUpdate() {
        console.log('update',this.props.name)
    }
    componentWillUnmount() {
        console.log('unmount',this.props.name)
    }
 
}
class App2 extends Component{
    state = {
        list: ['a','b','c']
    }
    render() {
        return (
            <div>
                {this.state.list.map(item => <Child2  key={item}  name={item}/>)}
                <button onClick={e => {
                    this.setState({
                        list: ['b','c','d']
                    })
                }}>set</button>
            </div>
        );
    }
}


class Confirm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            num: 1
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.state.num)
    }
    componentDidMount() {
        let { num } = this.state
        this.setState({
            num: ++num
        })
        this.setState({
            num: ++num
        })
    }

    
    render() { 
        return (  <div>
            <App2/>
        </div>);
    }
}
 
export default Confirm;