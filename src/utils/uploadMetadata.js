import axios from 'axios';

export default async function uploadMetadata(userwalletaddress, gamename, gamedescription, imageuri, gamelink) {
  const url = "https://api.r3x.tech/game/upload-game-nft-metadata";
  const headers = {
    "Content-Type": "application/json"
  };

  const data = {
    "userwalletaddress": `${userwalletaddress}`,
    "gamename": `Cubs PitchAR Game`,
    "gamedescription": `Pitch baseballs win tickets`,
    "imageuri": `${imageuri}`,
    "gamelink": `${gamelink}`
  };

  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.log('error', error);
    return "Failed to upload metadata!";
  }
}