import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/user";

export default function Orders({ userId }) {
  const user = useRecoilValue(userState);
  const [orders, setOrders] = useState([]);
  const [visible, setVisible] = useState([]);
  const [details, setDetails] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const [writeReview, setWriteReview] = useState([]);
  const fetchReviews = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/reviews-UserId/${userId}`
    );
    setReviews(res.data?.data);
  };

  useEffect(() => {
    const formData = new FormData();
    formData.append("user_id", userId);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/orderHistory`, formData)
      .then((res) => {
        setOrders(res.data);
        let isV = [];
        res.data?.forEach((item) => isV.push(false));
        setVisible(isV);
      });
    fetchReviews();
  }, []);

  useEffect(() => {
    if (orders && orders.length) {
      let promises = [];
      orders.forEach((order) => {
        const formData = new FormData();
        formData.append("order_id", order.order_id);
        const pr = axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/orderDetails`,
          formData
        );
        promises.push(pr);
      });
      Promise.all(promises).then((result) => {
        let data = [];
        result.forEach((item) => {
          data.push(item.data);
        });
        let arr = [];
        result.forEach((item) => {
          let dd = [];
          let n = item.data?.length;
          for (let i = 0; i < n; i++) {
            dd.push({ rating: 4, comment: "" });
          }
          arr.push(dd);
        });
        setWriteReview(arr);
        setDetails(data);
      });
    }
  }, [orders]);

  console.log(reviews);

  const constructDate = (date) => {
    const dateobj = new Date(date);
    return (
      dateobj.toLocaleDateString("en-GB") + " " + dateobj.toLocaleTimeString()
    );
  };

  const handleToggle = (index) => {
    let arr = visible;
    arr[index] = !arr[index];
    setVisible((prev) => [...arr]);
  };

  const handleReviewChange = (e, ind, index) => {
    let arr = writeReview;
    arr[ind][index].comment = e.target.value;
    setWriteReview((prev) => [...[...arr]]);
  };

  const handleRatingChange = (e, ind, index) => {
    let arr = writeReview;
    arr[ind][index].rating = e;
    setWriteReview((prev) => [...[...arr]]);
  };

  const handleSubmitReview = async (book_id, ind, index) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("book_id", book_id);
    formData.append("user_id", user?.user_id);
    formData.append("rating", writeReview[ind][index].rating);
    formData.append("comment", writeReview[ind][index].comment);
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/addReviews`,
      formData
    );
    fetchReviews().finally(() => setLoading(false));
  };

  return (
    <div className="p-4 flex flex-col gap-2">
      {orders &&
        orders.map((item, ind) => (
          <div className="flex flex-col-reverse gap-2" key={ind}>
            {visible && !visible[ind] ? (
              <div className="flex flex-col gap-2">
                {details[ind] &&
                  details[ind].map((item, index) => (
                    <div
                      key={item.image}
                      className="border border-zinc-700 flex flex-col gap-2 rounded-md p-3"
                    >
                      <div className="flex w-full gap-3">
                        <div className="w-20 shrink-0">
                          <Link to={`/book/${item.book_id}`}>
                            <img
                              src={item.image}
                              className="w-full h-full object-contain"
                            />
                          </Link>
                        </div>
                        <div className="flex flex-col">
                          <Link to={`/book/${item.book_id}`}>
                            <p className="text-lg mr-10">{item.title}</p>
                          </Link>
                          <div className="text-zinc-500 line-clamp-3">
                            {item.description}
                          </div>
                          <div className="text-lg text-green-500">
                            Rs. {item.Price}{" "}
                            <span className="text-xs text-zinc-500">
                              Purchased price
                            </span>
                          </div>
                        </div>
                      </div>
                      {reviews?.filter((e) => e.book_id === item.book_id)
                        .length == 0 ? (
                        <div className="">
                          <textarea
                            className="w-full resize-none scrollbar-thin bg-transparent p-2 rounded-sm focus:border-zinc-500 outline-none border border-zinc-700"
                            rows={3}
                            placeholder="Write your review..."
                            value={writeReview[ind][index].comment}
                            onChange={(e) => handleReviewChange(e, ind, index)}
                          />
                          <Rating
                            style={{ maxWidth: 150 }}
                            value={writeReview[ind][index].rating}
                            onChange={(e) => handleRatingChange(e, ind, index)}
                          />
                          <button
                            className="mt-2 px-6 py-1 bg-blue-600 rounded-sm"
                            onClick={() =>
                              handleSubmitReview(item.book_id, ind, index)
                            }
                          >
                            Submit your review
                          </button>
                        </div>
                      ) : (
                        <>
                          <h1 className="mx-2 text-zinc-300 border-zinc-300 text-xl py-2 font-semibold border-b w-fit pr-10">
                            Your Review
                          </h1>
                          <div className="border border-zinc-700 rounded-sm p-2">
                            <p className="text-sm italic mb-2 text-zinc-300">
                              {
                                reviews?.filter(
                                  (e) => e.book_id === item.book_id
                                )[0].comment
                              }
                            </p>
                            <Rating
                              style={{ maxWidth: 100 }}
                              value={
                                reviews?.filter(
                                  (e) => e.book_id === item.book_id
                                )[0].rating
                              }
                              readOnly
                            />
                          </div>
                        </>
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              ""
            )}
            <div
              className="border border-zinc-500 cursor-pointer transition-all flex justify-between items-center rounded-md p-2 px-4 bg-zinc-800/90"
              key={ind}
              onClick={() => handleToggle(ind)}
            >
              <p className="text-zinc-300">{item.order_id}</p>
              <div className="flex items-center gap-2">
                <p className="text-sm text-zinc-400">
                  {constructDate(item.Date)}
                </p>
                <AiOutlineArrowRight className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
