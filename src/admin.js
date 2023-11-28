import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/admin.css';
import AdminResult from './adminResult';
import Login from './login.js';

const itemsPerPage = 10;

const Admin = () => {
  const [logined, setLogined] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [result, setResult] = useState({});
  const [data, setData] = useState([]); // Initialize data as an empty array

  useEffect(() => {
    // Fetch results from the API when the component mounts
    // http://localhost:3001/api/getResults
    // https://quiz-app-server-lyart.vercel.app/api/getResults
    axios.get('http://test.yucatanblue.com:3001/api/getResults')
      // .then((response) => {
      // console.log('response', response);
        // response.json()
      // })
      .then((response) => {
        console.log('response', response);
        setData(response.data)
      }
      ) // Assuming the API returns results in the "results" field
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const totalItems = data?.length; // Use data.length to calculate the total items
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (e, newPage) => {
    window.scrollTo(0, 0);
    setCurrentPage(newPage);
    e.preventDefault();
  };

  return (
    <>
      {!logined ? <Login setLogined={setLogined} /> :
        <div className="admin">
          <nav className="admin-navbar">Admin Panel
            {(Object.keys(result).length) ? <div className="admin-back" onClick={() => setResult({})} >Back</div> : ""}
          </nav>
          {!(Object.keys(result).length) ? (
            <div className="admin-result">
              <div className="result-box-wrapper">
                {currentItems.map((user, index) => (
                  <div
                    className="result-box"
                    key={index}
                    onClick={() => {
                      setResult(user);
                    }}
                  >
                    <div className="admin-result">
                      <div className="admin-top">
                        <h2>{user.username}</h2>
                        <p>{user.email}</p>
                      </div>
                      <div className="min-result">
                        {Object.keys(user.result).map((value, index) => (
                          <p key={index} style={{ fontWeight: value === 'psychopathy' ? 600 : 400 }}>
                            {value} <span>{user.result[value].total}%</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pagination">
                <button
                  onClick={(e) => handlePageChange(e, currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={(e) => handlePageChange(e, currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <AdminResult data={result} setResult={setResult} />
          )}
        </div>
      }
    </>
  );
};

export default Admin;
