import { GoogleOAuthProvider } from "@react-oauth/google";
import { SignInForms } from "./SignInForms";
import { SignInWithGoogle } from "./SignInWithGoogle";
import { SignUpForms } from "./SignUpForms";

export function AccountModal({ needsSign }: { needsSign: boolean }) {
  return needsSign ? (
    <div className="p-15 bg-white w-400 rounded-4xl space-y-3">
      <h1 className="text-center font-bold text-2xl">ようこそ✨</h1>
      <p className="text-center">
        まずはログイン・サインアップをお願いいたします！
      </p>
      <div className="flex flex-row flex justify-center space-x-15">
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLINET_ID}>
          <SignUpForms />
          <SignInForms />
          <SignInWithGoogle />
        </GoogleOAuthProvider>
      </div>
    </div>
  ) : (
    <></>
  );
}
