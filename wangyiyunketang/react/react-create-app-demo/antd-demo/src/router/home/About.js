import React, { Component } from 'react';
import TestEvent from "./TestEvent";
//测试生命周期
class TestTimeout extends Component{
    state = {
        num: 1
    }
    render() {
        return (
            <div>
                sss
            </div>
        );
    }
    componentDidUpdate(prevProps, prevState) {
        console.log(this.state.num) //4
    }
    componentDidMount() {
        setTimeout(() => {
            console.log('timeout') //7
        })
        new Promise((resovle) => {
            console.log('before'); // 1
            resovle('then')
            console.log('after') // 2
        }).then(res => {
            console.log(res) // 6
        })
        let {num} = this.state
        this.setState({
            num: ++num
        }, () => {
            console.log('after setState') //5
        })
        console.log('---') // 3
    }
}

class UpdataNum extends Component{
    state = {
        num: 1
    }
    render() {
        return (
            <div>
                sss
            </div>
        );
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
}

class Child extends Component{
    render() {
        return (
            <div>
                {this.props.name}
                {/* <UpdataNum />  */}
                <TestTimeout/>
            </div>
        );
    }
    componentDidMount() {
        console.log('componentDidMount',this.props.name)
    }
    componentDidUpdate() {
        console.log('componentDidUpdate',this.props.name)
    }
    componentWillUnmount() {
        console.log('componentWillUnmount',this.props.name)
    }
 
}
class About extends Component{
    state = {
        list: ['a','b','c']
    }

    render() {
        return (
            <div>
                {this.state.list.map(item => <Child key={item}  name={item}/>)}
                <button onClick={e => {
                    this.setState({
                        list: ['b','c','d']
                    })
                }}>set</button>
                <TestEvent></TestEvent>   
            </div>
        );
    }
}
 
export default About;