import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Select from "react-select";
import { countries } from "../assets/countries";
countries.forEach((item) => (item.value = item.label));

export default function InsertAuthor({ setIsAuthor }) {
  const handleClose = () => setIsAuthor(false);
  const gender = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", e.target.name.value);
      formData.append("about", e.target.about.value);
      formData.append("gender", selectedGender.value);
      formData.append("country", selectedCountry.value);
      formData.append("image", e.target.image.files[0]);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/author`,
        formData
      );
      alert("Added Successfully");
      setIsAuthor(false);
    } catch (err) {
      alert("An error occurred. Try again later");
      console.log(err);
    }
  };

  return (
    <div
      className="fixed w-screen h-screen bg-black/70 z-[1000] top-0 flex justify-center items-center theme-font"
      onClick={handleClose}
    >
      <AnimatePresence>
        <motion.div
          key="modal5"
          className="absolute max-h-[90vh] w-full md:w-[500px] lg:w-[700px] bg-[#222] text-[#ddd] rounded-sm flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <>
            <header className="flex items-center justify-between border-b border-gray-300 p-4">
              <p className="text-xl">Insert an Author</p>
              <div className="">
                <RxCross2
                  className="h-6 w-6 text-white cursor-pointer"
                  onClick={handleClose}
                />
              </div>
            </header>
            <form
              className="w-full px-4 py-4 flex flex-col gap-3"
              onSubmit={handleSubmit}
            >
              <div className="input-group w-full">
                <input
                  placeholder=" "
                  autoComplete="off"
                  name="name"
                  type="text"
                  className="input-field2 w-full rounded"
                />
                <label className="input-placeholder2">Name of the Author</label>
              </div>
              <div className="input-group w-full">
                <input
                  placeholder=" "
                  autoComplete="off"
                  name="about"
                  type="text"
                  className="input-field2 w-full rounded"
                />
                <label className="input-placeholder2">About the Author</label>
              </div>
              <div className="input-group w-full">
                <input
                  placeholder=" "
                  autoComplete="off"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="input-field3 w-full rounded"
                />
                <label className="input-placeholder3">
                  Cover image of the Book
                </label>
              </div>
              <div className="input-group w-full">
                <Select
                  className="input-field3 p-0 rounded my-react-select-container"
                  classNamePrefix="my-react-select"
                  defaultValue={selectedGender}
                  onChange={setSelectedGender}
                  options={gender}
                  isMulti={false}
                />
                <label className="input-placeholder3">
                  Gender of the Author
                </label>
              </div>
              <div className="input-group w-full">
                <Select
                  className="input-field3 p-0 rounded my-react-select-container"
                  classNamePrefix="my-react-select"
                  defaultValue={selectedCountry}
                  onChange={setSelectedCountry}
                  options={countries}
                  isMulti={false}
                  isSearchable={true}
                />
                <label className="input-placeholder3">
                  Country of the Author
                </label>
              </div>
              <button type="submit" className="w-full bg-blue-600 py-2 rounded">
                Submit
              </button>
            </form>
          </>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
