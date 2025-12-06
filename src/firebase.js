// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "blog-fruit.firebaseapp.com",
    projectId: "blog-fruit",
    storageBucket: "blog-fruit.firebasestorage.app",
    messagingSenderId: "509450057912",
    appId: "1:509450057912:web:957c629315ac85f36f9c4d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);