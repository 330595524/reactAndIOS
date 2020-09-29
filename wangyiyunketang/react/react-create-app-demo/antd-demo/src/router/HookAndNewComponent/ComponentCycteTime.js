/*
 * @Author: xulimin
 * @Date: 2020-06-02
 * @Last Modified by: xulimin
 * @Last Modified time: 2020-06-02
 */
import React, {Component} from 'react';

class ComponentCycteTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1
        }
    }

    // 在getDerivedStateFromProps中进行state的改变
    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('getDerivedStateFromProps', nextProps, prevState);
        if (nextProps.type !== prevState.type) {
            return {
                type: nextProps.type,
            };
        }
        return null;
    }

    componentDidUpdate() {
        console.log('componentDidUpdate')
    }


    shouldComponentUpdate(a, b, c) {
        console.log('shouldComponentUpdata', a, b, c)
        return true
    }

    getSnapshotBeforeUpdate() {
        console.log('getSnapshotBeforeUpdate')
        return 'getSnapshotBeforeUpdate'
    }

    changeCurrent = () => {
        this.setState({current: this.state.current + 1})
    }


    render() {
        return <div>
            值：{this.state.current}
            <div onClick={this.changeCurrent}>点击增加</div>
        </div>;
    }
}

export default ComponentCycteTime;
