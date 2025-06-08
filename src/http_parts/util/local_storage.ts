export function setAuthToken(token: string) {
  if (!token) {
    throw new Error("Token cannot be empty");
  }
  localStorage.setItem("authToken", token);
}

export function getAuthToken() {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("Token not found in local storage");
  }
  return token;
}

export function removeAuthToken() {
  localStorage.removeItem("authToken");
}
