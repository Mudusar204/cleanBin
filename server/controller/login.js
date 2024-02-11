import axios from 'axios';

export async function loginUser(userData) {
  try {
    console.log("function chala");
    const response = await axios.post('/api/auth/login', userData);
    console.log(response.data,"response ");
    localStorage.setItem("userId", response.data.data._id);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || 'Something went wrong');
  }
}