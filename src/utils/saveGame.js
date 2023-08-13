import axios from 'axios';

export default async function saveGame(gamename, creator, generateprompt, modifyprompts, gamecode) {
  const url = "https://api.r3x.tech/game/arggg/save-game";
  const headers = {
    "Content-Type": "application/json"
  };

  const data = {
    "gamename": `${gamename}`,
    "creator": `${creator}`,
    "generateprompt": `${generateprompt}`,
    "modifyprompts": `${modifyprompts}`,
    "gamecode": `${gamecode}`
  };

  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Error saving game:', error);
    return "Failed to save!"
  }
}
