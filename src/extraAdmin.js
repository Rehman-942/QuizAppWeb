import React, { useState } from 'react';
import data from './data/admin.json';
import './styles/admin.css';
import AdminResult from './adminResult';

const itemsPerPage = 10;

const Admin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [result, setResult] = useState({});
  
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (e, newPage) => {
    window.scrollTo(0, 0)
    setCurrentPage(newPage);
    e.preventDefault();
};

  return (
    <div className="admin">
      <nav className="admin-navbar">Admin Panel</nav>
      {!(Object.keys(result).length) ?
      <div className="admin-result" >
        <div className="result-box-wrapper">
                <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Time of Test</th>
                      </tr>
                    </thead>
                    <tbody>
          {currentItems.map((user, index) => (
            <div className="result-box" key={index} onClick={()=>{
              setResult(user);
            }}>
              <div className="admin-result">
                <div className="admin-top">
                  {/* <h2>{user.name}</h2> */}
                </div>
                <div className="min-result">
                      <tr>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.timeOfTest}</td>
                      </tr>
                  {/* {Object.keys(user.result).map((value, index) => (
                    <p key={index} style={{ fontWeight: value === 'psychopathy' ? 600 : 400 }}>
                    {value} <span>{user.result[value].total}%</span>
                    </p>
                  ))} */}
                </div>
              </div>
            </div>
          ))}
          </tbody>
          </table>
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
      </div>:
      <AdminResult data={result}/>
    }
    </div>
  );
};

export default Admin;
