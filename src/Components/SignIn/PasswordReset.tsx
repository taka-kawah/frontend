import React, { useState, type JSX } from "react";
import "../../App.css";
import { cautions, isValidEmail } from "./validation";

export function ResetPasswordForms(): JSX.Element {
  const [email, setEmail] = useState("");
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  return (
    <div
      id="email-signup"
      className="justify-items-center bg-cyan-100 rounded-4xl"
    >
      <p id="title" className="font-bold text-2xl p-4 text-gray-600">
        パスワードをリセット
      </p>
      <div className="text-gray-500 justify-items-center px-8 py-2 text-sm">
        <p>アカウントに登録されたメールアドレスを入力してください。</p>
        <p>送信されたメール内のリンクから、</p>
        <p>パスワードのリセットを行ってください。</p>
      </div>
      <div id="forms" className="">
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
      <div className="items-end pt-4">
        <button
          className="bg-cyan-500 text-white font-bold py-2 px-4 rounded-xl transition delay-150 duration-200 hover:bg-blue-500 hover:scale-110 disabled:bg-blue-300"
          onClick={() => console.log("reset!", email)}
          disabled={!isValidEmail(email) || email === ""}
        >
          リセットメールを送信する
        </button>
      </div>
    </div>
  );
}
