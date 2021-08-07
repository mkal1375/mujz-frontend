import { localStorageKey } from "./config";

export function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

export function readLocalStorage() {
  const storageInText = window.localStorage.getItem(localStorageKey);
  const storage = JSON.parse(storageInText);
  if (storage) return storage;
  return {};
}

export function writeLocalStorage(data) {
  const storageInText = JSON.stringify(data);
  window.localStorage.setItem(localStorageKey, storageInText);
}

export function readFromLocalStorage(key) {
  const storage = readLocalStorage();
  if (storage) return storage[key];
  return null;
}

export function writeToLocalStorage(key, data) {
  let newStorage = readLocalStorage();
  newStorage[key] = data;
  console.log(newStorage);
  writeLocalStorage(newStorage);
}
