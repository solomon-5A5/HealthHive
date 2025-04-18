// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyByippqI8PbwqjwTURCxE2tfrvscYQ-CkY",
  authDomain: "healthhive-4ee4d.firebaseapp.com",
  projectId: "healthhive-4ee4d",
  storageBucket: "healthhive-4ee4d.firebasestorage.app",
  messagingSenderId: "728240198709",
  appId: "1:728240198709:web:c054db32ceb6bd5ad28d7c"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔐 Login function
export function loginUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login successful!");
      window.location.href = "home.html";
    })
    .catch((error) => {
      alert("Login error: " + error.message);
    });
}

// 📝 Register function without name or confirmPassword
export function registerUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      // Save minimal user info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date().toISOString()
      });

      alert("Registration successful!");
      window.location.href = "home.html";
    })
    .catch((error) => {
      alert("Registration error: " + error.message);
    });
}
