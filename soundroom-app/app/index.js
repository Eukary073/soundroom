import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/profile/edit'); // Or dashboard if artist
      } else {
        router.replace('/auth/login');
      }
    });
    return unsubscribe;
  }, []);

  return null; // Loading screen can be added
}