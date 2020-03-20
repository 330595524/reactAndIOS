
import React, { Component } from 'react'
import Input from '../../input/Input';
export default class UiComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            value:''
        }
        this.value = '123'
    }
    
    // 受控与非受控组件
    render() {
        return (
            <div>
                <Input 
                    size='small'
                    value = {this.state.value}
                    onChange={(e)=>{
                        this.setState({
                            value:e
                        })
                    }}
                /> 
                <Input
                    deaultValue = {this.value} 
                />     
            </div>
        )
    }
}
