import React, { Component } from 'react'
import PropTypes from 'prop-types'

// {title:{},content}
 class Provider extends React.Component{
	static propTypes = {
		store: PropTypes.object,
		children: PropTypes.any
	}
	static childContextTypes = {
		store: PropTypes.object
	}
	getChildContext () {
		return {
			store: this.props.store
		}
	}
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}
export default Provider
