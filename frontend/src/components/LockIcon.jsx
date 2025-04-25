import React from 'react';
import "../styles/LockIcon.css";
import LockImg from "../assets/LockIcon.png";

function LockIcon() {
  return (
    <div className="lock-icon-container">
      <img src={LockImg} alt="Candado" className="lock-image" />
    </div>
  );
}

export default LockIcon;