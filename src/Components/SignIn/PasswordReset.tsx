import React, { useState, type JSX } from "react";
import "../../App.css";
import { cautions, isValidEmail } from "./validation";
import { CustomButton, ErrorBar } from "../util";
import { useResetPasswordEmail } from "../../http_parts/SignInSignUpHooks";

export function ResetPasswordForms(): JSX.Element {
  const [email, setEmail] = useState("");
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const { resetPasswordEmail, error, loading } = useResetPasswordEmail();
  const handleClick = () => {
    resetPasswordEmail(email);
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
      <ErrorBar err={error} />
      <div className="items-end pt-4">
        <CustomButton
          label="リセットメールを送信する"
          onClick={handleClick}
          disabled={!isValidEmail(email) || email === ""}
          loading={loading}
        />
      </div>
    </div>
  );
}
