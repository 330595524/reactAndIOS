import React, { Component } from 'react';
import { Button, Layout } from 'antd';
import OperationButtonsComponent from '../../commonComponent/operationButtonsComponent/OperationButtonsComponent';
import FormComponent from '../../commonComponent/formComponent/FormComponent';

const { Header, Footer, Sider, Content } = Layout;
// eslint-disable-next-line
import './PersonnelOriginator.less';



class PersonnelOriginator extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      status: 0, //员工状态 0、1、2
    };

  }
  submit = ()=>{
    console.log('提交')
  }
  saveDraft= ()=>{
    console.log('保存')
  }
  flowDiagram= ()=>{

  }
  render() {
    const buttons = [
        {name:'提交',iconName:'iconqidong',fn:this.submit},
        {name:'保存草稿',iconName:'iconbaocun',fn:this.saveDraft},
        {name:'流程示意图',iconName:'iconliuchengguanliqi',fn:this.flowDiagram},
        {name:'查看审批记录',iconName:'iconlishi',fn:this.submit},
      ]
    return (
      <div className="personnelContainer">
        <Content className="operation">
          <OperationButtonsComponent buttonData={buttons} />
          <FormComponent />
        </Content>
      </div>
    );
  }
}

export default PersonnelOriginator;
