import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Check your VS console for the exact port

export const createMeeting = async (meetingData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/meetings`, meetingData);
    return response.data;
  } catch (error) {
    console.error("Error connecting to backend:", error);
    throw error;
  }
};

export const getMeetings = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/meetings?email=${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching meetings:", error);
    throw error;
  }
};