import axios from 'axios';

export async function getUser() {
  try {
let userId=   await localStorage.getItem("userId")

    console.log("function chala",userId);
    const response = await axios.post('/api/user/getUser', {userId:userId});
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || 'Something went wrong');
  }
}