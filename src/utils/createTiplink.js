import axios from 'axios';

export default async function createTiplink() {
  const url = "https://api.r3x.tech/tiplink/create";
  const headers = {
    "Content-Type": "application/json"
  };

  try {
    const response = await axios.post(url, null, { headers });
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
}