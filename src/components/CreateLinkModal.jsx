import React, { useEffect, useState } from "react";
import "../styles/createLinkModal.css";
import close from "../assets/close.png";
import { createShortLink, updateLink } from "../services";

const CreateLinkModal = ({
  setIsCreateLinkModalOpen,
  setNewLinkAdded,
  setIsEditModalOpen,
  isEditModalOpen,
  isCreateLinkModalOpen,
  originalURL,
  remarks,
  expiryDate,
  linkId
}) => {
  const [isSliderOn, setIsSliderOn] = useState(false);
  const [inputData, setInputData] = useState({
    originalLink: "",
    remarks: "",
    expiryDate: "",
  });
  const [changedURL, setChangedURL] = useState({
    originalLink: "",
    linkId: ""
  })

  useEffect(() => {
    if (isEditModalOpen) {
      handleEdit();
    }
  }, []);

  const handleEdit = () => {
    if (expiryDate) {
      const date = new Date(expiryDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      expiryDate = `${year}-${month}-${day}`;
    }
    setInputData({
      originalLink: originalURL,
      remarks: remarks,
      expiryDate: expiryDate || "",
    });
    setChangedURL({
        originalLink: originalURL
    })
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
      originalLink: "",
      remarks: isCreateLinkModalOpen &&  "",
      expiryDate: isCreateLinkModalOpen && "",
    });
  };

  const handleSave = async () => {
    const res = await updateLink(changedURL);
    if (res.status === 200) {
      const data = await res.json(res);
      alert(data.message);
      setIsEditModalOpen(false);
      setNewLinkAdded(true);
    } else {
      const data = await res.json(res);
      alert(data.message);
    }
  };

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
            name="originalLink"
            value={isCreateLinkModalOpen ? inputData.originalLink : changedURL.originalLink}
            onChange={(e) =>
              isCreateLinkModalOpen ? setInputData({
                ...inputData,
                [e.target.name]: String(e.target.value),
              }) : 
              setChangedURL({
                originalLink: e.target.value,
                linkId: linkId
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
