import React, { useState, type JSX } from "react";
import "../../App.css";
import { cautions, isValidEmail } from "./validation";
import { useSendEmailForSignUp } from "../../http_parts/SignInSignUpHooks";
import { CustomButton, ErrorBar } from "../util";

export function SignUpForms(): JSX.Element {
  const [email, setEmail] = useState("");
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const { sendEmailForSignUp, error, loading } = useSendEmailForSignUp();
  const handleClick = () => {
    sendEmailForSignUp(email);
  };
  return (
    <div
      id="email-signup"
      className="justify-items-center bg-cyan-100 rounded-4xl"
    >
      <p id="title" className="font-bold text-2xl p-4 text-gray-600">
        アカウント新規登録
      </p>
      <div className="text-gray-500 justify-items-center px-8 py-2 text-sm">
        <p>登録するメールアドレスを入力してください。</p>
        <p>送信されたメール内のリンクから、</p>
        <p>アカウント登録をしてください。</p>
      </div>
      <div id="forms">
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
      <ErrorBar err={error} />
      <div className="items-end pt-4">
        <CustomButton
          label="新規登録メールを送る"
          onClick={handleClick}
          disabled={!isValidEmail(email) || email === ""}
          loading={loading}
        />
      </div>
    </div>
  );
}
