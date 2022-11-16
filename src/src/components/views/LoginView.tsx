import { auth, db } from "../../FirebaseConfig";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, updateProfile, User, UserCredential } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import GoogleImage from '../../assets/google.png';
import { doc, setDoc } from "firebase/firestore";

const LoginView = () => {
	const navigate = useNavigate();
	const google = new GoogleAuthProvider();
	const { user } = useAuth();

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user]);

	const LoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const target = e.target as typeof e.target & {
			email: {
				value: string
			}
			password: {
				value: string
			}
		}

		signInWithEmailAndPassword(auth, target.email.value, target.password.value)
			.then(() => {
				target.email.value = '';
				target.password.value = '';

				navigate('/');
			})
			.catch((err: any) => {
				console.log(err)
			})
	}

	const googleLogin = () => {
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
			<form className="w-45 py-8 bg-white radius-2" onSubmit={(e) => LoginSubmit(e)}>
				<h2 className="mb-8 text-center text-32">Sign in with</h2>
				<button type="button" className="w-75 py-4 mb-8 shadow-md radius-2" onClick={googleLogin}>
					<div className="flex justify-center items-center">
						<p className="mr-4">
							<img src={GoogleImage} alt="" className="w-6 h-6" />
						</p>
						<p className="font-medium text-20">Google</p>
					</div>
				</button>
				<div className="w-75 mx-auto mb-8 text-left">
					<label htmlFor="email" className="mb-1 inline-block text-12">E-mail</label>
					<input type="email" name="email" id="email" className="w-100 px-4 py-4 block radius-2 bg-gray-100 shadow" placeholder="enter email" />
				</div>
				<div className="w-75 mx-auto mb-8 text-left">
					<label htmlFor="password" className="mb-1 inline-block text-12">Password</label>
					<input type="password" name="password" id="password" className="w-100 px-4 py-4 block radius-2 bg-gray-100 shadow" placeholder="enter password" />
				</div>
				<button type="submit" className="w-75 mb-3 py-3 inline-block radius-2 text-white bg-gray-800">Sign in</button>
				<p>
					<small>
						You don't have account?
						<Link to={`/register`} className="ml-2 text-red-300">Sign up</Link>
					</small>
				</p>
			</form>
		</div>
	)
}

export default LoginView