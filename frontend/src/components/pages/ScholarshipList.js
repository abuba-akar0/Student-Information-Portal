import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ScholarshipList.css';

const ScholarshipList = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchScholarships = () => {
      setLoading(true);
      axios.get(`http://127.0.0.1:8000/scholarships/scholarships/?q=${searchQuery}`)
        .then(response => {
          setScholarships(response.data);
          setLoading(false);
        })
        .catch(error => {
          setError('Failed to fetch scholarships');
          setLoading(false);
        });
    };

    fetchScholarships();
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="Scholarship-container">
      <h1 className="scholarship-header">Available Scholarships</h1>
      <input
        className="search-input"
        type="text"
        placeholder="Search scholarships..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {loading && <p>Loading scholarships...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && scholarships.length === 0 && <p>No scholarships available.</p>}
      <div className="scholarship-list">
        {scholarships.map(scholarship => (
          <div key={scholarship.id} className="scholarshipCard">
            <h3>{scholarship.title}</h3>
            <p>{scholarship.description}</p>
            <a href={scholarship.website} target="_blank" rel="noopener noreferrer">
              Visit Scholarship Website
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScholarshipList;