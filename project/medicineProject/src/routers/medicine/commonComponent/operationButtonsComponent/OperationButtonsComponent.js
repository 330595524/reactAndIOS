import React, { Component } from 'react';
import { Button } from 'antd';
// eslint-disable-next-line
import './OperationButtonsComponent.less';

class operationButtonsComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    const {buttonData} = this.props;
    return (
      <div className="operationButtons">
        {buttonData.map(item=>{
          return (<Button key={item.iconName} type="link" size="small" className='btn' onClick={item.fn}>
              <span className={"iconfont "+item.iconName}></span>
              <i>{item.name}</i>
          </Button>)
        })}
      </div>
    );
  }
}

export default operationButtonsComponent;
