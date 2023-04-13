import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import StoreBar from "../components/StoreBar";

export default function Store() {
  const [books, setBooks] = useState([]);
  const [basketId, setBasketId] = useState(null);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/books/sorted`)
      .then((res) => {
        setBooks(res.data);
      });
  }, []);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/verify-user`).then((res) => {
      if (res.data.Status === "success") {
        setBasketId(res.data.basket_id);
        axios
          .get(
            `${import.meta.env.VITE_BACKEND_URL}/booksInbasket/${
              res.data.basket_id
            }`
          )
          .then((res) => setCart(res.data?.data));
      } else {
        setAuth(false);
        setMessage(res.data.Error);
      }
    });
  }, []);

  return (
    <div className="flex flex-col gap-2 w-full h-screen bg-zinc-900 theme-font text-white">
      <StoreBar />
      <div className="w-full flex-1 flex overflow-hidden">
        <div className="w-[250px] shrink-0"></div>
        <div className="flex-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-[#222] p-4 flex flex-wrap gap-6">
          {[...books, ...books, ...books, ...books].map((item, index) => (
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
                  <div className="p-1 px-1.5 h-full items-center bg-blue-600 flex justify-center rounded-l-sm">
                    <AiOutlineMinus className="w-4 h-4 text-black" />
                  </div>
                  <button className="bg-white p-1 flex-1 w-fit text-black">
                    Quantity{" "}
                    {cart.filter((e) => e.book_id === item.book_id)[0].count}
                  </button>
                  <div className="p-1 px-1.5 h-full items-center bg-blue-600 flex justify-center rounded-r-sm">
                    <AiOutlinePlus className="w-4 h-4 text-black" />
                  </div>
                </div>
              ) : (
                <button className="bg-green-600 p-1 rounded-sm hover:bg-orange-600 transition-all">
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
