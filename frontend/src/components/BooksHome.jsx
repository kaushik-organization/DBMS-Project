import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

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

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `/store?search=${e.target.search.value}`;
    navigate(url);
  };

  return (
    <>
      <div className="bg-gray-800 relative mt-20 flex flex-col items-center">
        <div className="flex flex-wrap h-[385px] overflow-hidden absolute -mt-8 justify-around m-auto gap-3 w-[80%] ">
          {!loading &&
            books.map((item, index) => (
              <div
                key={index}
                className="bg-[#f4ecd5] border  px-2 py-2 pb-2  w-60 rounded-sm"
              >
                <div className="w-full h-[300px]">
                  {" "}
                  <img
                    src={item.image}
                    alt=""
                    className=" object-top  object-cover w-full h-full rounded-sm"
                  />
                </div>
                <p className=" font-bold line-clamp-2 mt-2 text-center theme-font text-xl">
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
          <h1 className="text-6xl text-white theme-font font-bold">
            There's no such
            <br />
            thing as too many books
            <br />
            in your life
          </h1>
        </div>
        <form className="my-10 w-full px-60 flex" onSubmit={handleSubmit}>
          <input
            type={"text"}
            name="search"
            autoComplete="off"
            className="flex-1 bg-transparent border-2 text-lg border-gray-600 text-white p-4 rounded-l-sm outline-none focus:border-gray-300"
            placeholder="Search..."
          />
          <button className="p-2 px-6 border border-blue-700 bg-blue-700 rounded-r-sm">
            <AiOutlineSearch className="w-6 h-6" />
          </button>
        </form>
      </div>
      <footer className="w-full px-10 py-5 text-white theme-font flex justify-between items-center bg-black">
        <img
          src="/bookstore-logo/png/logo-no-background.png"
          className="h-5 invert mix-blend-luminosity"
        />
        <div className="flex gap-5">
          <Link
            to="https://www.github.com/kaushik2107-bit"
            className="flex items-center gap-2"
          >
            <p className="">Kaushik Bhowmick</p>
            <FaGithub className="w-4 h-4" />
          </Link>
          <Link
            to="https://www.github.com/Rutvik-R"
            className="flex items-center gap-2"
          >
            <p className="">Rutvik Ranpariya</p>
            <FaGithub className="w-4 h-4" />
          </Link>
          <Link
            to="https://www.github.com/mahesh3536"
            className="flex items-center gap-2"
          >
            <p className="">Mahesh Thakkar</p>
            <FaGithub className="w-4 h-4" />
          </Link>
          <Link
            to="https://www.github.com/Hrishi1563"
            className="flex items-center gap-2"
          >
            <p className="">Hrishikesh Makwana</p>
            <FaGithub className="w-4 h-4" />
          </Link>
        </div>
      </footer>
    </>
  );
}
