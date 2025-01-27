import React, { useEffect, useState } from "react";
import "../styles/createLinkModal.css";
import close from "../assets/close.png";
import { createShortLink } from "../services";

const CreateLinkModal = ({
  setIsCreateLinkModalOpen,
  setNewLinkAdded,
  setIsEditModalOpen,
  isEditModalOpen,
  isCreateLinkModalOpen,
  originalLink,
  remarks,
  expiryDate,
}) => {
  const [isSliderOn, setIsSliderOn] = useState(false);
  const [inputData, setInputData] = useState({
    originalURL: "",
    remarks: "",
    expiryDate: "",
  });

  useEffect(() => {
    if (isEditModalOpen) {
      handleEdit();
    }
  }, []);

  const handleEdit = () => {
    if (expiryDate) {
      const date = new Date(expiryDate);
      const year = date.getFullYear();
      console.log(year);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      console.log(month);
      const day = String(date.getDate()).padStart(2, "0");
      console.log(day);

      expiryDate = `${year}-${month}-${day}`;
    }
    setInputData({
      originalURL: originalLink,
      remarks: remarks,
      expiryDate: expiryDate || "",
    });
    setIsSliderOn(!!expiryDate);
  };

  const handleSlider = () => {
    setIsSliderOn(!isSliderOn);
  };

  const handleCreate = async () => {
    const res = await createShortLink(inputData);
    if (res.status === 200) {
      const data = await res.json(res);
      alert(data.message);
      setIsCreateLinkModalOpen(false);
      setNewLinkAdded(true);
    } else {
      const data = await res.json(res);
      alert(data.message);
    }
  };

  const handleClear = () => {
    isCreateLinkModalOpen && setIsSliderOn(false);
    setInputData({
      originalURL: "",
      remarks: isCreateLinkModalOpen &&  "",
      expiryDate: isCreateLinkModalOpen && "",
    });
  };

  const handleSave = () => {};

  return (
    <div className="overlay">
      <div className="container">
        <div className="top-section">
          <h2>{isCreateLinkModalOpen ? "New Link" : "Edit Link"}</h2>
          <img
            src={close}
            alt="Close"
            onClick={() =>
              isCreateLinkModalOpen
                ? setIsCreateLinkModalOpen(false)
                : setIsEditModalOpen(false)
            }
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
            disabled={isEditModalOpen}
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
          {isSliderOn && <input
            type="date"
            name="expiryDate"
            value={inputData.expiryDate}
            disabled={isEditModalOpen}
            onChange={(e) =>
              setInputData({
                ...inputData,
                [e.target.name]: e.target.value,
              })
            }
          />}
        </div>
        <div className="bottom-section">
          <button className="clear-btn" onClick={() => handleClear()}>
            Clear
          </button>
          <button
            className="create-link-btn"
            onClick={() =>
              isCreateLinkModalOpen ? handleCreate() : handleSave()
            }
          >
            {isCreateLinkModalOpen ? "Create new" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateLinkModal;
