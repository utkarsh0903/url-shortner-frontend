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
  linkId,
}) => {
  const [isSliderOn, setIsSliderOn] = useState(false);
  const [inputData, setInputData] = useState({
    originalLink: "",
    remarks: "",
    expiryDate: "",
  });
  const [changedURL, setChangedURL] = useState({
    originalLink: "",
    remarks: "",
    expiryDate: "",
    linkId: "",
  });

  useEffect(() => {
    if (isEditModalOpen) {
      handleEdit();
    }
  }, []);

  const handleEdit = () => {
    setIsSliderOn(true);
    let expiryFormat = "";
    if (expiryDate) {
      const date = new Date(expiryDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      expiryFormat = `${year}-${month}-${day}`;
    }
    setChangedURL({
      originalLink: originalURL,
      remarks: remarks,
      expiryDate: expiryFormat,
      linkId: linkId,
    });
  };

  const handleSlider = () => {
    console.log(isSliderOn);
    if (isEditModalOpen) {
      setIsSliderOn(false);
    } else {
      setIsSliderOn(!isSliderOn);
    }
    console.log(isSliderOn);
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
    setIsSliderOn(false);
    if (isCreateLinkModalOpen) {
      setInputData({
        originalLink: "",
        remarks: "",
        expiryDate: "",
      });
    } else {
      setChangedURL({
        originalLink: "",
        remarks: "",
        expiryDate: "",
        linkId: linkId,
      });
    }
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
            value={
              isCreateLinkModalOpen
                ? inputData.originalLink
                : changedURL.originalLink
            }
            onChange={(e) =>
              isCreateLinkModalOpen
                ? setInputData({
                    ...inputData,
                    originalLink: e.target.value,
                  })
                : setChangedURL({
                    ...changedURL,
                    originalLink: e.target.value,
                    linkId: linkId,
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
            value={
              isCreateLinkModalOpen ? inputData.remarks : changedURL.remarks
            }
            onChange={(e) =>
              isCreateLinkModalOpen
                ? setInputData({ ...inputData, remarks: e.target.value })
                : setChangedURL({ ...changedURL, remarks: e.target.value })
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
                onChange={() => handleSlider()}
              />
              <label htmlFor="active-slider" className="move-slider"></label>
            </div>
          </div>
          {isSliderOn && (
            <input
              type="date"
              name="expiryDate"
              value={
                isCreateLinkModalOpen
                  ? inputData.expiryDate
                  : changedURL.expiryDate
              }
              onChange={(e) =>
                isCreateLinkModalOpen
                  ? setInputData({ ...inputData, expiryDate: e.target.value })
                  : setChangedURL({ ...changedURL, expiryDate: e.target.value })
              }
            />
          )}
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
