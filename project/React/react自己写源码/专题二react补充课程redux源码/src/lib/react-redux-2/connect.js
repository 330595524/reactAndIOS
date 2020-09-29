import React, { Component } from 'react'
import PropTypes from 'prop-types'

const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
	// this.context.store -> 获取在Provider里的store
	class Connect extends Component{
		static contextTypes = {
			store: PropTypes.object
		}

		constructor(props) {
			super(props);
			this.state = {
				allProps: {}
			}
		}

		//	store.subscribe(() => renderApp(store.getState()))
		componentWillMount(){
			const { store } = this.context
			this.renderApp()
			store.subscribe(() => this.renderApp())
		}
		// 把store数据获取到，存到 allProps这个state里面
		renderApp(){
			const { store } = this.context
			let stateProps = mapStateToProps ? mapStateToProps(store.getState(), this.props) : {}
			let dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch, this.props) : {}
			this.setState({
				allProps: {
					...stateProps,
					...this.props,
				}
			})
		}

		render() {
			return (
				<div>
					<WrappedComponent {...this.state.allProps}/>
				</div>
			);
		}
	}

	return Connect
}
export default connect
