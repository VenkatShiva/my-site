import React, { Component } from 'react';
import { Transition, animated } from "react-spring/renderprops";

class BasicTransaction extends Component {
   state = {
       show: true
   }
  componentDidMount = () => {
    let { duration } = this.props;
    duration = duration || 5000;
    setTimeout(()=>{
        this.setState({
            show: false
        });
        // if(deleteNotification && id){
        //   setTimeout(()=>{
        //     deleteNotification(id);
        //   },500)
        // }
    },duration);
  }
  render() {
    const { children } = this.props;
    let from = {opacity: 0,transform: 'translate3d(-100%,0,0)' }, enter= {opacity: 1, transform: 'translate3d(0%,0,0)'}, leave = {opacity: 0, transform: 'translate3d(-100%,0,0)'};
    return (
      <Transition
        native
        items= { this.state.show }
        from= { from }
        enter= { enter }
        leave= { leave }
        config = {{
          duration: 500
        }}
      >
        { show =>
          show && (
            props => (
              <animated.div 
                style={ props }
              > 
                { children }
              </animated.div>
            )
          )
        }
      </Transition>
    );
  }
}


export default BasicTransaction;