import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import QRCode from "https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js";

const firebaseConfig = {
  apiKey: "AIzaSyAMolvHjWUTujbI8Y8nb4_EM72tq_ILC3Y",
  authDomain: "whatsapp-groups-cf531.firebaseapp.com",
  projectId: "whatsapp-groups-cf531",
  storageBucket: "whatsapp-groups-cf531.appspot.com",
  messagingSenderId: "185377581193",
  appId: "1:185377581193:web:40b0026f895410aeeabe58"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("groupForm");
const msg = document.getElementById("msg");
const qrDiv = document.getElementById("qrcode");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const group = document.getElementById("group").value;
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const link = document.getElementById("link").value;

  try {
    await addDoc(collection(db, "groups"), { group, name, phone, link, createdAt: new Date() });
    msg.innerText = "Saved successfully!";
    form.reset();

    qrDiv.innerHTML = "";
    QRCode.toCanvas(qrDiv, link, { width: 150 });
  } catch (err) {
    msg.innerText = "Error: " + err.message;
  }
});
