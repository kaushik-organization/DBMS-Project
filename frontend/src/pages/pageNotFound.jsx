import React from "react";
import { Link, Navigate } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="bg-black w-screen h-screen text-white theme-font flex justify-center items-center">
      <div className="w-screen md:w-2/3 absolute left-0 h-screen flex flex-col gap-4 justify-center items-center z-10 px-2">
        <h1 className="text-white text-5xl md:text-7xl text-center">
          404 NOT FOUND
        </h1>
        <q className="w-[80%] text-center italic text-xl text-slate-300/70">
          That's the funny thing about trying to escape. You never really can.
          Maybe temporarily, but not completely.
        </q>
        <figcaption className="text-slate-300/80 text-lg">
          --- Jennifer L. Armentrout, Onyx
        </figcaption>
        <Link to={"/"} className="bg-white text-black px-10 py-2 rounded-sm">
          Let's Go Home
        </Link>
      </div>
      <img
        src="/404.jpg"
        alt="404"
        className="absolute h-screen object-cover object-right motion-animation"
      />
    </div>
  );
}
