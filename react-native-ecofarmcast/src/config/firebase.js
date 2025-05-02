import { Platform } from 'react-native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

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

// Initialize Firebase if it hasn't been initialized yet
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Enable Firestore persistence for offline support
firestore().settings({
  persistence: true,
  cacheSizeBytes: firestore.CACHE_SIZE_UNLIMITED,
});

// Configure Storage for maximum compatibility
if (Platform.OS === 'android') {
  storage().setMaxUploadRetryTime(120000); // 2 minutes
  storage().setMaxDownloadRetryTime(120000); // 2 minutes
}

export { firebase, auth, firestore, storage };
