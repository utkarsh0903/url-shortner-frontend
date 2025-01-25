import React from "react";
import "../styles/settings.css";

const Settings = () => {
  return (
    <div className="settings-container">
      <div className="edit-name">
        <label className="name-section" htmlFor="name">
          Name
        </label>
        <input type="text" />
      </div>
      <div className="edit-email">
        <label htmlFor="email">Email id</label>
        <input type="email" />
      </div>
      <div className="edit-mobile">
        <label htmlFor="mobile">Mobile no.</label>
        <input type="number" />
      </div>
      <button className="save-btn">Save Changes</button>
      <button className="delete-btn">Delete Account</button>
    </div>
  );
};

export default Settings;
