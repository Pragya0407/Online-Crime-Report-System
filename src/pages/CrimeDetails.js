    import React, { useState } from 'react';
    import '../styles/crime.css';
    import Header from '../components/Header2';
    import axios from 'axios'; 



    const CrimeDetails = () => {
        const [formData, setFormData] = useState({
          victim: '',
          IDproof: null,
          Address: '',
          phonenum: '',
          DescCrime: '',
          date: '',
          Place: '',
        });
      
        const handleInputChange = (e) => {
          const { name, value, type, files } = e.target;
      
          if (type === 'file') {
            setFormData({
              ...formData,
              [name]: files[0],
            });
          } else {
            setFormData({
              ...formData,
              [name]: value,
            });
          }
        };
      
        const handleSubmit = async (e) => {
          e.preventDefault();
        
          try {
            const formDataToSend = new FormData();
            formDataToSend.append('victim', formData.victim);
            formDataToSend.append('Address', formData.Address);
            formDataToSend.append('phonenum', formData.phonenum);
            formDataToSend.append('DescCrime', formData.DescCrime);
            formDataToSend.append('date', formData.date);
            formDataToSend.append('Place', formData.Place);
            formDataToSend.append('IDproof', formData.IDproof);
        
            await axios.post('http://localhost:3001/crime', formDataToSend);
        
            console.log('Crime report submitted successfully');
        
    // Show the pop-up message
    const successPopup = document.getElementById('successPopup');
    successPopup.style.display = 'block';

    // Clear form fields
    setFormData({
      victim: '',
      IDproof: null,
      Address: '',
      phonenum: '',
      DescCrime: '',
      date: '',
      Place: '',
    });

    // Hide the pop-up message after 3 seconds (adjust as needed)
    setTimeout(() => {
      successPopup.style.display = 'none';
    }, 3000);
  } catch (error) {
    console.error('Error submitting crime report:', error);
  }
};

    return (
        <>
        <Header/>
        <div className="centered-container">
            <div className="container">
        <h1 className="head">CASE REGISTRATION</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label>Victim</label>
            <input
            type="text"
            name="victim"
            value={formData.victim}
            onChange={handleInputChange}
            className="text1"
            />
            <label>ID Proof</label>
            <input
            type="file"
            name="IDproof"
            id="fileToUpload"
            onChange={handleInputChange}
            />
            <label>Address</label>
            <textarea
            name="Address"
            value={formData.Address}
            placeholder="Write something.."
            style={{ height: '100px', width: '450px', borderRadius: '5px' }}
            onChange={handleInputChange}
            ></textarea>

            <label>Contact Number</label>
            <input
            type="text"
            name="phonenum"
            value={formData.phonenum}
            onChange={handleInputChange}
            className="text"
            />

            <p>Describe the crime scene</p>
            <textarea
            name="DescCrime"
            value={formData.DescCrime}
            placeholder="Write something.."
            style={{ height: '100px', width: '450px', borderRadius: '5px' }}
            onChange={handleInputChange}
            ></textarea>

            <label>Date of Crime</label>
            <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            />

            <p>Place where Crime Happened</p>
            <textarea
            name="Place"
            value={formData.Place}
            placeholder="Write something.."
            style={{ height: '100px', width: '450px', borderRadius: '5px' }}
            onChange={handleInputChange}
            ></textarea>

            <input type="submit" value="Submit" />
        </form>
        </div>
        </div>
        <div className="popup" id="successPopup">
      <div className="popup-content">
          <p>Form submitted successfully!</p>
      </div>
      </div>
        </>
    );
    };

    export default CrimeDetails;
