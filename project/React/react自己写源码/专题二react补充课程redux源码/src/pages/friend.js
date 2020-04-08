import React, { Component } from 'react'
import connect from '../lib/react-redux/connect'


class Friend extends Component {

  render() {
    return (
      <div>
        hello friend {this.props.themeColor}
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor
  }
}

export default connect(mapStateToProps)(Friend)



