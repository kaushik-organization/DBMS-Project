import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", e.target.email.value);
      formData.append("password", e.target.password.value);
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        formData
      );
      if (result.data.Status === "success") {
        alert("Success");
        navigate("/");
      } else {
        alert(
          `An error occurred! Try again later. Error: ${
            result.data.Error || result.data.message
          }`
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#222] w-screen h-screen flex theme-font">
      <div
        className="lg:w-7/12 max-lg:hidden w-full bg-no-repeat bg-center bg-cover flex justify-center items-center flex-col gap-2"
        style={{ backgroundImage: "url(../auth.jpg)" }}
      >
        <q className="w-[80%] text-center text-3xl text-white font-extrabold">
          The more that you read, the more things you will know. The more that
          you learn, the more places you'll go.
        </q>
        <figcaption className="text-slate-100 text-lg font-semibold">
          --- Dr. Seuss
        </figcaption>
        <Link
          to={"/auth0/register"}
          className="bg-fuchsia-700 text-white px-10 rounded-sm p-2 font-semibold border border-fuchsia-900"
        >
          Join Now
        </Link>
      </div>
      <div className="lg:w-5/12 p-4 px-10 w-full flex items-center justify-center flex-col gap-5">
        <p className="text-5xl !text-red-500 font-extrabold">Login</p>
        <form
          className="flex flex-col items-center w-full justify-center gap-3 text-white"
          onSubmit={handleSubmit}
        >
          <div className="input-group w-full !bg-transparent">
            <input
              placeholder=" "
              autoComplete="off"
              name="email"
              type="email"
              required
              className="input-field2 w-full rounded !bg-transparent"
            />
            <label className="input-placeholder2 !bg-[#222]">Email</label>
          </div>
          <div className="input-group w-full">
            <input
              placeholder=" "
              autoComplete="off"
              name="password"
              type="password"
              required
              className="input-field2 w-full rounded !bg-transparent"
            />
            <label className="input-placeholder2 !bg-[#222]">Password</label>
          </div>
          <button type="submit" className="w-full bg-blue-600 py-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
