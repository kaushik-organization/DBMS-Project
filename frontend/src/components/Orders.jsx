import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { json, Link } from "react-router-dom";

export default function Orders({ userId }) {
  const [orders, setOrders] = useState([]);
  const [visible, setVisible] = useState([]);
  const [details, setDetails] = useState([]);
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
        setDetails(data);
      });
    }
  }, [orders]);

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

  return (
    <div className="p-4 flex flex-col-reverse gap-2">
      {orders &&
        orders.map((item, index) => (
          <>
            {visible && !visible[index] ? (
              <div className="flex flex-wrap gap-2">
                {details[index] &&
                  details[index].map((item, index) => (
                    <Link to={`/book/${item.book_id}`} key={item.image}>
                      <div className="border border-zinc-700 flex gap-2 rounded-md p-3">
                        <div className="w-20 shrink-0">
                          <img
                            src={item.image}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex flex-col">
                          <p className="text-lg mr-10">{item.title}</p>
                          <div className="text-zinc-500 flex-1">
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
                    </Link>
                  ))}
              </div>
            ) : (
              ""
            )}
            <div
              className="border border-zinc-500 cursor-pointer transition-all flex justify-between items-center rounded-md p-2 px-4 bg-zinc-800/90"
              key={index}
              onClick={() => handleToggle(index)}
            >
              <p className="text-zinc-300">{item.order_id}</p>
              <div className="flex items-center gap-2">
                <p className="text-sm text-zinc-400">
                  {constructDate(item.Date)}
                </p>
                <AiOutlineArrowRight className="h-6 w-6" />
              </div>
            </div>
          </>
        ))}
    </div>
  );
}
