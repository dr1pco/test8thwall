import React, { useState } from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import styles from "./Popup.module.css";

export default function Popup({ tiplinkurl, tiplinkaddress }) {
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const handleOpenTipLink = () => {
    window.open(tiplinkurl);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const explorerUrl = `https://explorer.solana.com/address/${tiplinkaddress}?cluster=devnet`;

  return (
    <Modal open={true} onClose={() => {}}>
      <ModalDialog variant="plain" sx={{ borderRadius: 0, width: 425}}>
        <p className={styles.p}>YOU WON A TICKET!</p>
        <p className={styles.p2}>MINT ADDRESS: </p>
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.a}
          >
            {tiplinkaddress}
          </a>
        <Button
          color="neutral"
          onClick={handleOpenTipLink}
          sx={{
            marginTop: "10px",
            borderRadius: 0,
            backgroundColor: "#00BF63",
            color: "white",
            fontWeight: 800,
            "&:hover": {
              backgroundColor: "#00BF63",
            },
          }}
        >
          CLAIM 
        </Button>
        <Button
          onClick={handleRefresh}
          sx={{
            marginTop: "60px",
            borderRadius: 0,
            backgroundColor: "#FF3131",
            border: "3px solid #FF3131",
            color: "white",
            fontWeight: 800,
            fontSize: "14px",
            "&:hover": {
              backgroundColor: "#FF3131",
            },
          }}
        >
          PLAY AGAIN
        </Button>
        <p className={styles.p3}>
            WARNING: NOT CLAIMING YOUR TICKET BEFORE PLAYING THE GAME AGAIN MAY RESULT IN
            LOSING YOUR TIVKE{" "}
          </p>

      </ModalDialog>
    </Modal>
  );
}
