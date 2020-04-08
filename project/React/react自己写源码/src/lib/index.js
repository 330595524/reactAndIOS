import setAttribute from './setAttribute'

let setStateQueue = []
let renderQueue = []
// reRender 只在 队列的最后，执行一次
function defer( fn ) {
	return Promise.resolve().then( fn );
}
// APp demo setState
function enqueueSetState(stateChange, component) {
	if ( setStateQueue.length === 0 ) {
		defer( reRender );
	}

  setStateQueue.push({
	  stateChange,
	  component
  })
  if(!renderQueue.some(item => item === component)) {
    renderQueue.push(component)
  }
}


function  reRender() {
  let item,component
  while (item = setStateQueue.shift() ) {
	  const { stateChange, component } = item;
    if(!component.prevState){
      component.prevState = Object.assign({},component.state)
    }
    if(typeof stateChange === 'function') {

	    Object.assign(component.state,stateChange(component.prevState))
    } else  {

	    Object.assign(component.state,stateChange)
    }
    component.prevState = component.state
  }
	while (component = renderQueue.shift()) {
	  renderComponent(component)
  }


}


function createElement( tag, attrs, ...children ) {
  return {
    tag,
    attrs,
    children
  }
}
function render( vnode, container ) {
  return container.appendChild( _render( vnode ) );
}
function _render( vnode ) {

  if ( vnode === undefined || vnode === null || typeof vnode === 'boolean' ) vnode = '';

  if ( typeof vnode === 'number' ) vnode = String( vnode );

  if ( typeof vnode === 'string' ) {
    let textNode = document.createTextNode( vnode );
    return textNode;
  }
  if ( typeof vnode.tag === 'function' ) {

    const component = createComponent( vnode.tag, vnode.attrs );

    setComponentProps( component, vnode.attrs );

    return component.base;
  }


  const dom = document.createElement( vnode.tag );

  if ( vnode.attrs ) {
    Object.keys( vnode.attrs ).forEach( key => {
      const value = vnode.attrs[ key ];
      setAttribute( dom, key, value );
    } );
  }

  vnode.children.forEach( child => render( child, dom ) );    // 递归渲染子节点

  return dom;
}

class Component {
  constructor( props = {} ) {
    this.state = {};
    this.props = props;
  }
  setState( stateChange ) {
    // 将修改合并到state
    // Object.assign( this.state, stateChange );
    // renderComponent( this );
    enqueueSetState( stateChange, this );
  }
}
function createComponent( component, props ) {

  let inst;
  // 如果是类定义组件，则直接返回实例
  if ( component.prototype && component.prototype.render ) {
    inst = new component( props );
    // 如果是函数定义组件，则将其扩展为类定义组件
  } else {
    inst = new Component( props );
    inst.constructor = component;
    inst.render = function() {
      return this.constructor( props );
    }
  }

  return inst;
}
function setComponentProps( component, props ) {

  if ( !component.base ) {
    if ( component.componentWillMount ) component.componentWillMount();
  } else if ( component.componentWillReceiveProps ) {
    component.componentWillReceiveProps( props );
  }

  component.props = props;

  renderComponent( component );

}
export function renderComponent( component ) {

  let base;

  const renderer = component.render();

  if ( component.base && component.componentWillUpdate ) {
    component.componentWillUpdate();
  }

  base = _render( renderer );

  if ( component.base ) {
    if ( component.componentDidUpdate ) component.componentDidUpdate();
  } else if ( component.componentDidMount ) {
    component.componentDidMount();
  }

  if ( component.base && component.base.parentNode ) {
    component.base.parentNode.replaceChild( base, component.base );
  }

  component.base = base;
  base._component = component;

}
export const React = {
  createElement,
  Component
}
export const ReactDOM = {
  render: ( vnode, container ) => {
    container.innerHTML = '';
    return render( vnode, container );
  }
}

export const tool = {
  renderComponent
}

