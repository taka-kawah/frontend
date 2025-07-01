import { z } from "zod";
import { useHttpGetTrigger, useHttpPostTrigger } from "./util/fetch_hooks";
import bcrypt from "bcryptjs";
import { useEffect } from "react";
import { setAuthToken } from "./util/local_storage";

const authDomain = "http://auth-server.auth.svc.cluster.local:8000";

export function useSendEmailAndPassword() {
  const { postTrigger, ok, error, loading, resHeader } =
    useHttpPostTrigger<{}>();

  const sendEmailAndPassword = async (email: string, password: string) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const payload = { MailAddress: email, HashedPassword: hashedPassword };
    postTrigger(authDomain, "/signin", payload, z.object({}).strict());
  };

  useEffect(() => {
    if (!resHeader || error) return;
    const authToken = resHeader.get("Authorization");
    if (authToken) {
      setAuthToken(authToken);
    }
  }, [resHeader]);

  return { sendEmailAndPassword, ok, error, loading };
}

export function useSendEmailForSignUp() {
  const { getTrigger, ok, error, loading } = useHttpGetTrigger<{}>();

  const sendEmailForSignUp = async (email: string) => {
    getTrigger(authDomain, `/mail?email=${email}`, z.object({}).strict());
  };

  return { sendEmailForSignUp, ok, error, loading };
}

export function useResetPasswordEmail() {
  const { postTrigger, ok, error, loading } = useHttpPostTrigger<{}>();

  const resetPasswordEmail = async (email: string) => {
    postTrigger(
      authDomain,
      "/reset-password?email=${email}",
      { MailAddress: email },
      z.object({}).strict()
    );
  };

  return { resetPasswordEmail, ok, error, loading };
}
