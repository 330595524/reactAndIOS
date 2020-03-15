import React, { Component } from 'react';
import { Button } from 'antd/lib/index';
// eslint-disable-next-line
import './Home.less';

class FormComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <div className="home">
        <table className="table" />
        {process.env.NODE_ENV}
        {process.env.REACT_APP_SECRET_API}
        <Button />
      </div>
    );
  }
}

export default FormComponent;
