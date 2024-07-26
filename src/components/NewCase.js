import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CrimeDetails.css';
import moment from 'moment';

const NewCase = () => {
  const [pendingReports, setPendingReports] = useState([]);

  useEffect(() => {
    const fetchPendingReports = async () => {
      try {
        const response = await axios.get('http://localhost:3001/accept');
        setPendingReports(response.data);
      } catch (error) {
        console.error('Error fetching pending reports:', error);
      }
    };

    fetchPendingReports();
  }, []);

  const handleAccept = async (reportId) => {
    try {
      await axios.patch(`http://localhost:3001/crimereports/${reportId}`, {
        accepted: true,
      });

      setPendingReports((prevReports) => prevReports.filter((report) => report._id !== reportId));
    } catch (error) {
      console.error('Error accepting report:', error);
    }
  };

  const displayedReports = pendingReports.slice(0, 5);

  return (
    <div className="crime-container">
      <div className="crime">
        <h2 className="headtext">New Crime Reports</h2>
        <div className="pad-color">
          <table className="table-style2">
            <thead >
              <tr >
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
                  <td className="table-cell-center">
                    {moment(report.date).format('YYYY-MM-DD')}
                  </td>
                  <td className="table-cell-center">{report.Place}</td>
                  <td className="table-cell-center">
                    <button onClick={() => handleAccept(report._id)}>Accept</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewCase;
