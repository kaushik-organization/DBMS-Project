import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Link, useSearchParams } from "react-router-dom";
import StoreBar from "../components/StoreBar";

export default function Store() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [basketId, setBasketId] = useState(null);
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    if (searchParams.get("search")) {
      axios
        .get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/search-booksName/${searchParams.get("search")}`
        )
        .then((res) => {
          setBooks(res.data.data);
        });
    } else {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/books/sorted`)
        .then((res) => {
          setBooks(res.data);
        });
    }
  }, []);

  const fetchCart = async () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/verify-user`).then((res) => {
      if (res.data.Status === "success") {
        setUserId(res.data.user_id);
        setBasketId(res.data.basket_id);
        axios
          .get(
            `${import.meta.env.VITE_BACKEND_URL}/booksInbasket/${
              res.data.basket_id
            }`
          )
          .then((res) => setCart(res.data?.data));
      }
    });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleAdd = async (e, book_id) => {
    try {
      e.stopPropagation();
      e.preventDefault();
      const formData = new FormData();
      formData.append("book_id", book_id);
      formData.append("user_id", userId);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/AddToCart`,
        formData
      );
      if (res.status === 209) {
        alert("Sorry! The book is not currently available");
      }
      if (res.status === 210) {
        alert("Currently unavailable");
      }
    } catch (err) {
      console.log(err);
    }
    fetchCart();
  };

  const handleRemove = async (e, book_id) => {
    try {
      e.stopPropagation();
      e.preventDefault();
      const formData = new FormData();
      formData.append("book_id", book_id);
      formData.append("user_id", userId);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/removeToCart`,
        formData
      );
    } catch (err) {
      console.log(err);
    }
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/booksInbasket/${basketId}`)
      .then((res) => setCart(res.data?.data));
  };

  return (
    <div className="flex flex-col gap-2 w-full h-screen bg-zinc-900 theme-font text-white">
      <StoreBar setBooks={setBooks} />
      <div className="w-full flex-1 flex overflow-hidden">
        <div className="w-[250px] shrink-0"></div>
        <div className="flex-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-[#222] p-4 flex flex-wrap gap-6">
          {[...books].map((item, index) => (
            <Link
              key={index}
              to={`/book/${item.book_id}`}
              className="p-2 w-44 h-fit flex flex-col gap-1 hover:bg-neutral-800 cursor-pointer"
            >
              <div className="w-40 h-[250px]">
                <img src={item.image} className="w-full h-full object-cover" />
              </div>
              <div className="font-semibold truncate text-ellipsis">
                {item.title}
              </div>
              <div className="font-semibold flex-1 text-emerald-400 flex gap-3 items-end">
                <p>Rs. {item.price - (item.price * item.discount) / 100}</p>
                <s className="text-red-600">Rs. {item.price}</s>
              </div>
              {cart?.filter((e) => e.book_id === item.book_id).length > 0 ? (
                <div className="flex items-center h-8">
                  <div
                    className="p-1 px-1.5 h-full items-center bg-blue-600 flex justify-center rounded-l-sm"
                    onClick={(e) => handleRemove(e, item.book_id)}
                  >
                    <AiOutlineMinus className="w-4 h-4 text-black" />
                  </div>
                  <div className="text-center bg-white p-1 flex-1 w-fit text-black">
                    Quantity{" "}
                    {cart.filter((e) => e.book_id === item.book_id)[0].count}
                  </div>
                  <div
                    className="p-1 px-1.5 h-full items-center bg-blue-600 flex justify-center rounded-r-sm"
                    onClick={(e) => handleAdd(e, item.book_id)}
                  >
                    <AiOutlinePlus className="w-4 h-4 text-black" />
                  </div>
                </div>
              ) : (
                <button
                  className="bg-green-600 p-1 rounded-sm hover:bg-orange-600 transition-all"
                  onClick={(e) => handleAdd(e, item.book_id)}
                >
                  Add to Cart
                </button>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
