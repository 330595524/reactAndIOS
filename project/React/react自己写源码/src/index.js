import React from './lib/react'
import ReactDOM from './lib/react-dom'

class  App extends React.Component{
	constructor(props) {
		super(props);
    this.state = {
      num: 1,
    }
	}

	add(){
		this.setState({num:3})

		this.setState(function (preState) {
			console.log(preState.num)
			return {
				num : preState.num *2
			}
		})
		this.setState(function (preState) {
			console.log(preState.num)
			return {
				num : preState.num *2
			}
		})
	}
	render() {
		console.log("hello")
		return (
			<div>
        hello world {this.state.num} <button onClick={e => {
        	this.add()
			}}>add</button>
			</div>
		);
	}



}

ReactDOM.render(<App/>,document.getElementById('root'))
