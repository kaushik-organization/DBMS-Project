import { AnimatePresence, motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";

export default function InsertBook({ setIsVisible }) {
  const handleClose = () => setIsVisible(false);
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
            <form className="w-full px-4 py-4 flex flex-col gap-3">
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
                  name="release_data"
                  type="date"
                  className="input-field3 w-full rounded"
                />
                <label className="input-placeholder3">
                  Release Date of the Book
                </label>
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
            </form>
          </>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
