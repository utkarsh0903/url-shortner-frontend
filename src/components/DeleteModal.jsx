import React from "react";
import "../styles/deleteModal.css";
import close from "../assets/closeBlack.png";

const DeleteModal = ({
  setLinkDeleteModalOpen,
  linkDeleteModalOpen,
  finalDelete,
  setUserDeleteModalOpen,
  handleDelete
}) => {
  return (
    <div className="delete-overlay">
      <div className="delete-container" id="delete-modal">
        <img
          src={close}
          alt="close btn"
          className="close-btn"
          onClick={() => linkDeleteModalOpen ? setLinkDeleteModalOpen(false) : setUserDeleteModalOpen(false)}
        />
        <h2>
          {linkDeleteModalOpen
            ? "Are you sure, you want to remove it ?"
            : " Are you sure, you want to delete the account ? "}
        </h2>
        <div className="modal-btns">
          <button
            className="cancel-btn"
            onClick={() => linkDeleteModalOpen ? setLinkDeleteModalOpen(false) : setUserDeleteModalOpen(false)}
          >
            NO
          </button>
          <button
            className="done-btn"
            onClick={() => {
                linkDeleteModalOpen ? finalDelete() : handleDelete() ;
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
