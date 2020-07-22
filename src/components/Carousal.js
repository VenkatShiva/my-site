import React from 'react';
// import logo from '../images/logo.png'
import nodejs from '../images/nodejs.png';
import reactjs from '../images/reactjs.png';
import js from '../images/js.png';
function Carousal() {
  return (
    <div id="profile" className="my-carousel center-align" >
            <div className="my-interest center-align">
              <h5>These are my strengths</h5>
              <p>Also proficient in some javascript libraries</p>
            </div>
            <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active" data-interval="15000">
                      <div className="carousel-caption ">
                        <img src={nodejs} className="d-block " width="70" alt="..."/>
                        <div>
                            <h5>Node JS</h5>
                            <p>Writing server-side web application logic in JavaScript</p>
                        </div>
                      </div>
                  </div>
                  <div className="carousel-item" data-interval="15000">
                      <div className="carousel-caption ">
                        <img src={reactjs} className="d-block " width="70" alt="..."/>
                        <div>
                            <h5>React JS</h5>
                            <p>Implementing complex and Single Page Applications (SPA)</p>
                        </div>   
                      </div>
                  </div>
                  <div className="carousel-item" data-interval="15000">
                    <div className="carousel-caption ">
                        <img src={js} className="d-block " width="70" alt="..."/>
                        <div>
                            <h5>Others</h5>
                            <p>JavaScript, HTML, CSS, jQuery, React Native, Redux</p>
                        </div>
                    </div>
                  </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
        </div>
  );
}

export default Carousal;
