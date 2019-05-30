import axios from "axios";

export function fetchShops() {
  return axios.get("/shops");
}

export function fetchFavorites(item) {
  return axios.get("/favorites");
}

export function setFavorite(item) {
  return axios.post("/favorites", {
    ...item
  });
}

export function updateFavorite(item) {
  return axios.put("/favorites", {
    ...item
  });
}
