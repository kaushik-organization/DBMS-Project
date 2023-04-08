import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function BooksGenre() {
  const [data, setData] = useState([]);
  const getBooksGenre = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/get-books-genre`
      );
      setData((prev) => [...data.data]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBooksGenre();
  }, []);

  return (
    <div className="p-1 w-full">
      <table className="border border-white/30">
        <thead>
          <tr className="border border-white/30">
            {data?.length != 0 &&
              Object.keys(data[0])?.map((item, index) => (
                <th
                  key={index}
                  className="border border-white/30 bg-[#222] p-2 px-6 min-w-[200px]"
                >
                  {item}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index} className="border border-white/30">
              {Object.values(item)?.map((val, ind) => (
                <td
                  key={ind}
                  className="border border-white/30 text-center min-w-[300px]"
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
