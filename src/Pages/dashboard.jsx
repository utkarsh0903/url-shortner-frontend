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
import { useNavigate } from "react-router";
import blueDashboard from "../assets/blue-dashboard.png";
import blueLinks from "../assets/blue-links.png";
import blueAnalytics from "../assets/blue-analytics.png";
import blueSettings from "../assets/blue-settings.png";
import Data from "../components/Data";
import Links from "../components/Links";
import Analytics from "../components/Analytics";
import Settings from "../components/Settings";
import { getUser } from "../services";

const Dashboard = () => {
  const [showLogoutBtn, setShowLogoutBtn] = useState(false);
  const [activeUser, setActiveUser] = useState("");
  const [shortName, setShortName] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    showUserDetails();
  }, [activeUser]);

  const showUserDetails = async () => {
    const res = await getUser();
    if (res.status === 200) {
      const data = await res.json(res);
      setActiveUser(data);

      const name = data.username.trim().split(" ");

      const shortUsername =
        name.length >= 2
          ? name[0][0].toUpperCase() + name[1][0].toUpperCase()
          : name[0]?.[0]?.toUpperCase();
      setShortName(shortUsername);
    } else {
      const data = await res.json(res);
      alert(data.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear("token");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className=" left-navbar">
        <img className="logo" src={logo} alt="Logo" />
        <nav className="navbar">
          <ul>
            <li className={activeTab == "dashboard" ? "active" : ""}>
              <button onClick={() => setActiveTab("dashboard")}>
                <img
                  src={activeTab == "dashboard" ? blueDashboard : dashboardIcon}
                  alt="Dashboard Icon"
                />
                Dashboard
              </button>
            </li>
            <li className={activeTab == "links" ? "active" : ""}>
              <button onClick={() => setActiveTab("links")}>
                <img
                  src={activeTab == "links" ? blueLinks : linksIcon}
                  alt="Links Icon"
                />
                Links
              </button>
            </li>
            <li className={activeTab == "analytics" ? "active" : ""}>
              <button onClick={() => setActiveTab("analytics")}>
                <img
                  src={activeTab == "analytics" ? blueAnalytics : analyticsIcon}
                  alt="Analytics Icon"
                />
                Analytics
              </button>
            </li>
          </ul>
        </nav>
        <div className="settings-btn">
          <div className={activeTab == "settings" ? "active-tab " : ""}>
            <button onClick={() => setActiveTab("settings")}>
              <img
                src={activeTab == "settings" ? blueSettings : settingsIcon}
                alt="Settings Icon"
              />
              Settings
            </button>
          </div>
        </div>
      </div>
      <div className="content-section">
        <div className="top-navbar">
          <div className="hello-message">
            <img src={sun} alt="sun" />
            <div className="current-data">
              <p>Good morning, {activeUser.username}</p>
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
            <div className="name-initials">
              <button
                className="profile-btn"
                onClick={() => setShowLogoutBtn(!showLogoutBtn)}
              >
                {shortName}
              </button>
              {showLogoutBtn && (
                <div className="dropdown-content">
                  <button className="logout-btn" onClick={() => handleLogout()}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="hero-section">
          {activeTab == "dashboard" && <Data />}
          {activeTab == "links" && <Links />}
          {activeTab == "analytics" && <Analytics />}
          {activeTab == "settings" && (
            <Settings activeUser={activeUser} setActiveUser={setActiveUser} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
