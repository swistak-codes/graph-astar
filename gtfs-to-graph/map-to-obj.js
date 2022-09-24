export const mapToObj = (map) => {
  const result = {};
  for (const [key, value] of map) {
    if (value instanceof Set) {
      result[key] = [...value];
    } else {
      result[key] = value;
    }
  }
  return result;
};
