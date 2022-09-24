const degToRad = (val) => val * (Math.PI / 180);

export const getDistance = (lat1, lng1, lat2, lng2) => {
  const r = 6378137;
  const dLat = degToRad(lat2 - lat1);
  const dLng = degToRad(lng2 - lng1);
  const lat1Rad = degToRad(lat1);
  const lat2Rad = degToRad(lat2);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1Rad) * Math.cos(lat2Rad);
  const b = 2 * Math.asin(Math.sqrt(a));
  return r * b;
};
