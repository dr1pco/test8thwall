import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { Web3AuthCore } from "@web3auth/core";
import {
  WALLET_ADAPTERS,
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
} from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import RPC from "./solanaRPC";
import "./App.css";
import Auth from "./Auth";
import logo from './assets/pitchartext.svg';
import Popup from "./Popup";



import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react";
import createTiplink from "./utils/createTiplink";
import uploadMetadata from "./utils/uploadMetadata";
import prepareTipLink from "./utils/prepareTiplik";
import mintGameNft from "./utils/mintGameNft";

function App() {
  // const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [web3auth, setWeb3auth] = useState<Web3AuthCore | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const [currentWallet, setCurrentWallet] = useState<String | null>(null);
  const [dynamicStatus, setDynamicStatus] = useState(false);
  const [mr, setMR] = useState(false);

  const [gameInput, setGameInput] = useState("");
  const [savedGameInput, setSavedGameInput] = useState("");
  const [modifiedInput, setModifiedInput] = useState("");
  const [savedModifiedInput, setSavedModifiedInput] = useState([]);
  const [gameResult, setGameResult] = useState("");
  const [modifiedGameResult, setModifiedGameResult] = useState("");
  const [result, setResult] = useState("");
  const [currentGameName, setCurrentGameName] = useState("");
  const [currentGameMintAddress, setCurrentGameMintAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("base");
  const [tipLink, setTipLink] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showLink, setShowLink] = useState(true);
  const [earnedPoints, setEarnedPoints] = useState(0)
  const IFRAME_ID = "my-iframe"

  const [active, setActive] = useState(false)



  const {
    user,
    handleLogOut,
    setShowAuthFlow,
    showAuthFlow,
    walletConnector,
    authToken,
  } = useDynamicContext();

  useEffect(() => {
    if (user?.walletPublicKey != null) {
      setCurrentWallet(user.walletPublicKey);
      setDynamicStatus(true);
    }

    window.onmessage = function (e) {
      if (e.data == "hello") {
        alert("You won!");
        setMR(true);
      }
    };
  }, [user?.walletPublicKey]);

  // useEffect(() => {
  //   window.XRIFrame.registerXRIFrame(IFRAME_ID)
  //   return () => {
  //     window.XRIFrame.deregisterXRIFrame()
  //   }
  // }, [])


  // useEffect(() => {
  //   //iFrame to React communication handler
  //   const handler = (event: { detail: { coinPoints: number; }; }) => {
  //     let pts = Math.min(event.detail.coinPoints * 100, 4500)
  //     console.log("react coinPoints", event.detail.coinPoints)
  //     setEarnedPoints(pts)
  //   }

  //   //iFrame to React communication event listener
  //   window.addEventListener("points", handler)

  //   //iFrame to React communication handler cleanup
  //   return () => {
  //     window.removeEventListener("points", handler)
  //   }
  // }, [])

  async function mint() {
    try {
      setLoading(true);

      const currentGameDescription = `${currentGameName}`;
      const currentImageUri =
        "https://gateway.pinata.cloud/ipfs/QmR8BTfXhX2FSi3xESHJoPsQbm4nkVUjpzydAEV6Ys8C2g?_gl=1*1hwri3c*rs_ga*MzkzZmJjMTctYjc3Ni00YWNkLTlmYjktN2VlZDBhNzJjYWFh*rs_ga_5RMPXG14TE*MTY4NjY3MzcwMi4xMS4wLjE2ODY2NzM3MDkuNTMuMC4w";

      const tpres = await createTiplink();
      console.log("Wallet address: " + tpres.pk);
      const currentUserWallet = await tpres.pk;
      setTipLink(tpres.tiplinkurl);

      const umres = await uploadMetadata(
        currentUserWallet
      );
      if (umres == "Failed to upload metadata!") {
        throw new Error("Error 100: Failed to save game. Please try again!");
      }
      console.log("Metadata URI: " + umres.metadataUri);
      const currentMetadataUri = await umres.metadataUri;

      if (!currentUserWallet) {
        throw new Error("Error 101: Failed to save game. Please try again!");
      }
      const preres = await prepareTipLink(currentUserWallet);
      if (!preres.result) {
        throw new Error("Error 102: Failed to save game. Please try again!");
      }

      const mgnres = await mintGameNft(
        currentUserWallet,
        currentMetadataUri
      );
      if (mgnres == "Failed to mint!") {
        throw new Error("Error 103: Failed to save game. Please try again!");
      }
      console.log("Game minted: " + JSON.stringify(mgnres));
      const gameMintAddress = await mgnres.nftMintAddress;
      if (gameMintAddress) {
        setCurrentGameMintAddress(gameMintAddress);
        setLoading(false);
        setStatus("completed");
        setShowModal(true);
      } else {
        throw new Error("Error 104: Failed to save game. Please try again!");
      }
    } catch (error) {
      setLoading(false);
      setStatus("mint");
      console.error(error);
      alert('Failed to mint!');
    }
  }

  async function handleSaveCreation(event: { preventDefault: () => void; }) {
    event.preventDefault();
    setLoading(true);
    await mint();
    setLoading(false);
  }

  return (
    <div className="body">
      <div className="container">
        <img width='400px' height='75px' src={logo} alt="logo" />
        {/* <div className="loading-text">POINTS: {earnedPoints}</div> */}
        {mr ? (
          <div>
          </div>
        ) : (
          <div style={{
            display: "flex",
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <button onClick={handleSaveCreation} className="card" disabled={active}
            >
              Load My Ticket
            </button>

          </div>
        )}
        <div style={{
          display: "flex",
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {showModal && (
            <Popup
              tiplinkurl={tipLink}
              tiplinkaddress={currentGameMintAddress}
            />
          )}
        </div>
        <div className="eightwall">
          <iframe
            title="frame"
            className="iframe"
            src="https://pitchar.8thwall.app/cubs-game/"
            allow="camera;gyroscope;accelerometer;magnetometer;xr-spatial-tracking;microphone;geolocation;"
          />
        </div>
        <footer className="footer">
          {/* <a
            href="https://docs.google.com/document/d/1Lu1p_RpNh1k0RUjsf6GCjlygCdKE467NFNGUYCBnK1I/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>

          <a
            href="https://docs.google.com/document/d/1jgUsda3gG1w3JZJsCw6HVHUYsBcSnxvuDLJRabZy66o/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a> */}
        </footer>
      </div>
      {loading && (
        <div className="loading-overlay" style={{display: "flex", justifyContent: "column"}}>
          <div className="loading-indicator"></div>
          <div className="loading-text">LOADING</div>
        </div>
      )}
    </div>
  );
}

export default App;
