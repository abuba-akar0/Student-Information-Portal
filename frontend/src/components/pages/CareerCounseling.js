import React, { useState, useEffect } from "react";
import APIService from "../../APIService";
import "./CareerCounseling.css"; // Importing custom CSS for styling
import Modal from "../../Modal"; // Import the Modal component

function CareerCounseling() {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    // Fetching questions from the backend API
    APIService.fetchCareerQuestions()
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setError(`Error fetching questions: ${err.message}. Please try again later.`);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures this runs only once

  const handleChange = (questionId, choice) => {
    // Store user response in the state
    setResponses({ ...responses, [questionId]: choice });
    setError(""); // Clear error when the user makes a selection
  };

  const handleSubmit = () => {
    // Check if all questions have been answered
    const allAnswered = questions.every((question) => responses[question.id] !== undefined);

    if (!allAnswered) {
      setError("Please answer all questions before submitting.");
      return;
    }

    // Submit the responses and get career recommendations
    APIService.submitResponses(1, responses)
      .then((data) => {
        console.log("Received recommendations:", data); // Debugging log
        setRecommendations(data);
        setShowModal(true); // Show the modal with recommendations
        setError(""); // Clear any error
      })
      .catch((err) => {
        console.error("Error submitting responses:", err);
        setError(`Error submitting your responses: ${err.message}. Please try again.`);
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Render loading or error state
  if (loading) {
    return <div>Loading questions...</div>;
  }

  if (error && !questions.length) {
    return <div>{error}</div>;
  }

  return (
    <div className="career-counseling-container">
      <h1 className="title">Career Counseling</h1>

      {/* Loop through each question and display choices */}
      <div className="questions-container">
        {questions.map((question) => (
          <div key={question.id} className="question">
            <h3>{question.question_text}</h3>
            <div className="choices">
              {Object.entries(question.choices).map(([key, value]) => (
                <label key={key} className="choice-label">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={key}
                    onChange={() => handleChange(question.id, key)}
                    checked={responses[question.id] === key}
                  />
                  {value}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Display error message above the submit button */}
      {error && <div className="error-message">{error}</div>}

      <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>

      {/* Display career recommendations in a modal */}
      <Modal show={showModal} onClose={closeModal}>
        <h2>Career Recommendations:</h2>
        {recommendations.length > 0 ? (
          recommendations.map((rec, index) => (
            <div key={index} className="recommendation-card">
              <h3>{rec.name}</h3>
              <p>{rec.description}</p>
            </div>
          ))
        ) : (
          <p>No recommendations available.</p>
        )}
      </Modal>
    </div>
  );
}

export default CareerCounseling;