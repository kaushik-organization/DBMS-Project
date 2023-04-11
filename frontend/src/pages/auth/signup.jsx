import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (e.target.password.value !== e.target.re_password.value) {
        return alert("Both passwords don't match");
      }
      const formData = new FormData();
      formData.append("email", e.target.email.value);
      formData.append("name", e.target.name.value);
      formData.append("contact_no", e.target.contact_no.value);
      formData.append("profile_pic", e.target.profile_pic.files[0]);
      formData.append("password", e.target.password.value);

      let address = [
        e.target.address_flat.value,
        e.target.address_area.value,
        e.target.address_landmark.value,
        e.target.address_city.value,
        e.target.address_state.value,
      ];
      address = address.join();
      formData.append("address", address);

      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/register`,
        formData
      );
      console.log(result.data);
      if (result.data.Status === "success") {
        alert("Success");
        navigate("/auth0/login");
      } else {
        alert("An error occurred! Try again later.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#222] w-screen h-screen flex flex-row-reverse theme-font">
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
          to={"/auth0/login"}
          className="bg-fuchsia-700 text-white px-10 rounded-sm p-2 font-semibold border border-fuchsia-900"
        >
          Login Now
        </Link>
      </div>
      <div className="lg:w-5/12 p-10 w-full flex items-center flex-col gap-5 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-[#222]">
        <p className="text-5xl !text-red-500 font-extrabold">Register</p>
        <form
          className="flex flex-col items-center w-full justify-center gap-3 text-white"
          onSubmit={handleSubmit}
        >
          <div className="input-group w-full !bg-transparent">
            <input
              placeholder=" "
              autoComplete="off"
              name="name"
              type="text"
              required
              className="input-field2 w-full rounded !bg-transparent"
            />
            <label className="input-placeholder2 !bg-[#222]">Name</label>
          </div>
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
              name="profile_pic"
              type="file"
              accept="image/*"
              required
              className="input-field3 w-full rounded"
            />
            <label className="input-placeholder3">Profile Picture</label>
          </div>
          <div className="input-group w-full !bg-transparent">
            <input
              placeholder=" "
              autoComplete="off"
              name="contact_no"
              type="tel"
              required
              className="input-field2 w-full rounded !bg-transparent"
            />
            <label className="input-placeholder2 !bg-[#222]">
              Contact Number
            </label>
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
          <div className="input-group w-full">
            <input
              placeholder=" "
              autoComplete="off"
              name="re_password"
              type="password"
              required
              className="input-field2 w-full rounded !bg-transparent"
            />
            <label className="input-placeholder2 !bg-[#222]">
              Re-enter Password
            </label>
          </div>
          <div className="input-group w-full">
            <input
              placeholder=" "
              autoComplete="off"
              name="address_flat"
              type="text"
              required
              className="input-field2 w-full rounded !bg-transparent"
            />
            <label className="input-placeholder2 !bg-[#222]">
              Flat, House no, Building, Company, Apartment
            </label>
          </div>
          <div className="input-group w-full">
            <input
              placeholder=" "
              autoComplete="off"
              name="address_area"
              type="text"
              required
              className="input-field2 w-full rounded !bg-transparent"
            />
            <label className="input-placeholder2 !bg-[#222]">
              Area, Street, Sector, Village
            </label>
          </div>
          <div className="input-group w-full">
            <input
              placeholder=" "
              autoComplete="off"
              name="address_landmark"
              type="text"
              required
              className="input-field2 w-full rounded !bg-transparent"
            />
            <label className="input-placeholder2 !bg-[#222]">Landmark</label>
          </div>
          <div className="input-group w-full">
            <input
              placeholder=" "
              autoComplete="off"
              name="address_pincode"
              type="text"
              required
              className="input-field2 w-full rounded !bg-transparent"
            />
            <label className="input-placeholder2 !bg-[#222]">Pincode</label>
          </div>
          <div className="input-group w-full">
            <input
              placeholder=" "
              autoComplete="off"
              name="address_city"
              type="text"
              required
              className="input-field2 w-full rounded !bg-transparent"
            />
            <label className="input-placeholder2 !bg-[#222]">Town/City</label>
          </div>
          <div className="input-group w-full">
            <input
              placeholder=" "
              autoComplete="off"
              name="address_state"
              type="text"
              required
              className="input-field2 w-full rounded !bg-transparent"
            />
            <label className="input-placeholder2 !bg-[#222]">State</label>
          </div>
          <button type="submit" className="w-full bg-blue-600 py-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
