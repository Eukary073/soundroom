import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB8t7hvc5ILIJxej2mK69km0p7Cxe80Mgk", // From Firebase console
  authDomain: "soundroom-app.firebaseapp.com",
  projectId: "soundroom-app",
  storageBucket: "soundroom-app.firebasestorage.app",
  messagingSenderId: "561552090503",
  appId: "1:561552090503:android:d7517ac32c3d9b0eee9f22",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);