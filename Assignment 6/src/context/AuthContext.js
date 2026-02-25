import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, githubProvider, googleProvider } from "../firebase/config";

const AuthContext = createContext();

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within an AuthProvider");
	return context;
};

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const register = async (email, password, displayName) => {
		const result = await createUserWithEmailAndPassword(auth, email, password);
		if (displayName) {
			await updateProfile(result.user, { displayName });
		}
		return result;
	};

	const login = (email, password) =>
		signInWithEmailAndPassword(auth, email, password);

	const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

	const loginWithGithub = () => signInWithPopup(auth, githubProvider);

	const logout = () => signOut(auth);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		loading,
		register,
		login,
		loginWithGoogle,
		loginWithGithub,
		logout,
	};

	return (
		<AuthContext.Provider value={value}>
			{loading ? (
				<div className="min-h-screen flex items-center justify-center bg-gray-50">
					<div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
				</div>
			) : (
				children
			)}
		</AuthContext.Provider>
	);
};

