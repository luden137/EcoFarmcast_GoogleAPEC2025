import { Platform } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3v5HR6sg0YHyChfHxfMTGmMvFNNMqPUA",
  authDomain: "gdg-ecofarm.firebaseapp.com",
  projectId: "gdg-ecofarm",
  storageBucket: "gdg-ecofarm.firebasestorage.app",
  messagingSenderId: "300354674967",
  appId: "1:300354674967:web:283fe21b943450dbe65752",
  measurementId: "G-7T1C5GDDQ0"
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
