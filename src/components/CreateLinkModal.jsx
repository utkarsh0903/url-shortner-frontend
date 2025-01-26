import React, { useState } from "react";
import "../styles/createLinkModal.css";
import close from "../assets/close.png";
import { createShortLink } from "../services";

const CreateLinkModal = ({ setIsCreateLinkModalOpen }) => {
  const [isSliderOn, setIsSliderOn] = useState(false);
  const [inputData, setInputData] = useState({
    originalURL: "",
    remarks: "",
    expiryDate: "",
  });

  const handleSlider = () => {
    setIsSliderOn(!isSliderOn);
  };

  const handleCreate = async () => {
    console.log(inputData);
    const res = await createShortLink(inputData);
    if (res.status === 200) {
      const data = await res.json(res);
      alert(data.message);
      setIsCreateLinkModalOpen(false);
    } else {
      const data = await res.json(res);
      alert(data.message);
    }
  };

  const handleClear = () => {
    setIsSliderOn(false);
    setInputData({
      originalURL: "",
      remarks: "",
      expiryDate: "",
    });
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
          <input
            type="text"
            placeholder="https://web.whatsapp.com/"
            name="originalURL"
            value={inputData.originalURL}
            onChange={(e) =>
              setInputData({
                ...inputData,
                [e.target.name]: String(e.target.value),
              })
            }
            required
          />
          <label htmlFor="">
            Remarks<span>*</span>
          </label>
          <textarea
            placeholder="Add remarks"
            name="remarks"
            value={inputData.remarks}
            onChange={(e) =>
              setInputData({
                ...inputData,
                [e.target.name]: String(e.target.value),
              })
            }
            required
          ></textarea>
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
          <input
            type="date"
            name="expiryDate"
            value={inputData.expiryDate}
            onChange={(e) =>
              setInputData({
                ...inputData,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>
        <div className="bottom-section">
          <button className="clear-btn" onClick={() => handleClear()}>
            Clear
          </button>
          <button className="create-link-btn" onClick={() => handleCreate()}>
            Create new
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateLinkModal;
