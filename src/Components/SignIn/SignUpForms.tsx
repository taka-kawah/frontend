import React, { useState, type JSX } from "react";
import "../../App.css";
import { cautions, isValidEmail } from "./validation";

export function SignUpForms(): JSX.Element {
  const [email, setEmail] = useState("");
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  return (
    <div id="email-signup" className="space-y-12 bg-cyan-100 rounded-4xl">
      <p
        id="title"
        className="font-bold text-2xl flex justify-center p-4 text-gray-600"
      >
        アカウント新規登録
      </p>
      <div id="forms" className="space-y-6 p-8">
        <div className="space-y-2">
          <label className="block tracking-wide text-base text-gray-600">
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            required
            className={`bg-white w-80 h-13 border-2 ${isValidEmail(email) ? "border-cyan-500/50 transition delay-50 hover:border-blue-500/50 focus:border-blue-500/50" : "border-red-500/50"} rounded`}
            value={email}
            onChange={handleEmail}
            style={{ outline: "none" }}
          />
          <p className="text-red-500 h-5">
            {isValidEmail(email) ? "" : cautions.email}
          </p>
        </div>
      </div>
      <div className="flex justify-center items-end pb-8">
        <button
          className="bg-cyan-500 text-white font-bold py-2 px-4 rounded-xl transition delay-150 duration-200 hover:bg-blue-500 hover:scale-110 disabled:bg-blue-300"
          onClick={() => console.log("signup!", email)}
          disabled={!isValidEmail(email) || email === ""}
        >
          新規登録メールを送る
        </button>
      </div>
    </div>
  );
}
