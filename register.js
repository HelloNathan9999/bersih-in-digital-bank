import { auth, db, createUserWithEmailAndPassword, doc, setDoc } from './firebase.js';

console.log("✅ register.js berhasil dimuat");

document.getElementById("registerBtn").addEventListener("click", async () => {
  console.log("🟢 Tombol Daftar diklik");

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const nama = document.getElementById("nama").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    await setDoc(doc(db, "users", uid), {
      email: email,
      nama: nama,
      saldo: 0,
      xp: 0,
      level: 1
    });

    alert("✅ Daftar sukses!");
    window.location.href = "login.html";
  } catch (error) {
    alert("❌ Gagal daftar: " + error.message);
    console.error("Firebase error:", error);
  }
});
