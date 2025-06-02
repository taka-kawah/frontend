import type { JSX } from "@emotion/react/jsx-runtime";
import React, { useState } from "react";
import "../../App.css";

export function SignInForms(): JSX.Element {
  const [email, setEmail] = useState("");
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  return (
    <div>
      <p className="text-3xl font-bold underline">サインイン</p>
      <input type="text" required />
    </div>
  );
}
