import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAXxYO0MnvK8yEab4Oqu7GGD_gLq5nbwF8",
	authDomain: "studio-2442138904-28af2.firebaseapp.com",
	projectId: "studio-2442138904-28af2",
	storageBucket: "studio-2442138904-28af2.firebasestorage.app",
	messagingSenderId: "15221175500",
	appId: "1:15221175500:web:213e1d3b02422625b77e69",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export default app;

