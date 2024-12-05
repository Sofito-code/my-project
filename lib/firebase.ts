import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDmgFyk2lpkZP0dxl1RMW9EFoa4Ya3gMSs",
  authDomain: "iot-final-2024.firebaseapp.com",
  projectId: "iot-final-2024",
  storageBucket: "iot-final-2024.firebasestorage.app",
  messagingSenderId: "997572165380",
  appId: "1:997572165380:web:10f64a069e8feaa1ea9a51",
  measurementId: "G-9KCD4W2JHZ"
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };