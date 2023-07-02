import { Api } from ".";

export const create = (data) => {
  return Api.post("/favorites", data);
};

export const findAll = () => {
  return Api.get("/favorites");
};

export const remove = (id) => {
  return Api.delete(`/favorites/${id}`);
}