import jwt_decode from "jwt-decode";
import axios from "axios";

export function getToken() {
  const token = localStorage.getItem("username");
  if (token && token !== "Bearer undefined") return true;
  else return false;
}

export function getJWTUsername() {
  const token = localStorage.getItem("username");
  return jwt_decode(token).username;
}

export function getSignupToken() {
  const token = localStorage.getItem("signup");
  if (token) return true;
  else return false;
}

export function setHeader() {
  axios.defaults.headers.common["Authorization"] = localStorage.getItem(
    "username"
  );
}
