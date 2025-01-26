import React, { useState } from "react";
import "../styles/settings.css";
import { deleteUser, updateUser } from "../services";
import { useNavigate } from "react-router";

const Settings = ({ activeUser, setActiveUser, updateShortName }) => {
  const [userDetails, setUserDetails] = useState(activeUser);
  const [updatedFields, setUpdatedFields] = useState({});

  const navigate = useNavigate();

  const handleSave = async () => {
    let emailChanged = false;
    let nameChanged = false;

    if (userDetails.username !== activeUser.username) {
      updatedFields.username = userDetails.username;
      nameChanged = true;
    }
    if (userDetails.email !== activeUser.email) {
      updatedFields.email = userDetails.email;
      emailChanged = true;
    }
    if (userDetails.mobile !== activeUser.mobile) {
      updatedFields.mobile = userDetails.mobile;
    }

    if (Object.keys(updatedFields).length === 0) {
      alert("No changes detected.");
      return;
    }
    const res = await updateUser(updatedFields);
    if (res.status === 200) {
      console.log(nameChanged);
      if(nameChanged) updateShortName(updatedFields.username);
      if (emailChanged) {
        localStorage.clear("token");
        navigate("/login");
      }
      const data = await res.json(res);
      alert(data.message);
      setActiveUser(userDetails);
      setUpdatedFields({});
    } else {
      const data = await res.json(res);
      alert(data.message);
      setUserDetails(activeUser);
    }
  };

  const handleDelete = async () => {
    const res = await deleteUser();
    if (res.status === 200) {
      const data = await res.json(res);
      alert(data.message);
      localStorage.clear("token");
      navigate("/login");
    } else {
      const data = await res.json(res);
      alert(data.message);
      setUserDetails(activeUser);
    }
  };

  return (
    <div className="settings-container">
      <div className="edit-name">
        <label className="name-section" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          name="username"
          value={userDetails.username}
          onChange={(e) =>
            setUserDetails({
              ...userDetails,
              [e.target.name]: e.target.value,
            })
          }
        />
      </div>
      <div className="edit-email">
        <label htmlFor="email">Email id</label>
        <input
          type="email"
          name="email"
          value={userDetails.email}
          onChange={(e) =>
            setUserDetails({
              ...userDetails,
              [e.target.name]: e.target.value,
            })
          }
          required
        />
      </div>
      <div className="edit-mobile">
        <label htmlFor="mobile">Mobile no.</label>
        <input
          type="number"
          name="mobile"
          value={userDetails.mobile}
          onChange={(e) =>
            setUserDetails({
              ...userDetails,
              [e.target.name]: e.target.value,
            })
          }
        />
      </div>
      <button className="save-btn" onClick={() => handleSave()}>
        Save Changes
      </button>
      <button className="delete-btn" onClick={() => handleDelete()}>
        Delete Account
      </button>
    </div>
  );
};

export default Settings;
