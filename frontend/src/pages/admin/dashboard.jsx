import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AES from "crypto-js/aes";
import CryptoJS from "crypto-js";

export default function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    const sessionValue = sessionStorage.getItem("session");
    if (!sessionValue) {
      navigate("/admin/login");
    }
    const hash = AES.decrypt(sessionValue, import.meta.env.VITE_SECRET_KEY);
    const [key, datetime] = hash.toString(CryptoJS.enc.Utf8).split("$");
    if (Date.now() - datetime >= 3600000) {
      sessionStorage.removeItem("session");
      navigate("/admin/login");
    }
  }, []);
  return <div>Dashboard</div>;
}
