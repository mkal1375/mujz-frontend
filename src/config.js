const baseUrl =
  process.env.NODE_ENV === "production"
    ? window.location.host
    : "localhost:1375";

const localStorageKey = "mujz_data";

export { baseUrl, localStorageKey };
