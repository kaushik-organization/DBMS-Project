import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function StoreBar({ setBooks }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [userId, setUserId] = useState("");
  const [basketId, setBasketId] = useState("");
  const [search, setSearch] = useState("");
  axios.defaults.withCredentials = true;

  const [basket, setBasket] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [discountCost, setDiscountCost] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/store/?search=${searchParams.get("search")}`);
    if (searchParams.get("search")) {
      const formData = new FormData();
      formData.append("search", searchParams.get("search"));
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/filter`,
        formData
      );
      setBooks(res.data.data);
    } else {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/books/sorted`)
        .then((res) => {
          setBooks(res.data);
        });
    }
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/verify-user`).then((res) => {
      if (res.data.Status === "success") {
        setUserId(res.data?.user_id);
        setAuth(true);
        setName(res.data?.name);
        setBasketId(res.data.basket_id);
        setPhoto(res.data?.profile_pic);
        axios
          .get(
            `${import.meta.env.VITE_BACKEND_URL}/booksInbasket/${
              res.data.basket_id
            }`
          )
          .then((res) => {
            setBasket(res.data.data);
            setTotalCost(res.data.totalCost);
            setDiscountCost(res.data.discountCost);
          });
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

  const handleChange = (e) => {
    setSearchParams({ search: e.target.value });
  };

  return (
    <div className="w-full py-3 px-4 flex justify-between gap-2 items-center">
      <Link to={"/store"}>
        <img
          src="/bookstore-logo/png/logo-no-background.png"
          className="w-40 invert mix-blend-luminosity"
        />
      </Link>
      <div className="flex-1 flex mx-20 items-center">
        <form className="flex w-full" onSubmit={handleSubmit}>
          <input
            type={"text"}
            className="flex-1 bg-transparent border border-gray-600 p-2 rounded-l-sm outline-none focus:border-gray-300"
            placeholder="Search..."
            onChange={handleChange}
            value={searchParams.get("search") || ""}
          />
          <button className="p-2 px-6 border border-blue-700 bg-blue-700 rounded-r-sm">
            <AiOutlineSearch className="w-6 h-6" />
          </button>
        </form>
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
            <Link to={`/account/${userId.toLowerCase()}/cart`}>
              <div className="relative">
                <AiOutlineShoppingCart className="w-8 h-8 text-blue-600" />
                <div className="absolute w-3.5 h-3.5 bg-red-600/90 rounded-full top-0 right-0 text-xs flex items-center justify-center text-zinc-300">
                  {basket?.length || 0}
                </div>
              </div>
            </Link>
            <Link to={`/account/${userId.toLowerCase()}/profile`}>
              <div className="w-10 aspect-square rounded-full overflow-hidden flex justify-center items-center p-1 border border-neutral-500 cursor-pointer">
                <img src={photo} className="object-cover rounded-full" />
              </div>
            </Link>
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
