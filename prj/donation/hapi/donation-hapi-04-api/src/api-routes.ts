import { candidatesApi } from "./api/candidates-api.js";
import { donationsApi } from "./api/donations-api.js";
import { userApi } from "./api/users-api.js";

export const apiRoutes = [
  { method: "GET" as const, path: "/api/users", config: userApi.find },
  { method: "POST" as const, path: "/api/users", config: userApi.create },
  { method: "DELETE" as const, path: "/api/users", config: userApi.deleteAll },
  { method: "GET" as const, path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST" as const, path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "GET" as const, path: "/api/candidates", config: candidatesApi.find },
  { method: "GET" as const, path: "/api/candidates/{id}", config: candidatesApi.findOne },
  { method: "POST" as const, path: "/api/candidates", config: candidatesApi.create },
  { method: "DELETE" as const, path: "/api/candidates/{id}", config: candidatesApi.deleteOne },
  { method: "DELETE" as const, path: "/api/candidates", config: candidatesApi.deleteAll },

  { method: "GET" as const, path: "/api/donations", config: donationsApi.findAll },
  { method: "GET" as const, path: "/api/candidates/{id}/donations", config: donationsApi.findByCandidate },
  { method: "POST" as const, path: "/api/candidates/{id}/donations", config: donationsApi.makeDonation },
  { method: "DELETE" as const, path: "/api/donations", config: donationsApi.deleteAll },
];
