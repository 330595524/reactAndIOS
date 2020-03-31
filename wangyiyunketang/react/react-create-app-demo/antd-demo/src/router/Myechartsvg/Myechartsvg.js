import React, { Component } from 'react';
const DEFAULT_PROPS = {
    style:{stroke:'red',strokeWidth:2, fill:"#ff6600"}
}
class Svg extends Component {
    render() { 
        return ( 
            <svg
            width='1000'
            height='1000'
            version='1.1'
            xmlns="http://www.w3.org/2000/svg" 
            >
            {this.props.children}
            </svg>
         );
    }
}
 class Circle extends Component {
    static defaultProps = DEFAULT_PROPS;
     render() { 
         return ( 
            <circle {...this.props} ></circle>
          );
     }
 }
 class Ellipse extends Component {
    static defaultProps = DEFAULT_PROPS;
     render() { 
         return ( 
            <ellipse {...this.props} ></ellipse>
          );
     }
 }

class Line extends Component {
    static defaultProps = DEFAULT_PROPS;
    get start(){
        return this.props.children[0].props
    }
    get end(){
        return this.props.children[1].props
    }

    render() { 
        return ( 
            <line x1={this.start.x} y1={this.start.y} x2={this.end.x} y2={this.end.y} {...this.props}>
                {this.props.children}
            </line>
         );
    }
}

class Point extends Component {  //抽象组件
    render() { 
        return null;
    }
}


class Myechartsvg extends Component {
    constructor(props) {
        super(props
            );
        this.state = {  }
    }
    render() { 
        return ( <div>
            {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <ellipse cx="150" cy="80" rx="100" ry="50" style={{fill:'yellow',stroke:'purple',strokeWidth:2 }}/>
</svg> */}
            <Svg>
                <Circle cx={50} cy={20} r={10} stroke={'black'}></Circle>
                <Ellipse cx={150} cy={80} rx={100} ry={50} ></Ellipse>
                <Line>
                    <Point x={10} y={10} />
                    <Point x={10} y={100} />
                </Line>
                




            </Svg>




        </div> );
    }
}
 
export default Myechartsvg;