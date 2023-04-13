import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import StoreBar from "../components/StoreBar";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { ClipLoader } from "react-spinners";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export default function BookDetails() {
  const { bookId } = useParams();
  const [details, setDetails] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [basketId, setBasketId] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/book/${bookId}`)
      .then((res) => {
        setDetails(res.data);
        setLoading(false);
      });
  }, [bookId]);

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

  axios.defaults.withCredentials = true;
  useEffect(() => {
    if (details) {
      // console.log(details?.genres);
      const arr = details?.genres?.split(",");
      axios
        .post("https://book-recommendation-mten.onrender.com/recommend", {
          genres: arr,
          num: 6,
        })
        .then((res) => {
          const formData = new FormData();
          // console.log(res.data);
          formData.append(
            "book_id",
            JSON.stringify(Object.values(res.data.book_id))
          );
          axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/get-books-id`, formData)
            .then((res) => setRecommendations(res.data.data));
        });
    }
  }, [details, bookId]);

  return (
    <div className="theme-font flex flex-col gap-2 w-full h-screen bg-zinc-900 theme-font text-white overflow-hidden">
      <StoreBar />
      {loading == false ? (
        <div className="flex-1 p-4 px-10 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-[#222]">
          <div className="flex gap-10">
            <div className="w-60 h-fit">
              <img
                src={details?.image}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col gap-5">
              <h1 className="text-5xl font-extrabold">{details?.title}</h1>
              <div className="text-neutral-300 flex-1">
                {details?.description}
              </div>
              <div className="flex gap-2 items-center">
                <Rating
                  style={{ maxWidth: 250 }}
                  value={details?.rating}
                  readOnly
                />
                <span className="text-neutral-400">{details?.rating}/5.0</span>
              </div>
              {cart?.filter((e) => e.book_id === details.book_id).length > 0 ? (
                <div className="flex items-center">
                  <div className="p-2 w-[50px] bg-blue-600 flex justify-center rounded-l-sm">
                    <AiOutlineMinus className="w-6 h-6 text-black" />
                  </div>
                  <button className="bg-white px-10 p-2 min-w-[250px] w-fit text-black">
                    Quantity{" "}
                    {cart.filter((e) => e.book_id === details.book_id)[0].count}
                  </button>
                  <div className="p-2 w-[50px] bg-blue-600 flex justify-center rounded-r-sm">
                    <AiOutlinePlus className="w-6 h-6 text-black" />
                  </div>
                </div>
              ) : (
                <button className="bg-blue-600 px-10 p-2 min-w-[350px] w-fit">
                  Add to Cart
                </button>
              )}
            </div>
          </div>
          <h1 className="text-xl py-8">Recommended for you</h1>
          <div className="flex flex-wrap gap-6 h-[360px] overflow-hidden">
            {recommendations.map((item, index) => (
              <Link
                key={index}
                reloadDocument
                to={`/book/${item.book_id}`}
                className="p-2 w-44 h-fit flex flex-col gap-1 hover:bg-neutral-800 cursor-pointer"
              >
                <div className="w-40 h-[250px]">
                  <img
                    src={item.image}
                    className="w-full h-full object-cover"
                  />
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
          <div className="h-32" />
        </div>
      ) : (
        <ClipLoader className="w-6 h-6 m-auto" color="white" />
      )}
    </div>
  );
}
