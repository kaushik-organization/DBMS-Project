import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BooksHome() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-books`).then((res) => {
      setBooks(res.data.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="h-screen bg-gray-800 relative mt-20 flex flex-col items-center">
      <div className="flex flex-wrap h-[385px] overflow-hidden absolute -mt-8 justify-around m-auto gap-3 w-[80%] ">
        {!loading &&
          books.map((item, index) => (
            <div
              key={index}
              className="bg-[#f4ecd5] border  px-2 py-2 pb-2  w-60 rounded-md"
            >
              <div className="w-full h-[300px]">
                {" "}
                <img
                  src={item.image}
                  alt=""
                  className=" object-top  object-cover w-full h-full rounded-md"
                />
              </div>
              <p className=" font-bold font-mono line-clamp-2 mt-2 text-center theme-font text-lg">
                {item.title}
              </p>
            </div>
          ))}
        {loading &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
            <div
              key={item}
              className="bg-gray-500 animate-pulse px-2 py-2 pb-2 w-60 rounded-md"
            >
              <div className="w-full h-[360px]"></div>
            </div>
          ))}
      </div>
      <div className="text-center pt-[390px]">
        <h1 className="text-7xl text-white theme-font font-bold">
          There's no such
          <br />
          thing as too many books
          <br />
          in your life
        </h1>
      </div>
    </div>
  );
}
