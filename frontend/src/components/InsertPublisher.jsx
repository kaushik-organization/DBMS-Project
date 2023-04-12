import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";

export default function InsertPublisher({ setIsPublisher }) {
  const handleClose = () => setIsPublisher(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", e.target.name.value);
      formData.append("contact_no", e.target.contact_no.value);
      formData.append("address", e.target.address.value);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/publisher`,
        formData
      );
      alert("Added Successfully");
      setIsPublisher(false);
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
              <p className="text-xl">Insert a Publisher</p>
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
                <label className="input-placeholder2">
                  Name of the Publisher
                </label>
              </div>
              <div className="input-group w-full">
                <input
                  placeholder=" "
                  autoComplete="off"
                  name="contact_no"
                  type="tel"
                  className="input-field2 w-full rounded"
                />
                <label className="input-placeholder2">
                  Contact of the Publisher
                </label>
              </div>
              <div className="input-group w-full">
                <input
                  placeholder=" "
                  autoComplete="off"
                  name="address"
                  type="text"
                  className="input-field2 w-full rounded"
                />
                <label className="input-placeholder2">
                  Address of the Publisher
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
