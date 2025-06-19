import { auth, db, doc, getDoc } from './firebase.js';

auth.onAuthStateChanged(async (user) => {
  if (user) {
    const uid = user.uid;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      document.getElementById("userData").innerHTML = `
        <p>Nama: ${data.nama}</p>
        <p>Email: ${data.email}</p>
        <p>Saldo: Rp ${data.saldo}</p>
        <p>XP: ${data.xp}</p>
        <p>Level: ${data.level}</p>
      `;
    }
  } else {
    window.location.href = "login.html";
  }
});