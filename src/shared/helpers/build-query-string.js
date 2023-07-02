export const buildQueryString = (params) => {
  const query = new URLSearchParams();

  const arrEntries = Object.entries(params);

  arrEntries.forEach(([key, value]) => {
    if (value) {
      query.append(key, String(value));
    }
  });

  return query.toString();
};
