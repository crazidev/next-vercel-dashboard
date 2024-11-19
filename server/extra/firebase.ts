import {
  initializeFirestore,
  connectFirestoreEmulator,
} from "firebase/firestore";

import { initializeApp, initializeServerApp } from "firebase/app";

const firebaseConfig = {};

const appClient = initializeApp(firebaseConfig);
const appServer = initializeServerApp(firebaseConfig, {});
const firestoreClient = initializeFirestore(appClient, {});
connectFirestoreEmulator(firestoreClient, "localhost", 8080);
