import React from 'react';
import copyright from '../images/copyright.png';
import facebook from '../images/facebook.png';
import instagram from '../images/instagram.png';
import twitter from '../images/twitter.png';
import linkedin from '../images/linkedin.png';
function Footer() {
  return (
    <footer className="know-more footer">
          <div>
            <p>Designed and developed by : <span className="exp-duration">Venkatashiva Avula</span></p>
          </div>
          <div className="copy-rights">
            <p> 
              <img src={copyright} alt="copy-rights"/>
              <span> All copyrights reserved.</span>
            </p>
          </div>
          <div className="social-media">
            <a href="https://www.facebook.com/avenkat.shiva/" target="_blank" rel="noopener noreferrer"><img src={facebook} alt="facebook-logo"/></a>
            <a href="https://twitter.com/avenkatashiva" target="_blank" rel="noopener noreferrer"><img src={twitter} alt="twitter-logo"/></a>
            <a href="https://www.instagram.com/venkatshiva_089/"  target="_blank" rel="noopener noreferrer"><img src={instagram} alt="instagram-logo"/></a>
            <a href="https://www.linkedin.com/in/venkatashiva-avula-8b7b2b146"  target="_blank" rel="noopener noreferrer"><img src={linkedin} alt="linkedin-logo"/></a>
          </div>
      </footer>
  );
}

export default Footer;
