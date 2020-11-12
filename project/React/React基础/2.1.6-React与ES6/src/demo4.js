import React from 'react';
import ReactDOM from 'react-dom'

let loading = (Com) => {
	class LoadingComponent extends Com {
		constructor(props) {
			super(props);
			this.state = {
				loading: false
			}
		}

		render() {
			const {
				loading
			} = this.state
			return (
				<div>
					{super.render()}
					{loading ? 'loading....' : ''}
				</div>
			);
		}
		showLoading() {
			this.setState({
				loading: true
			})
		}
		hideLoading(){
			this.setState({
				loading: false
			})
		}
	}

	return LoadingComponent
}


@loading
class App extends React.Component{
	render() {
		return (
			<div>
				app
			</div>
		);
	}

	componentDidMount() {
		this.showLoading()
	}

}

export default App;
