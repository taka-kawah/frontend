import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { SignInForms } from "./SignInForms";
import { useState } from "react";
import { SignUpForms } from "./SignUpForms";
import { ResetPasswordForms } from "./PasswordReset";

type signMode = "signin" | "signup";

export function AccountModal({ needsSign }: { needsSign: boolean }) {
  const [mode, setMode] = useState<signMode>("signin");
  const [isResetMode, setIsResetMode] = useState(false);
  return needsSign ? (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-cyan-100 rounded-4xl h-auto w-100">
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLINET_ID}>
          <div className="h-100">
            <FormByMode mode={mode} isReset={isResetMode} />
          </div>
          <button
            className="pt-3 px-4 place-content-end text-blue-600 hover:text-blue-400 transition delay-80"
            onClick={() => setIsResetMode(!isResetMode)}
          >
            パスワードを忘れた
          </button>
          <hr className="w-[85%] h-px bg-gray-700 border-none mx-auto my-4" />
          <p className="flex justify-center text-gray-600 font-bold">または</p>
          <div className="justify-items-center py-4 space-y-4">
            <GoogleLogin
              onSuccess={() => console.log("success!")}
              onError={() => console.log("error!")}
            />
            <button
              className="bg-white w-44 h-8.5 rounded border border-gray-300 hover:bg-blue-50 transition delay-80 disabled:text-gray-400"
              onClick={() =>
                mode === "signup" ? setMode("signin") : setMode("signup")
              }
              disabled={isResetMode}
            >
              {mode === "signin"
                ? "メールアドレスでログイン"
                : "アカウントを作成"}
            </button>
          </div>
        </GoogleOAuthProvider>
      </div>
    </div>
  ) : (
    <></>
  );
}

function FormByMode({ mode, isReset }: { mode: signMode; isReset: boolean }) {
  if (isReset) return <ResetPasswordForms />;
  switch (mode) {
    case "signin":
      return <SignInForms />;
    case "signup":
      return <SignUpForms />;
  }
}
