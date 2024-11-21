import axios from 'axios';

// Set the base URL for your API
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Adjust to your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example API call: Fetching services
export const fetchServices = async () => {
  try {
    const response = await apiClient.get('/services'); // Adjust the endpoint as necessary
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error; // Propagate the error so the caller can handle it
  }
};

// Example API call: Creating a new service
export const createService = async (serviceData: { title: string; description: string }) => {
  try {
    const response = await apiClient.post('/services', serviceData); // Adjust the endpoint as necessary
    return response.data;
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
};

// Example API call: User registration
export const registerUser = async (userData: { username: string; email: string; password: string }) => {
  try {
    const response = await apiClient.post('/users/register', userData); // Adjust endpoint
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Example API call: User login
export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    const response = await apiClient.post('/users/login', credentials); // Adjust endpoint
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};
