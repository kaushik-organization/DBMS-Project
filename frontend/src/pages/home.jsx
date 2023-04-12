import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/verify-user`).then((res) => {
      if (res.data.Status === "success") {
        setAuth(true);
        setName(res.data.name);
      } else {
        setAuth(false);
        setMessage(res.data.Error);
      }
    });
  }, []);
  return (
    <div className="">
      {auth ? (
        <div>
          <h3>You are authorized {name}</h3>
          <button>Logout</button>
        </div>
      ) : (
        <div>
          <h3>{message}</h3>
          <h3>Login now</h3>
          <Link to="/auth0/login">Login</Link>
        </div>
      )}
    </div>
  );
}
