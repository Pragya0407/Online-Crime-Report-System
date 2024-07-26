import React from 'react';
import '../styles/ContactUs.css'; 
import logo from '../img/logo.png';


const ContactUs = () => {
  return (
    <div className="contact-us">
      <div className="back">
        <img src={logo} alt="Company Logo" />
      </div>
      <h1 className="line">Contact Us</h1>
      <div className="container2">
        <form action="process_contact.php" method="post">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required  className="text3"/>

          <label htmlFor="email" className="email">Email:</label>
          <input type="email" id="email" name="email" required style={{width:"90%"}}/>

          <label htmlFor="phone">Phone Number:</label>
          <input type="tel" id="phone" name="phone" required style={{width:"95%"}} />

          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required style={{width:"95%"}}></textarea>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
