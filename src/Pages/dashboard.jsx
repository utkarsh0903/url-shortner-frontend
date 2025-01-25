import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import "../styles/dashboard.css";
import dashboardIcon from "../assets/dashboard-icon.png";
import linksIcon from "../assets/link-icon.png";
import analyticsIcon from "../assets/analytics-icon.png";
import settingsIcon from "../assets/settings-icon.png";
import sun from "../assets/sun.png";
import searchIcon from "../assets/search.png";
import plus from "../assets/plus.png";

const Dashboard = () => {

    const [showLogoutBtn, setShowLogoutBtn] = useState(false);

  return (
    <div className="dashboard-container">
      <div className=" left-navbar">
        <img className="logo" src={logo} alt="Logo" />
        <nav className="navbar">
          <ul>
            <li className="active">
              <button>
                <img src={dashboardIcon} alt="Dashboard Icon" />
                Dashboard
              </button>
            </li>
            <li>
              <button>
                <img src={linksIcon} alt="Links Icon" />
                Links
              </button>
            </li>
            <li>
              <button>
                <img src={analyticsIcon} alt="Analytics Icon" />
                Analytics
              </button>
            </li>
          </ul>
        </nav>
        <div className="settings-btn">
          <button>
            <img src={settingsIcon} alt="Settings Icon" />
            Settings
          </button>
        </div>
      </div>
      <div className="content-section">
        <div className="top-navbar">
          <div className="hello-message">
            <img src={sun} alt="sun" />
            <div className="current-data">
              <p>Good morning, Sujith</p>
              <p>Thu, Jan 25</p>
            </div>
          </div>

          <div className="navbar-info">
            <div className="create-new-btn">
              <button>
                <img src={plus} alt="Plus" />
                Create new
              </button>
            </div>
            <div className="search-input">
              <img src={searchIcon} alt="Search Icon" />
              <input
                type="text"
                name="search"
                placeholder="Search by links"
              ></input>
            </div>
            <div class="name-initials">
              <button className="profile-btn" onClick={() => setShowLogoutBtn(!showLogoutBtn)}>UG</button>
              { showLogoutBtn &&
                <div class="dropdown-content">
                  <button className="logout-btn">Logout</button>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="hero-section">
          <h2>Hero Section</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
