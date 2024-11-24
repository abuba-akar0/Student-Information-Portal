import React, { useState, useEffect } from "react";
import APIService from "../../APIService";

const UniversitySearch = () => {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await APIService.getUniversities();
        setUniversities(response);
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };

    fetchUniversities();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-white">University Search</h1>
      <hr className="bg-white" />
      <ul className="list-group">
        {universities.map((university, index) => (
          <li key={index} className="list-group-item text-white">
            {university.name} - {university.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UniversitySearch;
