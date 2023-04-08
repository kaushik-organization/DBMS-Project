import React from "react";

export default function LeftComponents({ active, setActive }) {
  return (
    <ul className="flex flex-col text-white shrink-0">
      <li
        onClick={() => setActive(1)}
        className={`py-4 px-3 border-b border-white/20 hover:bg-white/20 cursor-pointer ${
          active == 1 ? "bg-white/20" : ""
        }`}
      >
        Author
      </li>
      <li
        onClick={() => setActive(2)}
        className={`py-4 px-3 border-b border-white/20 hover:bg-white/20 cursor-pointer ${
          active == 2 ? "bg-white/20" : ""
        }`}
      >
        Books
      </li>
      <li
        onClick={() => setActive(3)}
        className={`py-4 px-3 border-b border-white/20 hover:bg-white/20 cursor-pointer ${
          active == 3 ? "bg-white/20" : ""
        }`}
      >
        Publisher
      </li>
      <li
        onClick={() => setActive(4)}
        className={`py-4 px-3 border-b border-white/20 hover:bg-white/20 cursor-pointer ${
          active == 4 ? "bg-white/20" : ""
        }`}
      >
        Genre
      </li>
      <li
        onClick={() => setActive(5)}
        className={`py-4 px-3 border-b border-white/20 hover:bg-white/20 cursor-pointer ${
          active == 5 ? "bg-white/20" : ""
        }`}
      >
        Books Author
      </li>
      <li
        onClick={() => setActive(6)}
        className={`py-4 px-3 border-b border-white/20 hover:bg-white/20 cursor-pointer ${
          active == 6 ? "bg-white/20" : ""
        }`}
      >
        Books Genre
      </li>
    </ul>
  );
}
