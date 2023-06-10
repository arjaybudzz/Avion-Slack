const auth = "auth-user";

export function getStoredUser() {
  const user = localStorage.getItem(auth);
  return user ? JSON.parse(user) : null;
}

export function setStoredUser(user) {
  localStorage.setItem(auth, JSON.stringify(user));
}

export function clearStoredUser() {
  localStorage.removeItem(auth);
}
