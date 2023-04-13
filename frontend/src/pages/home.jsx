import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Books from "../components/Books-home";

export default function Home() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/verify-user`).then((res) => {
      if (res.data.Status === "success") {
        setAuth(true);
        setName(res.data.name);
        setPhoto(res.data.profile_pic);
      } else {
        setAuth(false);
        setMessage(res.data.Error);
      }
    });
  }, []);
  // return (
  //   <div className="">
  //     {auth ? (
  //       <div>
  //         <h3>You are authorized {name}</h3>
  //         <img src={photo} />
  //         <button>Logout</button>
  //       </div>
  //     ) : (
  //       <div>
  //         <h3>{message}</h3>
  //         <h3>Login now</h3>
  //         <Link to="/auth0/login">Login</Link>
  //       </div>
  //     )}
  //   </div>
  // );
  return (
    <div className="w-full overflow-auto">
      <div className="w-full h-[600px] overflow-hidden -z-10 ">
        <div className="flex gap-6 w-full justify-end absolute p-4 px-10 py-6  bg-transparent text-black text-xl font-semibold theme-font">
          <div>Shop</div>
          <div>Blog</div>
          <div>About Us</div>
          <div>
            <AiOutlineShoppingCart className="h-6 w-6" />
          </div>
        </div>
        <div className="flex w-full h-full bg-[#f9edd8] pb-10">
          <div className="w-1/2 flex items-center px-20 shrink-0 font-extrabold text-7xl theme-font">
            A place where <br />
            world collides
          </div>
          <div className="w-1/2 h-full">
          <img
            src="123456.png"
            alt=""
            className="shrink-0 object-contain w-full h-full scale-110"
          />
          </div>
        </div>
      </div>
      <div className=" w-full mt-[60px] text-center  theme-font font-extrabold text-8xl">
        <h1 className="text-6xl mt-">Bestsellers</h1>
      </div>
      <div>
        <Books />
      </div>
    </div>
  );
}
