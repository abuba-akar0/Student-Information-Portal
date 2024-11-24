import React, { useState, useEffect } from "react";
import APIService from "../../APIService";

const ScholarshipSearch = () => {
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await APIService.getScholarships();
        setScholarships(response);
      } catch (error) {
        console.error("Error fetching scholarships:", error);
      }
    };

    fetchScholarships();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-white">Scholarship Search</h1>
      <hr className="bg-white" />
      <ul className="list-group">
        {scholarships.map((scholarship, index) => (
          <li key={index} className="list-group-item text-white">
            {scholarship.name} - {scholarship.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScholarshipSearch;
