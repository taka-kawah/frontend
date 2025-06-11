import React, { useState, type JSX } from "react";
import "../../App.css";
import { cautions, isValidEmail, isValidPassword } from "./validation";
import { useSendEmailAndPassword } from "../../http_parts/SignInSignUpHooks";
import { CustomButton, ErrorBar } from "../util";

export function SignInForms(): JSX.Element {
  const [email, setEmail] = useState("");
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const { sendEmailAndPassword, error, loading } = useSendEmailAndPassword();
  const handleLogin = () => {
    sendEmailAndPassword(email, password);
  };

  return (
    <div id="email-pass-signin" className="justify-items-center space-y-1">
      <p id="title" className="font-bold text-2xl p-4 text-gray-600">
        メールアドレスでログイン
      </p>
      <div id="forms">
        <div id="emailForm" className="px-8">
          <label className="block tracking-wide text-base text-gray-600">
            メールアドレス
          </label>
          <input
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
        <div id="passwordForm" className="px-8">
          <label className="block tracking-wide text-base text-gray-600">
            パスワード
          </label>
          <input
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
      <ErrorBar err={error} />
      <div className="pt-5">
        <CustomButton
          label="ログイン"
          onClick={handleLogin}
          disabled={
            !isValidEmail(email) ||
            !isValidPassword(password) ||
            email === "" ||
            password === ""
          }
          loading={loading}
        />
      </div>
    </div>
  );
}
