import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    await addDoc(collection(db, "groups"), {
      group: document.getElementById("group").value,
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      link: document.getElementById("link").value,
      createdAt: new Date()
    });
    msg.innerText = "Saved successfully!";
    form.reset();
  } catch (err) {
    msg.innerText = "Error: " + err.message;
  }
});
