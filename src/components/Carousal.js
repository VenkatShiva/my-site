import React,{ Component, createRef } from 'react';
// import logo from '../images/logo.png'
import nodejs from '../images/nodejs.png';
import reactjs from '../images/reactjs.png';
import js from '../images/js.png';
import next from '../images/next.png';
class Carousal extends Component {
  state = {
    mydata:[
      {
        image: nodejs,
        heading: 'Node JS',
        subheading:'Writing server-side web application logic in JavaScript'
      },
      {
        image: reactjs,
        heading: 'React JS',
        subheading:'Implementing complex and Single Page Applications (SPA)'
      },
      {
        image: js,
        heading: 'Others',
        subheading:'JavaScript, HTML, CSS, jQuery, React Native, Redux'
      }
    ],
  }
  childRefs = new Array(3).fill().map(()=>createRef())
  presentOpened = 0
  scrollLeft = () => {
    // debugger;
    // const parent = this.parentRef;
    this.presentOpened--;
    if( this.presentOpened < 0 ) this.presentOpened = 2
    this.childRefs[this.presentOpened].current.scrollIntoView({
      behavior: 'smooth',
      block:'nearest'
    });
    // debugger;
  }
  scrollRight = () => {
    this.presentOpened++;
    if(this.presentOpened > 2){
      this.presentOpened = 0;
    }
    this.childRefs[this.presentOpened].current.scrollIntoView({
      behavior: 'smooth',
      block:'nearest'
    });
  }
  render() {
    let caroualCards = this.state.mydata.map( (data,index) => {
      // debugger;
      return (
        <div className="carousal-card"
         key={'cards-='+index}
         ref={ this.childRefs[index]}
         >
          <div className="carousal-image">
              <img src={data.image} width="70" alt="..."/>
          </div>
          <div className="carousal-content">
              <h5>{data.heading}</h5>
              <p>{data.subheading}</p>
          </div>
        </div>
      )
    })
    return (
      <div id="profile" className="my-carousel">
        <div className="my-interest">
          <h5>These are my strengths</h5>
          <p>Also proficient in some javascript libraries</p>
        </div>
        <div className="carousal-container">
          <div className="left-arrow arrows" onClick={this.scrollLeft}>
              <img src={next} alt="arrow"/>
          </div>
          <div className="all-cards" >
              {caroualCards}
          </div>
          <div className="right-arrow arrows" onClick={this.scrollRight}>
              <img src={next} alt="arrow"/>
          </div>
        </div>
      </div>
    );
  }
}

export default Carousal;
