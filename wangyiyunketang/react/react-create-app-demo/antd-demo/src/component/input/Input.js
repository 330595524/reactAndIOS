import React, { Component } from 'react'
import PropTypes from 'prop-types';
// 受控组件必须setState才能实现数据更新， 非搜控组件，不用，是其在内部实现了setState
// 外部通过defaultValue传递参数可通过一个变量实现
export default class Input extends Component {
    constructor(props){
        super(props);
        this.state={
            inneValue:''
        }
    }
    componentDidMount(){
        this.setState({
            inneValue: this.props.defaultValue
        })
    }
    static propTypes={
        value: PropTypes.string,
        size: PropTypes.string,
        onChange: PropTypes.func,
    }
    static defaultProps = {
        size:'middle',
        onChange: ()=>{}
    }

    get isControl(){
        return 'value' in this.props;
    }

    get value(){
        
        console.log(this.isControl)
        if(this.isControl){
            return this.props.value
        }else{
            return this.state.inneValue
        }
    }

    render() {
        const {inneValue} = this.state; 
        const {value,onChange} = this.props; 
        return (
            <div>
                <input 
                value = {this.value}
                onChange={(e)=>{
                    if(!this.isControl){
                        this.setState(
                            {
                                inneValue: e.target.value
                            }
                        )
                    }
                    onChange(e.target.value)
                }}
                
                >
                </input>   
            </div>
        )
    }
}
