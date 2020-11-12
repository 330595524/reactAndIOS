import React from 'react';
import logo from './logo.svg';
import './App.css';
import connect from './lib/react-redux-2/connect'



class App extends React.Component {
  render() {
    return (
      <div className="App">
        app {this.props.themeColor}
        <button onClick={e => {
          this.props.onSwitchColor('black')
        }}>change</button>
        <ul>
          {this.props.friendList.map((friend)=> <li>{friend}</li>)}
        </ul>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    themeColor: state.theme.themeColor,
    friendList: state.friend.list
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSwitchColor: (color) => {
      dispatch({ type: 'CHANGE_COLOR', themeColor: color })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
