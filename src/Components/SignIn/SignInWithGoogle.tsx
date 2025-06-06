import { type JSX } from "react";
import "../../App.css";
import { GoogleLogin } from "@react-oauth/google";

export function SignInWithGoogle(): JSX.Element {
  return (
    <div id="google-signin" className="space-y-12 bg-cyan-100 rounded-4xl">
      <p
        id="title"
        className="font-bold text-2xl flex justify-center p-4 text-gray-600"
      >
        Googleアカウントでログイン
      </p>
      <div id="GoogleButton" className="flex justify-center py-30">
        <GoogleLogin
          onSuccess={() => console.log("success!")}
          onError={() => console.log("error!")}
        />
      </div>
    </div>
  );
}
