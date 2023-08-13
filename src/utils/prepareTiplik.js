import axios from 'axios';

export default async function prepareTipLink(tiplinkaddress) {
  const url = "https://api.r3x.tech/tiplink/prepare";
  const headers = {
    "Content-Type": "application/json"
  };

  const data = {
    "tiplinkaddress": `${tiplinkaddress}`,
  };

  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.log('Error preparing tiplink: ', error.message);
    return "Failed to prepare tiplink!"
  }
}
