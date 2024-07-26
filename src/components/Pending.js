import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import '../styles/CrimeDetails.css';

const PendingCase = () => {
  const [pendingReports, setPendingReports] = useState([]);

  useEffect(() => {
    const fetchPendingReports = async () => {
      try {
        const response = await axios.get('http://localhost:3001/pending');
        setPendingReports(response.data);
      } catch (error) {
        console.error('Error fetching pending reports:', error);
      }
    };

    fetchPendingReports();
  }, []);

  const handleDownload = async (reportId) => {
    try {
      // Make a request to download the ID proof
      const response = await axios.get(`http://localhost:3001/crime/${reportId}/idproof`, {
        responseType: 'blob', // Set the responseType to 'blob' to receive binary data
      });

      // Create a URL for the blob data
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary anchor element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'idproof.pdf'); // Set the desired filename and extension
      document.body.appendChild(link);
      link.click();

      // Clean up the temporary anchor element and URL
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading ID proof:', error);
    }
  };

  const handleComplete = async (reportId) => {
    try {
      await axios.patch(`http://localhost:3001/crimereports/${reportId}/complete`, {
        completed: true,
      });

      setPendingReports((prevReports) => prevReports.filter((report) => report._id !== reportId));
    } catch (error) {
      console.error('Error completing report:', error);
    }
  };

  const displayedReports = pendingReports.slice(0, 5);

  return (
    <div className="crime">
      <h2 className="headtext" style={{marginTop:"20px"}}>Pending Crime Reports</h2>
      <div className="pad-color">
        <table className="table-style">
          <thead>
            <tr>
              <th>Crime ID</th>
              <th>Victim</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Description</th>
              <th>Date</th>
              <th>Place</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedReports.map((report) => (
              <tr key={report._id}>
                <td className="table-cell-center">{report.reportId}</td>
                <td className="table-cell-center">{report.victim}</td>
                <td className="table-cell-center">{report.Address}</td>
                <td className="table-cell-center">{report.phonenum}</td>
                <td className="table-cell-center">{report.DescCrime}</td>
                <td className="table-cell-center">{moment(report.date).format('YYYY-MM-DD')}</td>
                <td className="table-cell-center">{report.Place}</td>
                <td className="table-cell-center">
                  <button className="download-button" onClick={() => handleDownload(report.reportId)}>Download</button>
                  <button className="complete-button" onClick={() => handleComplete(report._id)} style={{ marginLeft: "5px" }}>Complete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingCase;
