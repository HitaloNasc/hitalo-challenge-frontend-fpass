import { Api } from ".";
import { buildQueryString } from "../helpers/build-query-string";

export const findMany = (params) => {
  const { name, offset } = params || {};

  const query = buildQueryString({
    name,
    offset,
  });

  return Api.get("/characters?" + query);
};
