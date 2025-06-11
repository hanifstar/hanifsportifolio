// Import Firebase
import firebase from "firebase/app"
import "firebase/firestore"

// Firebase Configuration (use the same config from your main script)
const firebaseConfig = {
  apiKey: "AIzaSyCayGcfnpCAGNDph3YTyEA9_KDdD2C5Fg0",
  authDomain: "my-tiktok-cbd6f.firebaseapp.com",
  databaseURL: "https://my-tiktok-cbd6f-default-rtdb.firebaseio.com",
  projectId: "my-tiktok-cbd6f",
  storageBucket: "my-tiktok-cbd6f.firebasestorage.app",
  messagingSenderId: "964441294320",
  appId: "1:964441294320:web:4c8da74a0cee8ed2644935",
  measurementId: "G-RYBWW6XB10"
}

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
const db = firebase.firestore()

// Get messages and display them
const messagesContainer = document.getElementById("messages-container")

async function loadMessages() {
  try {
    const snapshot = await db.collection("messages").orderBy("timestamp", "desc").get()
    if (snapshot.empty) {
      messagesContainer.innerHTML = "<p>No messages yet.</p>"
      return
    }

    snapshot.forEach((doc) => {
      const data = doc.data()
      const messageEl = document.createElement("div")
      messageEl.classList.add("message-card")
      messageEl.innerHTML = `
        <h3>${data.name} <span>(${data.email})</span></h3>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p>${data.message}</p>
        <small>${data.timestamp?.toDate().toLocaleString() || "No Date"}</small>
        <hr />
      `
      messagesContainer.appendChild(messageEl)
    })
  } catch (error) {
    console.error("Error loading messages:", error)
    messagesContainer.innerHTML = "<p>Error loading messages.</p>"
  }
}

loadMessages()
