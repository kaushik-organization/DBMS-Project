import React from "react";

export default function DashboardNavbar() {
  return (
    <div className="text-white py-3 px-4 flex justify-between border-b border-white/20">
      <h1 className="text-xl uppercase">Dashboard</h1>
      <input
        type="text"
        name="search"
        placeholder="Search..."
        autoComplete="off"
        className="px-4 rounded-sm bg-[#222] py-1 outline-none"
      />
    </div>
  );
}
