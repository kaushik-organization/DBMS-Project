import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ClimbingBoxLoader, DotLoader } from "react-spinners";
import { useRecoilState } from "recoil";
import {
  basketCost,
  basketDiscountCost,
  basketState,
} from "../../atoms/basket";
import { userState } from "../../atoms/user";
import StoreBar from "../components/StoreBar";

export default function Store() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [basket, setBasket] = useRecoilState(basketState);
  const [totalCost, setTotalCost] = useRecoilState(basketCost);
  const [discountCost, setDiscountCost] = useRecoilState(basketDiscountCost);

  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [priceRange, setPriceRange] = useState([0, 99999]);
  const [ratingRange, setRatingRange] = useState([0, 100]);
  const [sortByRating, setSortByRating] = useState(false);
  const [sortByPrice, setSortByPrice] = useState(false);
  useEffect(() => {
    if (searchParams.get("search")) {
      const formData = new FormData();
      formData.append("search", searchParams.get("search"));
      formData.append("priceRange", JSON.stringify(priceRange));
      formData.append("ratingRange", JSON.stringify(ratingRange));
      formData.append("sortByRating", sortByRating);
      formData.append("sortByPrice", sortByPrice);
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/filter`, formData)
        .then((res) => {
          if (res.status === 200) {
            setBooks(res.data.data);
          } else if (res.status === 204) {
            setBooks((prev) => []);
          } else {
            alert("An error occured");
          }
        });
    } else {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-books`).then((res) => {
        setBooks(res.data.data);
      });
    }
  }, []);

  console.log(books);

  const fetchCart = async () => {
    setLoading(true);
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
          });
      } else {
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleAdd = async (e, book_id) => {
    e.stopPropagation();
    e.preventDefault();
    if (!user.auth) {
      const ans = confirm("You are not signed in. Do you want to?");
      if (ans) navigate("/auth0/login");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("book_id", book_id);
      formData.append("user_id", user.user_id);
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
      formData.append("user_id", user.user_id);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/removeToCart`,
        formData
      );
    } catch (err) {
      console.log(err);
    }
    fetchCart();
  };

  const handleChange = (e) => {
    const formData = new FormData();
    formData.append("search", searchParams.get("search"));
    formData.append("priceRange", JSON.stringify(priceRange));
    formData.append("ratingRange", JSON.stringify(ratingRange));
    formData.append("sortByRating", sortByRating);
    formData.append("sortByPrice", sortByPrice);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/filter`, formData)
      .then((res) => {
        if (res.status === 200) {
          setBooks(res.data.data);
        } else if (res.status === 204) {
          setBooks((prev) => []);
        } else {
          alert("An error occured");
        }
      });
  };

  const handlePrice = (e) => {
    let arr = JSON.parse(e.target.value);
    setPriceRange(arr);
  };

  const handleRating = (e, index) => {
    let arr = ratingRange;
    arr[index] = e.target.value;
    setRatingRange((prev) => [...arr]);
  };

  const handleSort = (e) => {
    if (e.target.value === "price") {
      setSortByPrice(1);
      setSortByRating(0);
    } else if (e.target.value === "rating") {
      setSortByRating(1);
      setSortByPrice(0);
    }
  };

  useEffect(() => {
    handleChange();
  }, [priceRange, ratingRange, sortByPrice, sortByRating]);

  return (
    <div className="flex flex-col gap-2 w-full h-screen bg-zinc-900 theme-font text-white">
      <StoreBar setBooks={setBooks} />
      {!loading && (
        <div className="w-full flex-1 flex overflow-hidden">
          <div className="w-[250px] shrink-0 text-zinc-400">
            <h1 className="text-lg ml-6 pr-20 py-2 border-b border-b-zinc-400 w-fit">
              Filters
            </h1>
            <section className="p-2 px-7">
              <h2 className="text-zinc-300 py-2">Range of Price</h2>
              <div className="flex items-center gap-2">
                <input
                  type={"radio"}
                  id="price_range"
                  name="price_range"
                  value={JSON.stringify([50, 100])}
                  onChange={handlePrice}
                />
                <label htmlFor="price_range">50-100</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type={"radio"}
                  id="price_range1"
                  name="price_range"
                  value={JSON.stringify([100, 200])}
                  onChange={handlePrice}
                />
                <label htmlFor="price_range1">100-200</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type={"radio"}
                  id="price_range2"
                  name="price_range"
                  value={JSON.stringify([200, 300])}
                  onChange={handlePrice}
                />
                <label htmlFor="price_range2">200-300</label>
              </div>
            </section>
            <section className="p-2 px-7">
              <h2 className="text-zinc-300 py-2">Rating of Price</h2>
              <div className="flex gap-2 items-center">
                <select
                  name="minRange"
                  id="minRange"
                  onChange={(e) => handleRating(e, 0)}
                  className="px-4 border bg-transparent rounded py-1"
                  defaultValue={0}
                >
                  {[0, 1, 2, 3, 4, 5].map((item) => (
                    <option htmlFor="minRange" key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                to
                <select
                  name="maxRange"
                  id="maxRange"
                  onChange={(e) => handleRating(e, 1)}
                  className="px-4 border bg-transparent rounded py-1"
                  defaultValue={5}
                >
                  {[0, 1, 2, 3, 4, 5].map((item) => (
                    <option htmlFor="maxRange" key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </section>
            <section className="p-2 px-7">
              <h2 className="text-zinc-300 py-2">Sort by</h2>
              <div className="flex gap-2 items-center">
                <select
                  name="sortby"
                  id="sortby"
                  onChange={handleSort}
                  className="px-4 border bg-transparent rounded py-1"
                  defaultValue={"none"}
                >
                  {["---Select---", "Price", "Rating"].map((item) => (
                    <option
                      htmlFor="sortby"
                      key={item}
                      value={item.toLowerCase()}
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </section>
          </div>
          <div className="flex-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-[#222] p-4 flex flex-wrap gap-6">
            {books && books.length !== 0 ? (
              books.map((item, index) => (
                <Link
                  key={index}
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
              ))
            ) : (
              <div className="flex items-center justify-center w-full text-zinc-400">
                No books found
              </div>
            )}
          </div>
        </div>
      )}
      {loading && (
        <div className="flex w-full justify-center items-center flex-1">
          <DotLoader size={40} color="#aaa" />
        </div>
      )}
    </div>
  );
}
