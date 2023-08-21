// api.js

import { BASE_URL } from "./Constants";
import { save } from "./storage";

export async function register(profile) {
  const registerURL = BASE_URL + "/auth/register";
  const body = JSON.stringify(profile);

  const response = await fetch(registerURL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body,
  });

  const result = await response.json();
  return result;
}

export async function login(profile) {
    const loginURL = BASE_URL + "/auth/login";
    const body = JSON.stringify(profile);
  
    try {
      const response = await fetch(loginURL, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body,
      });
  
      const responseData = await response.json();
      console.log("response data:", responseData); // Debugging line
  
      if (response.ok) {
        const { accessToken, ...user } = responseData;
        localStorage.setItem("token", accessToken);
        localStorage.setItem("profile", JSON.stringify(user));
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("profile");
}
