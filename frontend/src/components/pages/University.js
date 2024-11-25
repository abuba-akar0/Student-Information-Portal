import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './University.css';

const UniversityList = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:8000/universities/university/?q=${query}`);
        setUniversities(response.data);
      } catch (err) {
        console.error('Error fetching universities:', err);
        setError('Error fetching universities');
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, [query]);

  return (
    <div className="University-container">
      <h1 className="university-header">Universities</h1>
      <input
        className="search-input"
        type="text"
        placeholder="Search universities..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="university-list">
        {universities.length > 0 ? (
          universities.map((university) => (
            <div className="university-card" key={university.id}>
              <h2>{university.name}</h2>
              <p><strong>Country:</strong> {university.country}</p>
              <p><strong>City:</strong> {university.city}</p>
              <p><strong>State/Province:</strong> {university.state_province}</p>
              <p><strong>Website:</strong> <a href={university.website} target="_blank" rel="noopener noreferrer">{university.website}</a></p>
            </div>
          ))
        ) : (
          <p>No universities found.</p>
        )}
      </div>
    </div>
  );
};

export default UniversityList;