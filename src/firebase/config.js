// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBi4isOcIsReMmLQJw_W7Qqh2eE92l7lW4",
	authDomain: "swagfit-2fabd.firebaseapp.com",
	projectId: "swagfit-2fabd",
	storageBucket: "swagfit-2fabd.appspot.com",
	messagingSenderId: "800747875285",
	appId: "1:800747875285:web:00f8e18793f8daceee2b5c",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
auth.useDeviceLanguage();
