import React, { useEffect, useState } from "react";
import "../App.css";
import "../styles/register.css";
import { register } from "../services/index";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Register = () => {
  const navigate = useNavigate();

  //   useEffect(() => {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       navigate("/dashboard");
  //     }
  //   }, []);

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await register(registerData);
    if (res.status === 200) {
      alert("Registered successfully");
      navigate("/login");
      setRegisterData({
        username: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      const data = await res.json(res);
      alert(data.message);
    }
  };

  return (
    <div className="home-container">
      <div className="right-container">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
      </div>
      <div className="left-container">
        <div className="top-btns">
          <button>SignUp</button>
          <button>LogIn</button>
        </div>
        <div className="heading">
          <h2>Join us Today!</h2>
        </div>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="username"
            value={registerData.username}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                [e.target.name]: e.target.value,
              })
            }
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={registerData.email}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                [e.target.name]: e.target.value,
              })
            }
            placeholder="Email id"
            required
          />
          <input
            type="number"
            name="mobile"
            value={registerData.mobile}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                [e.target.name]: e.target.value,
              })
            }
            placeholder="Mobile no."
            required
          />
          <input
            type="password"
            name="password"
            value={registerData.password}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                [e.target.name]: e.target.value,
              })
            }
            placeholder="Password"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={registerData.confirmPassword}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                [e.target.name]: e.target.value,
              })
            }
            placeholder="Confirm Password"
            required
          />
          <button className="register-btn" type="submit">
            Register
          </button>
        </form>
        <div className="login-request">
          <p>
            Already have an account ?<Link to="/login"> Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
