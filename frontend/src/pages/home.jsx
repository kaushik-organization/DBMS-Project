import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiFillAppstore,
  AiOutlineShoppingCart,
  AiOutlineTwitter,
} from "react-icons/ai";
import { FaStore } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/user";
import BooksHome from "../components/BooksHome";
import {
  basketCost,
  basketDiscountCost,
  basketState,
} from "../../atoms/basket";

export default function Home() {
  const [user, setUser] = useRecoilState(userState);
  const [basket, setBasket] = useRecoilState(basketState);
  const [totalCost, setTotalCost] = useRecoilState(basketCost);
  const [discountCost, setDiscountCost] = useRecoilState(basketDiscountCost);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/verify-user`).then((res) => {
      if (res.data.Status === "success") {
        const data = {
          user_id: res.data.user_id,
          name: res.data.name,
          profile_pic: res.data.profile_pic,
          basket_id: res.data.basket_id,
          auth: true,
        };
        setUser(data);
        axios
          .get(
            `${import.meta.env.VITE_BACKEND_URL}/booksInbasket/${
              res.data.basket_id
            }`
          )
          .then((res) => {
            setBasket(res.data?.data);
            setTotalCost(res.data.totalCost);
            setDiscountCost(res.data.discountCost);
          });
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
      <div className="w-full h-[600px] overflow-hidden ">
        <div className="flex gap-6 w-full justify-between items-center absolute p-4 px-10 py-6 text-black bg-black/10 z-10 text-xl font-semibold theme-font">
          <div className="w-44">
            <img
              src="bookstore-logo/png/logo-no-background.png"
              className="brightness-200"
            />
          </div>
          {/* <ul className="flex gap-6 text-black/80 items-center">
            <li>
              <AiFillAppstore className="w-8 h-8" />
            </li>
            <Link to={"/store"}>
              <li>Store</li>
            </Link>
            <li>Contact</li>
            <li>
              <AiOutlineTwitter className="w-8 h-8" />
            </li>
          </ul> */}
          <div className="flex items-center gap-3">
            {user?.auth ? (
              <>
                <p className="text-center leading-3">
                  <span className="text-neutral-500 text-sm">
                    Good {greeting()},{" "}
                  </span>
                  <br />
                  {user?.name}
                </p>
                <Link to={`/account/${user?.user_id.toLowerCase()}/cart`}>
                  <div className="relative">
                    <AiOutlineShoppingCart className="w-8 h-8 text-blue-600" />
                    <div className="absolute w-3.5 h-3.5 bg-red-600/90 rounded-full top-0 right-0 text-xs flex items-center justify-center text-zinc-300">
                      {basket?.length || 0}
                    </div>
                  </div>
                </Link>
                <Link to={`/account/${user?.user_id.toLowerCase()}/profile`}>
                  <div className="w-10 aspect-square rounded-full flex justify-center items-center p-[2px] border border-neutral-500 cursor-pointer">
                    <img
                      src={user?.profile_pic}
                      className="object-cover w-full h-full rounded-full shrink-0"
                    />
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/auth0/login"
                  className="bg-fuchsia-600 text-white shadow-2xl px-6 p-1 rounded-sm font-semibold mt-2"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex w-full h-full bg-[#fbdead] pb-10">
          <div className="w-1/2 flex flex-col gap-10 justify-center mt-20 pl-14 shrink-0 font-extrabold relative text-7xl theme-font">
            <div className="w-60 h-60 ml-[1000px] border border-black z-10 absolute header-gradient-color" />
            <div className="w-60 h-60 mt-40 ml-80 border border-black z-10 absolute header-gradient-color" />
            <p className="relative">
              <span className="text-fuchsia-600">A place</span> where <br />
              world unite to collide
            </p>
            <Link
              to={"/store"}
              className="bg-fuchsia-600 px-16 p-3 text-white flex items-center gap-3 flex-row-reverse text-semibold text-2xl font-semibold w-fit rounded-sm"
            >
              Check out the store <FaStore className="w-6 h-6" />
            </Link>
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
        <BooksHome />
      </div>
    </div>
  );
}
