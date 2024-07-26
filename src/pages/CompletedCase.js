import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CrimeDetails.css';
import HeaderAdmin from '../components/HeaderAdmin';
import moment from 'moment';

const CompletedCase = () => {
  const [crimeReports, setCrimeReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(10);

  useEffect(() => {
    const fetchCrimeReports = async () => {
      try {
        const response = await axios.get('http://localhost:3001/crimereports');
        setCrimeReports(response.data);
      } catch (error) {
        console.error('Error fetching crime reports:', error);
      }
    };

    fetchCrimeReports();
  }, []);

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = crimeReports.slice(indexOfFirstReport, indexOfLastReport);

  // Filter completed reports
  const completedReports = currentReports.filter((report) => report.completed === true);

  return (
    <>
      <HeaderAdmin />
      <div className="crime-container">
        <div className="crime">
          <h2 className="headtext">Crime History</h2>

          <div className="pad-color">
            <table className="table-style">
              <thead>
                <tr>
                  <th>Crime ID</th>
                  <th>Victim</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Place</th>
                </tr>
              </thead>
              <tbody>
                {completedReports.map((report) => (
                  <tr key={report._id}>
                    <td className="table-cell-center">{report.reportId}</td> {/* Add Crime ID here */}
                    <td className="table-cell-center">{report.victim}</td>
                    <td className="table-cell-center">{report.Address}</td>
                    <td className="table-cell-center">{report.phonenum}</td>
                    <td className="table-cell-center">{report.DescCrime}</td>
                    <td className="table-cell-center">
                      <span style={{ color: 'green' }}>Completed</span>
                    </td>
                    <td className="table-cell-center">
                      {moment(report.date).format('YYYY-MM-DD')}
                    </td>
                    <td className="table-cell-center">{report.Place}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentReports.length < reportsPerPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompletedCase;
