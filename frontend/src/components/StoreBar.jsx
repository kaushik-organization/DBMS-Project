import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function StoreBar() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/verify-user`).then((res) => {
      if (res.data.Status === "success") {
        setAuth(true);
        setName(res.data?.name);
        setPhoto(res.data?.profile_pic);
      } else {
        setAuth(false);
        setMessage(res.data?.Error);
      }
    });
  }, []);

  const greeting = () => {
    let today = new Date();
    let curHr = today.getHours();
    if (curHr < 12) {
      return "morning";
    } else if (curHr < 18) {
      return "afternoon";
    } else {
      return "evening";
    }
  };

  return (
    <div className="w-full py-3 px-4 flex justify-between gap-2 items-center">
      <img
        src="/bookstore-logo/png/logo-no-background.png"
        className="w-40 invert mix-blend-luminosity"
      />
      <div className="flex-1 flex mx-20 items-center">
        <input
          type={"text"}
          className="flex-1 bg-transparent border border-gray-600 p-2 rounded-l-sm outline-none focus:border-gray-300"
          placeholder="Search..."
        />
        <button className="p-2 px-6 border border-blue-700 bg-blue-700 rounded-r-sm">
          <AiOutlineSearch className="w-6 h-6" />
        </button>
      </div>
      <div className="flex items-center gap-3">
        {auth ? (
          <>
            <p className="text-center leading-3">
              <span className="text-neutral-500 text-sm">
                Good {greeting()},{" "}
              </span>
              <br />
              {name}
            </p>
            <AiOutlineShoppingCart className="w-8 h-8 text-blue-600" />
            <div className="w-10 aspect-square rounded-full overflow-hidden flex justify-center items-center p-1 border border-neutral-500 cursor-pointer">
              <img src={photo} className="object-cover rounded-full" />
            </div>
          </>
        ) : (
          <>
            <p className="text-center leading-3">
              <span className="text-neutral-500 text-sm">
                Good {greeting()},{" "}
              </span>
              <br />
              {"Stranger"}
            </p>
            <Link
              to="/auth0/login"
              className="bg-blue-600 px-6 p-1 rounded-sm font-semibold"
            >
              Sign In
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
