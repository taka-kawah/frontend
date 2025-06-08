import { z } from "zod";
import { useHttpPostTrigger } from "./util/fetch_hooks";
import bcrypt from "bcryptjs";
import { useEffect } from "react";
import { setAuthToken } from "./util/local_storage";

const authDomain = "auth.example.com";

export function useSendEmailAndPassword() {
  const { postTrigger, error, loading, resHeader } = useHttpPostTrigger<{}>();

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

  return { sendEmailAndPassword, error, loading };
}
