import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../FirebaseConfig";

interface IAuthContext {
	user: User | null | undefined,
	setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>
}

const AuthContext = createContext<IAuthContext>({ user: undefined, setUser: (user) => { } });

export const AuthProvider = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
	const [user, setUser] = useState<User | null | undefined>(undefined);

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser: User | null) => {
			setUser(currentUser)
		});
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);