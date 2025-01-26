import React, { useState } from "react";
import "../styles/createLinkModal.css";
import close from "../assets/close.png";

const CreateLinkModal = ({ setIsCreateLinkModalOpen }) => {
  const [isSliderOn, setIsSliderOn] = useState(false);

  const handleSlider = () => {
    setIsSliderOn(!isSliderOn);
    console.log(isSliderOn ? "Slider is OFF" : "Slider is ON");
  };
  return (
    <div className="overlay">
      <div className="container">
        <div className="top-section">
          <h2>New Link</h2>
          <img
            src={close}
            alt="Close"
            onClick={() => setIsCreateLinkModalOpen(false)}
          />
        </div>
        <div className="add-new-section">
          <label htmlFor="">
            Destination Url<span>*</span>
          </label>
          <input type="text" placeholder="https://web.whatsapp.com/" required />
          <label htmlFor="">
            Remarks<span>*</span>
          </label>
          <textarea name="" id="" placeholder="Add remarks" required></textarea>
          <div className="link-expiry-slider">
            <label htmlFor="" className="link-expiration">
              Link Expiration
            </label>
            <div className="link-slider">
              <input
                type="checkbox"
                id="active-slider"
                className="change-slider"
                checked={isSliderOn}
                onChange={handleSlider}
              />
              <label htmlFor="active-slider" className="move-slider"></label>
            </div>
          </div>
          <input type="date" />
        </div>
        <div className="bottom-section">
          <button className="clear-btn">Clear</button>
          <button className="create-link-btn">Create new</button>
        </div>
      </div>
    </div>
  );
};

export default CreateLinkModal;
