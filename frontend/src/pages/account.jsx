import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useRecoilState, useResetRecoilState } from "recoil";
import {
  basketCost,
  basketDiscountCost,
  basketState,
} from "../../atoms/basket";
import { userState } from "../../atoms/user";
import Cart from "../components/Cart";
import Orders from "../components/Orders";
import Profile from "../components/Profile";
import StoreBar from "../components/StoreBar";
import PageNotFound from "./pageNotFound";

export default function Account() {
  const { userId, options } = useParams();
  const [userid, setUserid] = useState("");
  const [basketId, setBasketId] = useState("");
  const [loading, setLoading] = useState(false);

  const [useruser, setUserUser] = useRecoilState(userState);

  const navigate = useNavigate();
  const user = useResetRecoilState(userState);
  const basket = useResetRecoilState(basketState);
  const totalCost = useResetRecoilState(basketCost);
  const discountCost = useResetRecoilState(basketDiscountCost);
  const handleLogout = async () => {
    await axios.get(`${import.meta.env.VITE_BACKEND_URL}/logout`);
    user(), basket(), totalCost(), discountCost();
    navigate("/");
  };

  axios.defaults.withCredentials = true;
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/verify-user`)
      .then((res) => {
        if (res.data.Status === "success") {
          const data = {
            user_id: res.data.user_id,
            name: res.data.name,
            profile_pic: res.data.profile_pic,
            basket_id: res.data.basket_id,
            auth: true,
          };
          setUserUser(data);
          setUserid(res.data.user_id);
          setBasketId(res.data.basket_id);
        }
      })
      .finally(() => setLoading(false));
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
        <div className="w-[250px] flex flex-col shrink-0 border-r border-zinc-600">
          <ul className="flex flex-col flex-1">
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
              <li
                className={`py-4 px-6 border-b border-zinc-600 hover:bg-blue-600 transition-all delay-60 ${
                  options === "profile" ? "bg-blue-600" : ""
                }`}
              >
                Your Profile
              </li>
            </Link>
          </ul>
          <div
            className="flex justify-between cursor-pointer text-gray-500 items-center py-4 px-6 bg-gray-800/50"
            onClick={handleLogout}
          >
            Logout <FaExternalLinkAlt className="w-4 h-4" />
          </div>
        </div>
        <div className="w-full overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-[#222]">
          {
            {
              cart: <Cart userId={userid} basketId={basketId} />,
              orders: <Orders userId={userid} />,
              profile: <Profile userId={userid} />,
            }[options]
          }
        </div>
      </div>
    </div>
  );
}
