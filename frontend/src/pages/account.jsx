import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Cart from "../components/Cart";
import StoreBar from "../components/StoreBar";
import PageNotFound from "./pageNotFound";

export default function Account() {
  const { userId, options } = useParams();
  const [userid, setUserid] = useState("");
  const [basketId, setBasketId] = useState("");
  const [loading, setLoading] = useState(true);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/verify-user`).then((res) => {
      if (res.data.Status === "success") {
        setUserid(res.data.user_id);
        setBasketId(res.data.basket_id);
        setLoading(false);
      }
    });
  }, []);

  if (!["cart", "orders", "profile"].includes(options)) {
    return <PageNotFound />;
  }

  if (loading) {
    return (
      <div className="w-full h-screen bg-zinc-900 flex items-center justify-center">
        <ClipLoader color="white" size={40} />
      </div>
    );
  }

  if (!loading && userid.toLowerCase() !== userId) {
    // console.log(userId, userid);
    return <PageNotFound />;
  }

  return (
    <div className="theme-font flex flex-col gap-2 w-full h-screen bg-zinc-900 theme-font text-white">
      <StoreBar />
      <div className="flex w-full flex-1 border-t border-t-zinc-600 overflow-hidden">
        <div className="w-[250px] shrink-0 border-r border-zinc-600">
          <ul className="flex flex-col">
            <Link to={`/account/${userId.toLowerCase()}/cart`}>
              <li
                className={`py-4 px-6 border-b border-zinc-600 hover:bg-blue-600 transition-all delay-60 ${
                  options === "cart" ? "bg-blue-600" : ""
                }`}
              >
                Your Basket
              </li>
            </Link>
            <Link to={`/account/${userId.toLowerCase()}/orders`}>
              <li
                className={`py-4 px-6 border-b border-zinc-600 hover:bg-blue-600 transition-all delay-60 ${
                  options === "orders" ? "bg-blue-600" : ""
                }`}
              >
                Your Orders
              </li>
            </Link>
            <Link to={`/account/${userId.toLowerCase()}/profile`}>
              <li className="py-4 px-6 border-b border-zinc-600 hover:bg-blue-600 transition-all delay-60">
                Your Profile
              </li>
            </Link>
          </ul>
        </div>
        <div className="w-full overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-[#222]">
          {
            {
              cart: <Cart userId={userid} basketId={basketId} />,
              orders: <div>Orders</div>,
              profile: <div>Profile</div>,
            }[options]
          }
        </div>
      </div>
    </div>
  );
}
