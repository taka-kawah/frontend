export const cautions = {
  email: "メールアドレスが不正です。",
  password: "パスワードが不正です。",
};

export function isValidEmail(subject: string): boolean {
  const emailRegex =
    /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  return emailRegex.test(subject) || subject === "";
}

export function isValidPassword(subject: string): boolean {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(subject) || subject === "";
}
