// src/utils/authService.js
import API from "./api";
import { saveUserProfile, logout as clearLocalProfile } from "./authUtils";

/**
 * Expect backend to return { token, user } on register/login.
 * Adjust if your backend returns different shape.
 */

export const register = async (payload) => {
  const res = await API.post("/auth/register", payload);
  const data = res.data;
  if (data?.token) {
    localStorage.setItem("auth_token", data.token);
    // saveUserProfile will also dispatch 'userProfileUpdated' event
    saveUserProfile(data.user || {});
  }
  return data;
};

export const login = async (credentials) => {
  const res = await API.post("/auth/login", credentials);
  const data = res.data;
  if (data?.token) {
    localStorage.setItem("auth_token", data.token);
    saveUserProfile(data.user || {});
  }
  return data;
};

export const getMe = async () => {
  // GET /auth/me should return { user: {...} }
  const res = await API.get("/auth/me");
  const data = res.data;
  if (data?.user) {
    saveUserProfile(data.user);
  }
  return data;
};

export const logout = async () => {
  try {
    await API.post("/auth/logout");
  } catch (err) {
    // ignore backend errors on logout, still clear local session
    console.warn("logout request failed:", err?.message || err);
  }
  // clearLocalProfile refers to authUtils.logout (removes auth_token & user_profile + dispatch)
  clearLocalProfile();
};
