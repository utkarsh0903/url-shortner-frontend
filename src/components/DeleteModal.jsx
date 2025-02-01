import React from "react";
import "../styles/deleteModal.css";
import close from "../assets/closeBlack.png";

const DeleteModal = ({ setLinkDeleteModalOpen, finalDelete }) => {
  return (
    <div className="delete-overlay">
      <div className="delete-container" id="delete-modal">
        <img
          src={close}
          alt="close btn"
          className="close-btn"
          onClick={() => setLinkDeleteModalOpen(false)}
        />
        <h2> Are you sure, you want to remove it ?</h2>
        <div className="modal-btns">
          <button
            className="cancel-btn"
            onClick={() => setLinkDeleteModalOpen(false)}
          >
            NO
          </button>
          <button
            className="done-btn"
            onClick={() => {
              finalDelete();
            }}
          >
            YES
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
