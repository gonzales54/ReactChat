import { Link, useNavigate } from "react-router-dom"
import GoogleImage from '../../assets/google.png'
import { auth, db } from "../../FirebaseConfig"
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithRedirect, updateProfile, User, UserCredential } from "firebase/auth"
import { useEffect } from "react"
import { useAuth } from "../../Context/AuthContext"
import { doc, setDoc } from "firebase/firestore"

const RegisterView = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const google = new GoogleAuthProvider();

	useEffect(() => {
		onAuthStateChanged(auth, (user: User | null) => {
			if (user) {
				navigate('/')
			}
		});
	}, [user])

	const SubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const target = e.target as typeof e.target & {
			name: {
				value: string
			}
			email: {
				value: string
			}
			password: {
				value: string
			}
			password_confirmation: {
				value: string
			}
		}

		if (target.password.value === target.password_confirmation.value) {
			createUserWithEmailAndPassword(auth, target.email.value, target.password.value)
				.then(async (currentUser: UserCredential) => {
					await updateProfile(currentUser.user, {
						displayName: target.name.value
					})
					await setDoc(doc(db, "users", currentUser.user.uid), {
						information: {
							name: target.name.value,
							email: target.email.value,
							uid: currentUser.user.uid
						}
					})
				})
				.catch((e) => {
					console.log(e)
				})
		}
	}

	const clickLogin = () => {
		signInWithPopup(auth, google)
			.then((currentUser: UserCredential) => {
				setDoc(doc(db, "users", currentUser.user.uid), {
					information: {
						name: currentUser.user.displayName,
						email: currentUser.user.email,
						uid: currentUser.user.uid
					}
				});
				navigate('/')
			});
	}

	return (
		<div className="w-100 h-full flex justify-center items-center bg-gray-300 text-center">
			<form className="w-45 py-8 bg-white radius-2 " onSubmit={(e) => SubmitLogin(e)}>
				<h2 className="mb-8 text-center text-32">Sign up with</h2>
				<button type="button" className="w-75 py-4 mb-8 shadow-md radius-2" onClick={() => clickLogin()}>
					<div className="flex justify-center items-center">
						<p className="mr-4">
							<img src={GoogleImage} alt="" className="w-6 h-6" />
						</p>
						<p className="font-medium text-20">Google</p>
					</div>
				</button>
				<div className="w-75 mx-auto mb-4 text-left">
					<label htmlFor="name" className="mb-1 inline-block text-12">name</label>
					<input type="text" name="name" id="name" className="w-100 px-4 py-4 block radius-2 bg-gray-100 shadow" placeholder="enter username" />
				</div>
				<div className="w-75 mx-auto mb-4 text-left">
					<label htmlFor="email" className="mb-1 inline-block text-12">E-mail</label>
					<input type="email" name="email" id="email" className="w-100 px-4 py-4 block radius-2 bg-gray-100 shadow" placeholder="enter email" />
				</div>
				<div className="w-75 mx-auto mb-4 text-left">
					<label htmlFor="password" className="mb-1 inline-block text-12">Password</label>
					<input type="password" name="password" id="password" className="w-100 px-4 py-4 block radius-2 bg-gray-100 shadow" placeholder="enter password" />
				</div>
				<div className="w-75 mx-auto mb-8 text-left">
					<label htmlFor="password_confirmation" className="mb-1 inline-block text-12">Password(again)</label>
					<input type="password" name="password_confirmation" id="password_confirmation" className="w-100 px-4 py-4 block radius-2 bg-gray-100 shadow" placeholder="enter password(again)" />
				</div>
				<button type="submit" className="w-75 mb-3 py-3 inline-block radius-2 text-white bg-gray-800">Sign up</button>
				<p>
					<small>
						You already have account?
						<Link to={`/login`} className="ml-2 text-red-300">Sign in</Link>
					</small>
				</p>
			</form>
		</div>
	)
}

export default RegisterView