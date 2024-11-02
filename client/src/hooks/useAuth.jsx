import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function useRecruiterAuth() {
  const [rname, setRName] = useState("");
  const [emailRecruiter, setEmailRecruiter] = useState("");
  const [company, setCompany] = useState("");
  const [passwordRecruiter, setPasswordRecruiter] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLoginRecruiter(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:9000/recruiter/auth/login",
        { email: emailRecruiter, password: passwordRecruiter },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed! Please check your credentials.");
    }
  }

  async function handleSignupRecruiter(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:9000/recruiter/auth/signup",
        {
          recruitername: rname,
          company,
          email: emailRecruiter,
          password: passwordRecruiter,
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        setSuccess("Signup successful! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setError("Error occurred! Please check your credentials.");
    }
  }

  return {
    rname,
    setRName,
    emailRecruiter,
    setEmailRecruiter,
    company,
    setCompany,
    passwordRecruiter,
    setPasswordRecruiter,
    success,
    error,
    handleLoginRecruiter,
    handleSignupRecruiter,
  };
}

export function useUserAuth() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  async function handleSignupUser(e) {
    e.preventDefault();

    if (isNaN(age) || age < 0) {
      setError("Please enter a valid age.");
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:9000/user/auth/signup",
        {
          username,
          email,
          age,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        setSuccess("Signup successful! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setError("Error occurred! Please check your credentials.");
    }
  }

  async function handleLoginUser(e) {
    e.preventDefault();
    setError(""); 

    try {
      const response = await axios.post("http://localhost:9000/user/auth/login", {
        email,
        password,
      }, 
      {
        withCredentials: true,
      }
    );

      if (response.status === 200) {
        setSuccess("Signup successful! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setError("Login failed! Please check your credentials.");
    } 
  }

  return {
    username,
    setUsername,
    email,
    setEmail,
    age,
    setAge,
    password,
    setPassword,
    error,
    success,
    handleSignupUser,
    handleLoginUser
  };
}
