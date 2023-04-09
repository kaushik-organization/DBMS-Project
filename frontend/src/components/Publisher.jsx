import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Publisher({ setIsPublisher }) {
  const [data, setData] = useState([]);
  const getPublishers = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/get-publisher`
      );
      setData((prev) => [...data.data]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPublishers();
  }, []);

  return (
    <div className="p-1 w-full flex flex-col gap-2">
      <button
        className="bg-blue-600 px-6 p-1 rounded-sm w-fit"
        onClick={() => setIsPublisher(true)}
      >
        Insert Publisher
      </button>
      <table className="border border-white/30">
        <thead>
          <tr className="border border-white/30">
            {data?.length != 0 &&
              Object.keys(data[0])?.map((item, index) => (
                <th
                  className="border border-white/30 bg-[#222] p-2 px-6 min-w-[200px]"
                  key={index}
                >
                  {item}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr className="border border-white/30" key={index}>
              {Object.values(item)?.map((val, ind) => (
                <td
                  className="border border-white/30 text-center min-w-[300px]"
                  key={ind}
                >
                  <input
                    type={"text"}
                    className="bg-transparent p-2 px-6 text-center w-full"
                    disabled
                    value={val.toString() ? val : "null"}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
