import React, { Component } from 'react';
import { Transition, animated } from "react-spring/renderprops";

class BasicTransaction extends Component {
  state = {
    height: null,
  }
  height = undefined;
  //getSnapshotBeforeUpdate(prevProps, prevState)
  render() {
    // console.log('animref-->',this.animRef.current)
    // debugger;
    const { children, duration, show, className } = this.props;
    let from = {opacity: 0 }, enter= {opacity: 1}, leave = {opacity: 0};
    if(this.height){
      from.height = 0;
      enter.height = this.height;
      leave.height = 0;
      // debugger;
    }
    let showme;
    if(show === undefined){
      // debugger;
      showme = true;
    }else{
      showme = show;
    }
    if(this.props.enableHeight){
      // debugger;
    }
    return (
      <>
        <Transition
          native
          items= {showme}
          from= { from }
          enter= { enter }
          leave= { leave }
          config = {{
            duration: duration ? duration : 1000
          }}
          
        >
          { show =>
            show && (
              props => (
                <animated.div 
                  style={ props }
                  className = {className}
                > 
                  { children }
                </animated.div>
              )
            )
          }
        </Transition>
      </>
    );
  }
}


export default BasicTransaction;