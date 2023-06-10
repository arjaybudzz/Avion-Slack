"use client"
import { getStoredUser } from '@/storage/storeData';
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const storedUser = getStoredUser();

    if (!storedUser) {
      router.push('auth/login'); // Redirect to the login page if not logged in
    } else {
      router.push('/dashboard'); // Redirect to the dashboard if logged in
    }
  }, []);

  return null;
}