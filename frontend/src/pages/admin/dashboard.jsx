import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AES from "crypto-js/aes";
import CryptoJS from "crypto-js";
import DashboardNavbar from "../../components/DashboardNavbar";
import LeftComponents from "../../components/LeftComponents";
import Author from "../../components/Author";
import Books from "../../components/Books";
import Publisher from "../../components/Publisher";
import Genre from "../../components/Genre";
import BooksAuthor from "../../components/BooksAuthor";
import BooksGenre from "../../components/BooksGenre";
import InsertBook from "../../components/InsertBook";
import InsertAuthor from "../../components/InsertAuthor";
import InsertPublisher from "../../components/InsertPublisher";
import InsertGenre from "../../components/InsertGenre";

export default function Dashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isPublisher, setIsPublisher] = useState(false);
  const [isGenre, setIsGenre] = useState(false);
  const [active, setActive] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    const sessionValue = sessionStorage.getItem("session");
    if (!sessionValue) {
      navigate("/admin/login");
    }
    const hash = AES.decrypt(sessionValue, import.meta.env.VITE_SECRET_KEY);
    const [key, datetime] = hash.toString(CryptoJS.enc.Utf8).split("$");
    if (Date.now() - datetime >= 3600000) {
      sessionStorage.removeItem("session");
      navigate("/admin/login");
    }
  }, []);
  return (
    <>
      {isVisible && <InsertBook setIsVisible={setIsVisible} />}
      {isAuthor && <InsertAuthor setIsAuthor={setIsAuthor} />}
      {isPublisher && <InsertPublisher setIsPublisher={setIsPublisher} />}
      {isGenre && <InsertGenre setIsGenre={setIsGenre} />}
      <div className="bg-black theme-font w-screen h-screen flex flex-col">
        <DashboardNavbar />
        <div className="flex flex-1">
          <div className="w-[300px] border-r border-white/20 shrink-0">
            <LeftComponents active={active} setActive={setActive} />
          </div>
          <div className="flex-1 text-white overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-[#222]">
            {
              {
                1: <Author setIsAuthor={setIsAuthor} />,
                2: <Books setIsVisible={setIsVisible} />,
                3: <Publisher setIsPublisher={setIsPublisher} />,
                4: <Genre setIsGenre={setIsGenre} />,
                5: <BooksAuthor />,
                6: <BooksGenre />,
              }[active]
            }
          </div>
        </div>
      </div>
    </>
  );
}
