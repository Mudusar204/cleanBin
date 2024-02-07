import axios from 'axios';

export async function signUpUser(userData) {
  try {
    console.log("function chala");
    const response = await axios.post('/api/auth/signup', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || 'Something went wrong');
  }
}