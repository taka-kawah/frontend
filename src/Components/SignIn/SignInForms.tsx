import React, { useState, type JSX } from "react";
import "../../App.css";
import { cautions, isValidEmail, isValidPassword } from "./validation";

export function SignInForms(): JSX.Element {
  const [email, setEmail] = useState("");
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  console.log(email + password);
  return (
    <div id="email-pass-signin" className="space-y-12 bg-cyan-100 rounded-4xl">
      <p
        id="title"
        className="font-bold text-2xl flex justify-center p-4 text-gray-600"
      >
        メールアドレスでログイン
      </p>
      <div id="forms" className="space-y-6">
        <div className="space-y-2 p-8">
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
        <div className="space-y-2 p-8">
          <label className="block tracking-wide text-base text-gray-600">
            パスワード
          </label>
          <p className="text-sm text-gray-500/100 w-70">
            最低8文字、1つ以上の大文字、1つ以上の数字を含むパスワードを入力してください。
          </p>
          <input
            id="password"
            type="password"
            required
            className={`bg-white w-80 h-13 border-2 ${isValidPassword(password) ? "border-cyan-500/50 transition delay-50 hover:border-blue-500/50 focus:border-blue-500/50" : "border-red-500/50"} rounded focus:placeholder-transparent`}
            value={password}
            onChange={handlePassword}
            style={{ outline: "none" }}
          />
          <p className="text-red-500 h-5">
            {isValidPassword(password) ? "" : cautions.password}
          </p>
        </div>
      </div>
      <div className="flex justify-center items-end pb-8">
        <button
          className="bg-cyan-500 text-white font-bold py-2 px-4 rounded-xl transition delay-150 duration-200 hover:bg-blue-500 hover:scale-110 disabled:bg-blue-300"
          onClick={() => console.log("login!", email, password)}
          disabled={
            !isValidEmail(email) ||
            !isValidPassword(password) ||
            email === "" ||
            password === ""
          }
        >
          ログイン
        </button>
      </div>
    </div>
  );
}
