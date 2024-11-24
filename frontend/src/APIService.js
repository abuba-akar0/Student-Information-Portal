import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export default class APIService {
  // Method to log in the user
  static async loginUser(credentials) {
    try {
      const response = await fetch(`${API_URL}/auth/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        return await response.json();
      }

      // Check if the response is JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error logging in user");
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  }

  // Method to register a new user
  static async registerUser(userData) {
    try {
      const response = await fetch(`${API_URL}/api/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        return await response.json();
      }

      // Check if the response is JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error registering user");
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }

    // Method to submit questionnaire responses
  static async fetchCareerQuestions() {
    try {
     const response = await axios.get(`${API_URL}/questionnaire/questions/`);
      return response.data;
     } catch (error) {
       console.error('Error fetching career questions:', error);
     throw error;
    }
  }

  static async submitResponses(userId, responses) {
  try {
    console.log('Submitting responses:', { user_id: userId, responses }); // Log the request payload
    const response = await axios.post(`${API_URL}/questionnaire/recommendation/`, {
      user_id: userId, // Change key name if needed
      responses: responses, // Adjust structure if necessary
    });
    return response.data.recommendations;
  } catch (error) {
    console.error('Error submitting responses:', error);
    throw error;
  }
}

    // Method to get universities
    static async getUniversities() {
      try {
        const response = await fetch(`${API_URL}/api/universities`);

        if (response.ok) {
          return await response.json();
        }
        throw new Error("Error fetching universities");
      } catch (error) {
        console.error("Error fetching universities:", error);
        throw error;
      }
    }

    // Method to get scholarships
    static async getScholarships() {
      try {
        const response = await fetch(`${API_URL}/api/scholarships`);

        if (response.ok) {
          return await response.json();
        }
        throw new Error("Error fetching scholarships");
      } catch (error) {
        console.error("Error fetching scholarships:", error);
        throw error;
      }
    }
}