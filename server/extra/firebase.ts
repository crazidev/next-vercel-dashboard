import {
  initializeFirestore,
  connectFirestoreEmulator,
} from "firebase/firestore";

import { initializeApp, initializeServerApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACBWu57yEjMc_QqF6OUJgE2GU8-Yy4mZI",
  authDomain: "hybank-new.firebaseapp.com",
  projectId: "hybank-new",
  storageBucket: "hybank-new.firebasestorage.app",
  messagingSenderId: "395155457856",
  appId: "1:395155457856:web:b5e3b2401c5731de561ca5"
};

export const appClient = initializeApp(firebaseConfig);
// export const appServer = initializeServerApp(firebaseConfig, {});
export const firestoreClient = initializeFirestore(appClient, {});
connectFirestoreEmulator(firestoreClient, "localhost", 8080);
