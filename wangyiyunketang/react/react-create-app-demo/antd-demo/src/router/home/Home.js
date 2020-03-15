import React ,{Component}from 'react';
import PropTypes from 'prop-types';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:0
        }
    }

    getChildContext(){
        return {
            color:'#fff',
            name:this.state.name
        }
    }

    componentDidMount() {
        console.log('Home mounet')
    }
    componentWillUpdate(){
        console.log('Home Will')
    }
    componentDidUpdate(){
        console.log('Home Did')
    }


    setValue = (value)=>{
        this.setState({name:value})
    }
    render(){
        console.log('Home render')
        const { name} = this.state
        return(
            <div>....1111....
                 <button onClick={()=>this.setValue(name+1)}>add</button>
                 <Child1/>
            </div>
        )
    }
}

Home.childContextTypes = {//检测的数据类型，传递给下一级
    color:PropTypes.string,
    name:PropTypes.number,
}  


// const Home = (props,context)=>{
//      const [value, setValue] = useState(0);

//      getChildContext =()=>{
//          return {
//              color: '#fff'
//          }
//      }

//     return (
//         <div>
//         1111222
//         <button onClick={()=>setValue(value+1)}>add</button>
//         <br/>
//         {value}
//         -----------
//         <Child1/>
//      </div> 
//     )
// }


class Child1 extends Component {
    componentDidMount() {
        console.log('Child1 mounet')
    }
    componentWillUpdate(){
        console.log('Child1 Will')
    }
    componentDidUpdate(){
        console.log('Child1 Did')
    }
    render(){
        console.log('Child1 render')
        return(
            <div>
                 <Child2/>
            </div>
        )
    }
}


class Child2 extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        console.log('Child2 mounet')
    }
    componentWillUpdate(){
        console.log('Child2 Will')
    }
    componentDidUpdate(){
        console.log('Child2 Did')
    }
    render(){
        console.log('Child2 render')
        return(
            <div>
                {this.context.name}
            </div>
        )
    }
}

Child2.contextTypes = {
    color:PropTypes.string,
    name:PropTypes.number,

}  












export default Home;