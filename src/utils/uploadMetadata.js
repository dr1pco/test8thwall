import axios from 'axios';

export default async function uploadMetadata(userwalletaddress) {
  const url = "https://api.r3x.tech/game/upload-game-nft-metadata";
  const headers = {
    "Content-Type": "application/json"
  };

  const data = {
    "userwalletaddress": `${userwalletaddress}`,
    "gamename": `Cubs PitchAR Game`,
    "gamedescription": `Pitch baseballs win tickets`,
    "imageuri": `https://gold-increasing-bonobo-965.mypinata.cloud/ipfs/QmfErEuJgkLkr3XUYtVXujsy8WWKwm7ms3PMcXuSKbW776?_gl=1*t9vdqf*_ga*MzkzZmJjMTctYjc3Ni00YWNkLTlmYjktN2VlZDBhNzJjYWFh*_ga_5RMPXG14TE*MTY5MTk1OTQ4Mi40LjEuMTY5MTk1OTU4Ni4zNS4wLjA.`,
    "gamelink": `https://test8thwall.vercel.app/`
  };

  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.log('error', error);
    return "Failed to upload metadata!";
  }
}