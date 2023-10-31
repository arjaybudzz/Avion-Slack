
import { getStoredUser } from '@/storage/storeData';
import { redirect } from 'next/navigation'

export default function Home() {
  const storedUser = getStoredUser();

  if (!storedUser) {
    redirect('auth/login'); // Redirect to the login page if not logged in
  } else {
    redirect('/dashboard'); // Redirect to the dashboard if logged in
  }

  return null;
}
