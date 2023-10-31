import { cookies } from 'next/headers'

const auth = "auth-user";

export function getStoredUser() {
  const user = cookies().get(auth)?.value;
  return user ? JSON.parse(user) : null;
}

export function setStoredUser(user) {
  cookies().set(auth, JSON.stringify(user));
}

export function clearStoredUser() {
  cookies().delete(auth);
}
