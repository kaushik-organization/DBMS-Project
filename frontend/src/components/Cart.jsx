import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Cart({ userId, basketId }) {
  const [basket, setBasket] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [discountCost, setDiscountCost] = useState(0);

  const fetchData = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/booksInbasket/${basketId}`
    );
    setBasket(res.data.data);
    setTotalCost(res.data.totalCost);
    setDiscountCost(res.data.discountCost);
  };
  useEffect(() => {
    fetchData();
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
    fetchData();
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
    fetchData();
  };

  const handlePurchase = async () => {
    const formData = new FormData();
    formData.append("basket_id", basketId);
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/purchaseBasket`,
      formData
    );
    if (res.status === 209) {
      alert(`${res.data.book_id} is not available`);
    }

    alert("Purchase Successful");
  };

  return (
    <>
      {basket && basket.length ? (
        <div className="flex flex-col w-full">
          <div className="w-full shadow-md p-6 bg-zinc-700/40 flex justify-between">
            <div className="">
              <p className="text-neutral-300">Total items: {basket?.length}</p>
              <h3 className="font-bold text-base">
                Total Price:{" "}
                <s className="text-red-600">
                  Rs. {parseFloat(totalCost).toFixed(2)}
                </s>
              </h3>
              <h2 className="font-extrabold text-xl flex items-center gap-2">
                Discounted Price:{" "}
                <span className="text-green-600">
                  Rs. {parseFloat(discountCost).toFixed(2)}
                </span>
                <span className="text-base font-normal text-neutral-400">
                  (
                  {(
                    (1 -
                      parseFloat(discountCost).toFixed(2) /
                        parseFloat(totalCost).toFixed(2)) *
                    100
                  ).toFixed(2)}
                  % discount)
                </span>
              </h2>
            </div>
            <div className="flex flex-col gap-2">
              <button
                className="bg-blue-600 px-10 py-2 rounded-sm"
                onClick={handlePurchase}
              >
                Purchase Now
              </button>
              <button className="bg-zinc-300 text-black px-10 py-2 rounded-sm">
                Clear
              </button>
            </div>
          </div>
          <div className="">
            {basket?.map((item, index) => (
              <div className="p-4 flex gap-4" key={index}>
                <div className="w-40 shrink-0">
                  <img
                    src={item.image}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-3xl font-semibold">{item.title}</p>
                  <div className="text-zinc-500 flex-1">{item.description}</div>
                  <div className="flex items-center cursor-pointer">
                    <div
                      className="p-2 w-[50px] bg-blue-600 flex justify-center rounded-l-sm"
                      onClick={(e) => handleRemove(e, item.book_id)}
                    >
                      <AiOutlineMinus className="w-6 h-6 text-black" />
                    </div>
                    <div className="text-center bg-white px-10 p-2 min-w-[150px] w-fit text-black">
                      Quantity {item.count}
                    </div>
                    <div
                      className="p-2 w-[50px] bg-blue-600 flex justify-center rounded-r-sm"
                      onClick={(e) => handleAdd(e, item.book_id)}
                    >
                      <AiOutlinePlus className="w-6 h-6 text-black" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 w-full h-full justify-center items-center">
          <p className="text-center text-zinc-400">
            You haven't added anything to your cart yet.
            <br />
            Add now and avail excessive discount
          </p>
          <Link to="/store" className="bg-orange-500 px-5 p-2">
            Go to Store
          </Link>
        </div>
      )}
    </>
  );
}
