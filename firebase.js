import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// 🔥 CONFIG KAMU DARI FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyBYhb3x0PjgISnZbUJzBnOMt5w78BuFNFM",
  authDomain: "bersih-in-app.firebaseapp.com",
  projectId: "bersih-in-app",
  storageBucket: "bersih-in-app.firebasestorage.app",
  messagingSenderId: "512283338093",
  appId: "1:512283338093:web:d93cb91cb701a155912664",
  measurementId: "G-9HV8C9BTXP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, doc, setDoc, getDoc };
