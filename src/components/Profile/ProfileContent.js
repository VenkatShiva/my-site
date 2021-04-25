import React, { useState, useEffect, createRef } from 'react';
import StarRating from './StarRating';
import knowMe from '../../images/know-me.png';
import degree from '../../images/degree.svg';
import profession_img from '../../images/profession.svg';
import location from '../../images/location.svg';
import email from '../../images/email.svg';
import mobile from '../../images/mobile.svg';
import Footer from '../Footer';

function ProtectedRoute(props) {
  const [ scrolledArea, setScrolledArea ] = useState('me');
  const profession = 'A Full Stack Developer';
  let list = profession.split('').map((char,index)=><span key={'bounce'+index}
    style={{animationDelay:`${index/8}s`}}
  >{char}</span>);
  const parentDivRef = createRef();
  const profileRef = createRef();
  const knowMoreRef = createRef();
  const expRef = createRef();
  const contactRef = createRef();
  const scrollToThere = (div) => {
    // debugger
    if(div.current){
      parentDivRef.current.scroll({
        top: div.current.offsetTop  - parentDivRef.current.offsetTop,
        behavior: 'smooth'
      })
      // div.current.scrollIntoView(
      // {
      //   behavior: 'smooth',
      //   block: 'nearest'
      // }
      // );
    }
  }
  useEffect(() => {
    // Your code here
    if(parentDivRef && parentDivRef.current){
      let parentOffset = parentDivRef.current.offsetTop;
      let parent = {
        scrollTop: parentDivRef.current.scrollTop,
        height: parentDivRef.current.clientHeight,
      }
      const knowMore = {
        height: knowMoreRef.current.scrollHeight,
        offsetTop: knowMoreRef.current.offsetTop - parentOffset
      }
      const exp = {
        height: expRef.current.scrollHeight,
        offsetTop: expRef.current.offsetTop - parentOffset
      }
      const contact = {
        height: contactRef.current.scrollHeight,
        offsetTop: contactRef.current.offsetTop - parentOffset
      }
      // debugger;
      // const wHeight = window
      // const parentOffsetTop = parentDivRef.current.offsetTop;
      // const knowMoreOffsetTop = knowMoreRef.current.offsetTop;
      // const parentRef = parentDivRef.current;
      parentDivRef.current.addEventListener('scroll', ()=>{
        if(parentDivRef.current){
          parent = {
            scrollTop: parentDivRef.current.scrollTop,
            height: parentDivRef.current.clientHeight,
          }
          let common = parent.scrollTop + parent.height;
          if(contact.height + contact.offsetTop < common){
            setScrolledArea('contact'); 
          }else if(exp.height + exp.offsetTop < common){
            setScrolledArea('exp'); 
          }else if(knowMore.height + knowMore.offsetTop < common){
            setScrolledArea('about'); 
          } else {
            setScrolledArea('me');
          }
        }
        // debugger;
        //    setScrolledArea('about');
      });
    }
  });
  return (
    <div
      ref={parentDivRef}
    >
    <div className="profile-nav">
      <div>        <span className={ scrolledArea === 'me' ? "profile-link active" : 'profile-link'}
          onClick={()=>scrollToThere(profileRef)}
        >
          ME
        </span>
        <span className={ scrolledArea === 'about' ? "profile-link active" : 'profile-link'}
          onClick={()=>scrollToThere(knowMoreRef)}
        >
          ABOUT
        </span>
        <span className={ scrolledArea === 'exp' ? "profile-link active" : 'profile-link'}
          onClick={()=>scrollToThere(expRef)}
        >
          EXPERIANCE
        </span>
        <span className={ scrolledArea === 'contact' ? "profile-link active" : 'profile-link'}
          onClick={()=>scrollToThere(contactRef)}
        >
          CONTACT
        </span>
      </div>
    </div>
    <div className="profile-component" ref={profileRef} >
      <div className="profile-content">
        <p className="profile-intro">I'm</p>
        <p className="profile-name">Venkat Shiva</p>
        <p className="profile-passion">
          <span className="bar"></span>
          {list}
        </p>
        <button className="btn know-more"
          onClick={()=>scrollToThere(knowMoreRef)}
        >KNOW MORE</button>
      </div>
    </div>
    <div ref={knowMoreRef} className="know-more" >
      <div className="know-image">
        <img src={knowMe} alt="my-pic"/>
      </div>
      <div className="know-info">
        <div className="know-info-heading">
          <p className="know-me">
            <span className="bar"></span>
            <span>ABOUT ME</span>
          </p>
          <p className="know-heading">Who Am I</p>
          <p className="know-bio">
            My name is <span style={{color:'white', fontSize:'1.1rem'}}>Venkat Shiva</span>. I'm a Full Stack Web Developer based Bangalore, India, and I'm very passionate and dedicated to my work.
            With 1 years 10 months experience as a professional Full Stack Web Developer, I have acquired the skills necessary to build great and premium web applications.
            <br/><br/>
            I love to build web applications with React & Node. Proficient in JavaScript, HTML, CSS, React and modern JavaScript libraries and frameworks.
          </p>
        </div>
        <div className="tech-score">
            <div className="tech-feild">
              <div className="tech-name">
                JavaScript
              </div>
              <div className="tech-rate" data-title={4.7}>
                <StarRating rating={4.7}/>
              </div>
            </div>
            <div className="tech-feild">
              <div className="tech-name">
                HTML & CSS
              </div>
              <div className="tech-rate" data-title={4.5}>
                <StarRating rating={4.5}/>
              </div>
            </div>
            <div className="tech-feild">
              <div className="tech-name">
                JQuery, Ajax, jQuery UI
              </div>
              <div className="tech-rate" data-title={4}>
                <StarRating rating={4}/>
              </div>
            </div>
            <div className="tech-feild">
              <div className="tech-name">
                React, Redux, React Native
              </div>
              <div className="tech-rate" data-title={3.7}>
                <StarRating rating={3.7}/>
              </div>
            </div>
            <div className="tech-feild">
              <div className="tech-name">
                Node JS, Express, MongoDB
              </div>
              <div className="tech-rate" data-title={4}>
                <StarRating rating={4}/>
              </div>
            </div>
            <div className="tech-feild">
              <div className="tech-name">
                Python, SQL, Git
              </div>
              <div className="tech-rate" data-title={3}>
                <StarRating rating={3}/>
              </div>
            </div>
        </div>
      </div>
      </div>
      <div className="exp-divider">
        <hr/>
      </div>
      <div className="know-more myexp" ref={expRef}>
        <div className="know-info-heading">
          <p className="know-me">
            <span className="bar"></span>
            <span>MY STORY</span>
          </p>
          <p className="know-heading">My Experience</p>
        </div>
        <div className="exp-container">
          <div className="exp-feild">
            <div className="exp-logo">
              <div>
                <img src={profession_img} alt="degree"/>
                <span className="exp-link"></span>
              </div>
            </div>
            <div className="exp-content">
              <div className="exp-name">
                <p className="exp-title">Front-End Developer</p>
                <p className="exp-subtitle">
                  <span className="exp-duration">Feb 2019 - Present</span> 
                  <span className="exp-company"> | Active AI</span>
                </p>
              </div>
              <div className="exp-summary">
                <p>Active AI is a Singapore based Fintech startup, which is using artificial intellignece(AI) to deliver Conversatioinal Banking services.</p>
                <p style={{textDecoration:"underline"}}>
                  Core activities here:
                </p>
                <ul className="exp-activities">
                  <li>Developing new CX, features and functionalities in chatbots</li>
                  <li>Developing reusable React Components</li>
                  <li>Managing Front-End code integrations and deployments</li>
                  <li>Debugging and fixing issues</li>
                  <li>More and more</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="exp-feild">
            <div className="exp-logo">
              <div>
                <img src={profession_img} alt="degree"/>
                <span className="exp-link"></span>
              </div>
            </div>
            <div className="exp-content">
              <div className="exp-name">
                <p className="exp-title">Software Development Trainee</p>
                <p className="exp-subtitle">
                  <span className="exp-duration">Dec 2018 - Feb 2019</span> 
                  <span className="exp-company"> | MountBlue Technologies</span>
                </p>
              </div>
              <div className="exp-summary">
                <p>MountBlue Technologies is a stratup which closely work with high growth ventures to solve their entry-level tech hiring.</p>
                <p style={{textDecoration:"underline"}}>
                  Core activities here:
                </p>
                <ul className="exp-activities">
                  <li>Developing web applications using Node, React, Express, MongoDB and MySQL</li>
                  <li>Writing test cases Test Driven Development</li>
                  <li>Debugging and fixing issues</li>
                  <li>Deploying projects in Amazon EC2</li>
                </ul>
              </div>
            </div>
          </div>
         </div>
      {/* </div>
      <div className="know-more myexp"> */}
        <div className="know-info-heading second">
          <p className="know-heading">My Education</p>
        </div>
        <div className="exp-container">
          <div className="exp-feild">
            <div className="exp-logo">
              <div>
                <img src={degree} alt="degree"/>
                <span className="exp-link"></span>
              </div>
            </div>
            <div className="exp-content">
              <div className="exp-name">
                <p className="exp-title">Bachelor of Technology (B.Tech)</p>
                <p className="exp-subtitle">
                  <span className="exp-duration">Jun 2014 - Apr 2018</span> 
                  <span className="exp-company"> | IIIT AP RGUKT RK VALLEY</span>
                </p>
              </div>
              <div className="exp-summary">
                <p>Bachelor degree from Rajiv Gandhi University of Knowledge and Science in the stream of Electronics and Communication Engineering(ECE).
                  <br/>
                  CGPA : <span className="exp-duration"> 8.5 </span> / 10
                </p>
              </div>
            </div>
          </div>
          <div className="exp-feild">
            <div className="exp-logo">
              <div>
                <img src={degree} alt="degree"/>
                <span className="exp-link"></span>
              </div>
            </div>
            <div className="exp-content">
              <div className="exp-name">
                <p className="exp-title">Pre University Course (PUC)</p>
                <p className="exp-subtitle">
                  <span className="exp-duration">Jul 2012 - May 2014</span> 
                  <span className="exp-company"> | IIIT AP RGUKT RK VALLEY</span>
                </p>
              </div>
              <div className="exp-summary">
                <p>Pre University Course from Rajiv Gandhi University of Knowledge and Science in the stream of M.P.C .
                  <br/>
                  CGPA : <span className="exp-duration"> 8.4 </span> / 10
                </p>
              </div>
            </div>
          </div>
         </div>
      </div>
      <div className="exp-divider">
        <hr/>
      </div>
      <div className="know-more myexp contact" ref={contactRef} >
        <div className="know-info-heading">
          <p className="know-me">
            <span className="bar"></span>
            <span>CONTACT ME</span>
          </p>
          <p className="know-heading">Get In Touch</p>
        </div>
        <div className="exp-container">
          <div className="exp-feild">
            <div className="exp-logo">
              <div>
                <img src={location} alt="degree"/>
                <span className="exp-link"></span>
              </div>
            </div>
            <div className="exp-content">
              <p className="contact-type exp-duration">Location</p>
              <div className="contact-fields">
                <p>Bangalore</p>
                <p>India</p>
              </div>
            </div>
          </div>
          <div className="exp-feild">
            <div className="exp-logo">
              <div>
                <img src={email} alt="degree"/>
                <span className="exp-link"></span>
              </div>
            </div>
            <div className="exp-content">
              <p className="contact-type exp-duration">Email</p>
              <div className="contact-fields">
                <a href="mailto:avenkatashiva@gmail.com">avenkatashiva@gmail.com</a>
                <br/>
                <a href="mailto:venkatashiva.site@gmail.com">venkatashiva.site@gmail.com</a>
              </div>
            </div>
          </div>
          <div className="exp-feild">
            <div className="exp-logo">
              <div>
                <img src={mobile} alt="degree"/>
                <span className="exp-link"></span>
              </div>
            </div>
            <div className="exp-content">
              <p className="contact-type exp-duration">Mobile</p>
              <div className="contact-fields">
                <a href="tel:+918096695836">+91 80966 95836</a>
                <br/>
                <a href="tel:+919398584328">+91 93985 84328</a>
              </div>
            </div>
          </div>
         </div>
      </div>
      <div className="extra-space"></div>
      <Footer/>
    </div>
  )
}

export default ProtectedRoute;