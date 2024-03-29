import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import StoreBar from "../components/StoreBar";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { ClipLoader } from "react-spinners";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { userState } from "../../atoms/user";
import {
  basketCost,
  basketDiscountCost,
  basketState,
} from "../../atoms/basket";
import { useRecoilState } from "recoil";

export default function BookDetails() {
  const { bookId } = useParams();
  const [details, setDetails] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);

  const [user, setUser] = useRecoilState(userState);
  const [basket, setBasket] = useRecoilState(basketState);
  const [totalCost, setTotalCost] = useRecoilState(basketCost);
  const [discountCost, setDiscountCost] = useRecoilState(basketDiscountCost);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/book/${bookId}`)
      .then((res) => {
        setDetails(res.data);
        setLoading(false);
      });
  }, [bookId]);

  const fetchCart = async () => {
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
            setLoading(false);
            setLoading1(false);
          });

        axios
          .get(`${import.meta.env.VITE_BACKEND_URL}/reviews-BookId/${bookId}`)
          .then((res) => setReviews(res.data?.data));
      }
    });
  };

  useEffect(() => {
    fetchCart();
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

  const handleAdd = async (e, book_id) => {
    setLoading(true);
    e.stopPropagation();
    e.preventDefault();
    if (!user.auth) {
      const ans = confirm("You are not signed in. Do you want to?");
      if (ans) navigate("/auth0/login");
      setLoading(false);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("book_id", book_id);
      formData.append("user_id", user?.user_id);
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
    setLoading1(false);
  };

  const handleRemove = async (e, book_id) => {
    setLoading(true);
    try {
      e.stopPropagation();
      e.preventDefault();
      const formData = new FormData();
      formData.append("book_id", book_id);
      formData.append("user_id", user?.user_id);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/removeToCart`,
        formData
      );
    } catch (err) {
      console.log(err);
    }
    fetchCart();
    setLoading1(false);
  };

  return (
    <div className="overflow-y-scroll h-screen bg-zinc-900 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-[#222">
      <div class="relative">
        <img
          src={details?.image}
          alt="BannerImage"
          class="absolute h-[70vh] lg:h-[80vh] w-full object-cover object-right opacity-30 "
        />
        <div class="absolute bg-gradient-to-t from-zinc-900 via-transparent to-zinc-900 h-[70vh] lg:h-[80vh] w-full" />
      </div>
      <div className="text-white bg-zinc-900">
        <StoreBar />
      </div>
      <div className="theme-font flex flex-col gap-2 w-full h-screen bg-zinc-900 theme-font text-white">
        {loading == false ? (
          <div className="z-10 flex-1 p-4 px-10 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-[#222]">
            <div className="flex gap-10">
              <div className="w-60 h-fit">
                <img
                  src={details?.image}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col gap-5 w-full">
                <h1 className="text-5xl font-extrabold">{details?.title}</h1>
                <p className="text-neutral-300 line-clamp-[6]">
                  {details?.description}
                </p>
                <div className="font-semibold flex-1 text-emerald-400 text-3xl flex gap-3 items-end">
                  <p>
                    Rs.{" "}
                    {details.price - (details.price * details.discount) / 100}
                  </p>
                  <s className="text-red-600 text-xl">Rs. {details.price}</s>
                  <p className="text-gray-500 text-lg">
                    {details.discount}% discount
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <Rating
                    style={{ maxWidth: 250 }}
                    value={details?.rating}
                    readOnly
                  />
                  <span className="text-neutral-400">
                    {details?.rating}/5.0
                  </span>
                </div>
                {basket?.filter((e) => e.book_id === details.book_id).length >
                0 ? (
                  <div className="flex items-center cursor-pointer">
                    <div
                      className="p-2 w-[50px] bg-blue-600 flex justify-center rounded-l-sm"
                      onClick={(e) => handleRemove(e, details.book_id)}
                    >
                      <AiOutlineMinus className="w-6 h-6 text-black" />
                    </div>
                    <div className="text-center bg-white px-10 p-2 min-w-[250px] w-fit text-black">
                      Quantity{" "}
                      {
                        basket.filter((e) => e.book_id === details.book_id)[0]
                          .count
                      }
                    </div>
                    <div
                      className="p-2 w-[50px] bg-blue-600 flex justify-center rounded-r-sm"
                      onClick={(e) => handleAdd(e, details.book_id)}
                    >
                      <AiOutlinePlus className="w-6 h-6 text-black" />
                    </div>
                  </div>
                ) : (
                  <button
                    className="bg-blue-600 px-10 p-2 min-w-[350px] w-fit"
                    onClick={(e) => handleAdd(e, details.book_id)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
            <h1 className="text-xl py-2 my-6 font-semibold border-b w-fit pr-10">
              Similar to this
            </h1>
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
                  {basket?.filter((e) => e.book_id === item.book_id).length >
                  0 ? (
                    <div className="flex items-center h-8">
                      <div
                        className="p-1 px-1.5 h-full items-center bg-blue-600 flex justify-center rounded-l-sm"
                        onClick={(e) => handleRemove(e, item.book_id)}
                      >
                        <AiOutlineMinus className="w-4 h-4 text-black" />
                      </div>
                      <div className="text-center bg-white p-1 flex-1 w-fit text-black">
                        Quantity{" "}
                        {
                          basket.filter((e) => e.book_id === item.book_id)[0]
                            .count
                        }
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
            <h1 className="text-xl py-2 my-6 font-semibold border-b w-fit pr-10">
              Reviews
            </h1>
            {reviews.length !== 0 ? (
              <div className="flex flex-col gap-2">
                {reviews.map((item, index) => (
                  <div className="p-2 rounded-sm border-zinc-700">
                    <div className="flex items-center gap-4">
                      <div className="w-12 aspect-square rounded-full overflow-hidden flex justify-center items-center p-[2px] border border-neutral-500">
                        <img
                          src={item.profile_pic}
                          className="object-cover w-full h-full rounded-full"
                        />
                      </div>
                      <div className="flex flex-col gap-0">
                        <p className="text-sm text-zinc-400">{item.name}</p>
                        <Rating
                          style={{ maxWidth: 80 }}
                          value={item.rating}
                          readOnly
                        />
                        <p className="italic text-lg">{item.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-zinc-400 text-xl italic">No reviews yet!</p>
            )}
          </div>
        ) : (
          <ClipLoader className="w-6 h-6 m-auto" color="white" />
        )}
      </div>
    </div>
  );
}
