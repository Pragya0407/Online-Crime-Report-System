import React from 'react';
import logo from '../img/logo.png';
import img from '../img/law.jpeg';
import '../styles/about.css';

const AboutUs = () => {
  return (
    <>
      <div className="back">
        <img src={logo} alt="Company Logo" />
      </div>
      <div className="imageSection">
        <img src={img} alt="Law" className="pic" />
      </div>
      <div className="aboutUs">
        <div className="about" >
        <div className="text2" style={{ border: 'none'}}>
            <h2>About Us</h2>
            <h5>Crime Report Website</h5>
            <p>crime website is a website that deals specially with crime and protecting the people as quickly and possible and giving the possibility for each and every person to report the file. Not every person can report a file by filing a complaint in the police station due to many issues, So this website is the best option to file a report online and all the details of the reporting party will be confidential. You can even see the progress of the case in the website. To register a file, you can log in to the website.</p>
            <div className="data">
              {/* <a href="#" className="hire">Read More</a> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
