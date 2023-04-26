import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import { ClipLoader } from "react-spinners";

export default function Profile({ userId }) {
  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileRef = useRef(null);
  useEffect(() => {
    const formData = new FormData();
    formData.append("userId", userId);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/getUserInfo`, formData)
      .then((res) =>
        res.data.length ? setUserData(res.data[0]) : setUserData(null)
      );
  }, []);

  const handleClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleCancel = () => {
    if (fileRef.current) {
      fileRef.current.value = "";
      setImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("name", e.target.name.value);
      formData.append("contact_no", e.target.contact_no.value);
      formData.append("profile_pic", fileRef.current?.files[0]);

      let address = [
        e.target.address_flat.value,
        e.target.address_area.value,
        e.target.address_landmark.value,
        e.target.address_pincode.value,
        e.target.address_city.value,
        e.target.address_state.value,
      ];
      address = address.join();
      formData.append("address", address);

      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/updateUserInfo`,
        formData
      );
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(true);
      setTimeout(() => setError(false), 5000);
    }
  };

  return (
    <>
      <div className="p-4 relative flex flex-col max-md:w-full w-11/12 m-auto gap-10">
        {loading ? (
          <div className="bg-yellow-500 px-10 py-2 gap-2 rounded-sm flex items-center justify-center absolute right-0">
            <ClipLoader size={20} color="white" />
            <p className="font-semibold">Saving changes</p>
          </div>
        ) : error ? (
          <div className="bg-red-500 px-10 py-2 gap-2 rounded-sm flex items-center justify-center absolute right-0">
            <p className="font-semibold">An unexpected error occurred!</p>
          </div>
        ) : success ? (
          <div className="bg-green-500 px-10 py-2 gap-2 rounded-sm flex items-center justify-center absolute right-0">
            <p className="font-semibold">Changes saved</p>
          </div>
        ) : (
          <></>
        )}
        <div className="flex gap-10 w-full justify-center">
          <input
            ref={fileRef}
            type={"file"}
            onChange={onImageChange}
            accept="image/*"
            hidden
          />
          {fileRef.current && fileRef.current.files.length !== 0 ? (
            <div className="relative w-60 h-60 overflow-hidden rounded-md">
              <div className="absolute w-full h-full bg-gray-500/20 flex flex-col gap-2 justify-center items-center">
                <button
                  className="text-white border border-white rounded-sm w-32 py-1"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
              <img src={image} className="object-cover w-full h-full -z-10" />
            </div>
          ) : (
            <div
              onClick={handleClick}
              className="relative w-60 cursor-pointer h-60 overflow-hidden rounded-md"
            >
              <div className="absolute flex bg-gray-500/20 hover:bg-gray-400/20 transition-all flex-col justify-center w-full h-full gap-5 items-center z-10">
                <FiUpload className="w-16 h-16 text-white" />
                <p className="text-white">Upload a profile picture</p>
              </div>
              <img
                src={userData?.profile_pic}
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>
        <form
          className="flex w-full flex-wrap gap-3 text-white"
          onSubmit={handleSubmit}
        >
          <div className="input-group basis-[49%]">
            <input
              placeholder=" "
              autoComplete="off"
              name="name"
              type="text"
              required
              defaultValue={userData?.name}
              className="input-field2 w-full rounded !bg-transparent"
            />
            <label className="input-placeholder2 !bg-zinc-900">Name</label>
          </div>
          <div className="input-group basis-[49%]">
            <input
              placeholder=" "
              autoComplete="off"
              name="contact_no"
              type="tel"
              required
              defaultValue={userData?.contact_no}
              className="input-field2 w-full rounded !bg-transparent"
            />
            <label className="input-placeholder2 !bg-zinc-900">
              Contact Number
            </label>
          </div>
          <div className="input-group basis-[49%]">
            <input
              placeholder=" "
              autoComplete="off"
              name="address_flat"
              type="text"
              required
              defaultValue={userData?.address.split(",")[0]}
              className="input-field2 w-full rounded !bg-transparent"
            />
            <label className="input-placeholder2 !bg-zinc-900">
              Flat, House no, Building, Company, Apartment
            </label>
          </div>
          <div className="input-group basis-[49%]">
            <input
              placeholder=" "
              autoComplete="off"
              name="address_area"
              type="text"
              required
              defaultValue={userData?.address.split(",")[1]}
              className="input-field2 w-full rounded !bg-transparent"
            />
            <label className="input-placeholder2 !bg-zinc-900">
              Area, Street, Sector, Village
            </label>
          </div>
          <div className="input-group basis-[49%]">
            <input
              placeholder=" "
              autoComplete="off"
              name="address_landmark"
              type="text"
              required
              defaultValue={userData?.address.split(",")[2]}
              className="input-field2 w-full rounded !bg-transparent"
            />
            <label className="input-placeholder2 !bg-zinc-900">Landmark</label>
          </div>
          <div className="input-group basis-[49%]">
            <input
              placeholder=" "
              autoComplete="off"
              name="address_pincode"
              type="text"
              required
              defaultValue={userData?.address.split(",")[3]}
              className="input-field2 w-full rounded !bg-transparent"
            />
            <label className="input-placeholder2 !bg-zinc-900">Pincode</label>
          </div>
          <div className="input-group basis-[49%]">
            <input
              placeholder=" "
              autoComplete="off"
              name="address_city"
              type="text"
              required
              defaultValue={userData?.address.split(",")[4]}
              className="input-field2 w-full rounded !bg-transparent"
            />
            <label className="input-placeholder2 !bg-zinc-900">Town/City</label>
          </div>
          <div className="input-group basis-[49%]">
            <input
              placeholder=" "
              autoComplete="off"
              name="address_state"
              type="text"
              required
              defaultValue={userData?.address.split(",")[5]}
              className="input-field2 w-full rounded !bg-transparent"
            />
            <label className="input-placeholder2 !bg-zinc-900">State</label>
          </div>
          <button type="submit" className="w-[99%] bg-blue-600 py-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
