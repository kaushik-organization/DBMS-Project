import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";
import AES from "crypto-js/aes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target?.username.value;
    const password = e.target?.password.value;
    const hash = Base64.stringify(
      sha256(name + password + import.meta.env.VITE_SECRET_KEY)
    );

    if (hash === import.meta.env.VITE_HASH_KEY) {
      const sessionValue = AES.encrypt(
        `${hash}$${Date.now()}`,
        import.meta.env.VITE_SECRET_KEY
      ).toString();
      sessionStorage.setItem("session", sessionValue);
      navigate("/admin/dashboard");
    } else {
      setErrorMsg("Don't try to sneak in! You will be punished.");
    }
  };
  return (
    <div className="bg-black w-screen flex flex-col gap-10 justify-center items-center h-screen theme-font text-white">
      <h1 className="text-4xl">
        <span className="text-4xl !text-red-500">Admin</span> Login
      </h1>
      <form
        className="flex flex-col w-screen items-center px-10 gap-6"
        onSubmit={handleSubmit}
      >
        {errorMsg?.length !== 0 ? (
          <p
            className="bg-red-500 px-4 py-2 rounded-sm cursor-pointer"
            onClick={() => setErrorMsg("")}
          >
            {errorMsg}
          </p>
        ) : (
          ""
        )}
        <div className="input-group w-full md:w-[400px]">
          <input
            placeholder=" "
            autoComplete="off"
            name="username"
            type="text"
            className="input-field w-full rounded"
          />
          <label className="input-placeholder">Username</label>
        </div>
        <div className="input-group w-full md:w-[400px]">
          <input
            placeholder=" "
            autoComplete="off"
            name="password"
            type="password"
            className="input-field w-full rounded"
          />
          <label className="input-placeholder">Password</label>
        </div>
        <button
          type="submit"
          className="w-full md:w-[400px] bg-blue-600 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
