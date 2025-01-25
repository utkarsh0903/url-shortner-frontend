import React, { useEffect, useState } from "react";
import "../App.css";
import "../styles/login.css";
import { login } from "../services";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import halfBg from "../assets/half-bg.png";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login(loginData);
    if (res.status === 200) {
      const data = await res.json(res.token);
      localStorage.setItem("token", data.token);
      alert("Login successfully");
      navigate("/dashboard");
      setLoginData({
        email: "",
        password: "",
      });
    } else {
      const data = await res.json(res);
      console.log(data);
      alert(data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="left-container">
        <img className="logo" src={logo} alt="Logo" />
        <img className="half-bg" src={halfBg} alt="halfBg" />
      </div>
      <div className="right-container">
        <div className="top-btns">
          <button className="signup-btn btn">
            <Link to="/" className="signup-link">
              SignUp
            </Link>
          </button>
          <button className="login-btn btn">
            <Link to="/login" className="login-link">
              Login
            </Link>
          </button>
        </div>
        <div className="heading">
          <h2>Login</h2>
        </div>
        <form className="user-data" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                [e.target.name]: e.target.value,
              })
            }
            placeholder="Email id"
            required
          />
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                [e.target.name]: e.target.value,
              })
            }
            placeholder="Password"
            required
          />
          <button className="login-btn" type="submit">
            Login
          </button>
        </form>
        <div className="signup-request">
          <p>
            Don't have an account ?<Link to="/"> SignUp</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
