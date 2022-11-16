import { useEffect, useState } from 'react'
import { auth, db } from '../../FirebaseConfig';
import { collection, DocumentData, getDocs, QuerySnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';


const HomeView = () => {
	const navigate = useNavigate();
	const [allUser, setAllUser] = useState<any>([])
	const docRef = collection(db, "users")
	
	useEffect(() => {
		getDocs(docRef)
		.then((snapshot: QuerySnapshot<DocumentData>) => {
			console.log(snapshot.docs.map((doc) => ({ ...doc.data() })))
			setAllUser(snapshot.docs.map((doc) => ({ ...doc.data() })));
		})
	}, []);

	const LogOut = () => {
		signOut(auth);
		navigate('/login');
	}
	
	return (
		<div>
			<h1>Home</h1>
			{allUser.map((item: any, index: number) => {
				return (
					<p key={index}>{item.information.name}</p>
				)
			})}
			<button onClick={LogOut}>Logout</button>
		</div>
	)
}

export default HomeView