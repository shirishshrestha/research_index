export const AUTH_QUERY_KEYS = {
  currentUser: ["auth", "currentUser"],
  login: ["auth", "login"],
  register: ["auth", "register"],
  logout: ["auth", "logout"],
  refreshToken: ["auth", "refreshToken"],
} as const;

export const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login/",
  LOGOUT: "/auth/logout/",
  REFRESH_TOKEN: "/auth/token/refresh/",
  REGISTER_AUTHOR: "/auth/register/author/",
  REGISTER_INSTITUTION: "/auth/register/institution/",
} as const;
