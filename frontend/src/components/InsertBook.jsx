import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Select from "react-select";

export default function InsertBook({ setIsVisible }) {
  const handleClose = () => setIsVisible(false);
  const [publisher, setPublisher] = useState([]);
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [author, setAuthor] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState([]);
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);

  const getPublishers = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/get-publisher`
      );
      const arr = data.data;
      let arr1 = [];
      for (let item of arr) {
        arr1.push({ label: item.name, value: item.publisher_id });
      }
      setPublisher(() => [...arr1]);
    } catch (err) {
      console.log(err);
    }
  };

  const getAuthor = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/get-author`
      );
      const arr = data.data;
      let arr1 = [];
      for (let item of arr) {
        arr1.push({ label: item.name, value: item.author_id });
      }
      setAuthor(() => [...arr1]);
    } catch (err) {
      console.log(err);
    }
  };

  const getGenre = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/get-genre`
      );
      const arr = data.data;
      let arr1 = [];
      for (let item of arr) {
        arr1.push({ label: item.name, value: item.genre_id });
      }
      setGenre(() => [...arr1]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPublishers();
    getAuthor();
    getGenre();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(e.target.image.files[0]);
      const formData = new FormData();
      const data = {
        title: e.target.title.value,
        description: e.target.description.value,
        image: e.target.image.files[0],
        release_data: e.target.release_data.value,
        publisher_id: selectedPublisher.value,
        authors: selectedAuthor,
        genres: selectedGenre,
        price: e.target.price.value,
        discount: e.target.discount.value,
      };
      formData.append("data", JSON.stringify(data));
      formData.append("image", e.target.image.files[0]);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/add-books`,
        formData
      );
      alert("Added Successfully");
      setIsVisible(false);
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
              <p className="text-xl">Insert a book</p>
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
                  name="title"
                  type="text"
                  className="input-field2 w-full rounded"
                />
                <label className="input-placeholder2">Name of the Book</label>
              </div>
              <div className="input-group w-full">
                <input
                  placeholder=" "
                  autoComplete="off"
                  name="description"
                  type="text"
                  className="input-field2 w-full rounded"
                />
                <label className="input-placeholder2">
                  Description of the Book
                </label>
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
                <input
                  placeholder=" "
                  autoComplete="off"
                  name="release_data"
                  type="date"
                  className="input-field3 w-full rounded"
                />
                <label className="input-placeholder3">
                  Release Date of the Book
                </label>
              </div>
              <div className="input-group w-full">
                <Select
                  className="input-field3 p-0 rounded my-react-select-container"
                  classNamePrefix="my-react-select"
                  defaultValue={selectedPublisher}
                  onChange={setSelectedPublisher}
                  options={publisher}
                  isMulti={false}
                />
                <label className="input-placeholder3">
                  Publisher of the Book
                </label>
              </div>
              <div className="input-group w-full">
                <Select
                  className="input-field3 p-0 rounded my-react-select-container"
                  classNamePrefix="my-react-select"
                  defaultValue={selectedAuthor}
                  onChange={setSelectedAuthor}
                  options={author}
                  isMulti={true}
                />
                <label className="input-placeholder3">Author of the Book</label>
              </div>
              <div className="input-group w-full">
                <Select
                  className="input-field3 p-0 rounded my-react-select-container"
                  classNamePrefix="my-react-select"
                  defaultValue={selectedGenre}
                  onChange={setSelectedGenre}
                  options={genre}
                  isMulti={true}
                />
                <label className="input-placeholder3">Genre of the Book</label>
              </div>
              <div className="input-group w-full">
                <input
                  placeholder=" "
                  autoComplete="off"
                  name="price"
                  type="text"
                  className="input-field2 w-full rounded"
                />
                <label className="input-placeholder2">Price of the Book</label>
              </div>
              <div className="input-group w-full">
                <input
                  placeholder=" "
                  autoComplete="off"
                  name="discount"
                  type="text"
                  className="input-field2 w-full rounded"
                />
                <label className="input-placeholder2">
                  Discount of the Book
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
