import { auth, signInWithEmailAndPassword } from './firebase.js';

document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("Login sukses: " + userCredential.user.email);
    window.location.href = "dashboard.html";
  } catch (error) {
    alert("Login gagal: " + error.message);
  }
});