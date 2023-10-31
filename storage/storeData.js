import { cookies } from "next/dist/client/components/headers";

const auth = "auth-user";

export function getStoredUser() {
  const user = cookies().get(auth)?.values;
  return user ? JSON.parse(user) : null;
}

export function setStoredUser(user) {
  cookies().set(auth, JSON.stringify(user));
}

export function clearStoredUser() {
  cookies().delete(auth);
}
