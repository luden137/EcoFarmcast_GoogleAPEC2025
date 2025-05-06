import { Platform } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "ecofarmcast.firebaseapp.com",
  projectId: "ecofarmcast",
  storageBucket: "ecofarmcast.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890",
  measurementId: "G-ABCDEFGHIJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

// Enable Firestore persistence for offline support
if (Platform.OS !== 'web') {
  // Only enable persistence on native platforms
  enableIndexedDbPersistence(firestore)
    .catch((err) => {
      console.error('Firebase persistence error:', err);
    });
}

export { app, auth, firestore, storage };
