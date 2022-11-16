import { useEffect, useState } from 'react'
import { db } from '../../FirebaseConfig';
import { collection, DocumentData, getDocs, QuerySnapshot } from 'firebase/firestore';


const HomeView = () => {
	const [allUser, setAllUser] = useState<any>([])
	const docRef = collection(db, "users")
	
	useEffect(() => {
		getDocs(docRef)
		.then((snapshot: QuerySnapshot<DocumentData>) => {
			console.log(snapshot.docs.map((doc) => ({ ...doc.data() })))
			setAllUser(snapshot.docs.map((doc) => ({ ...doc.data() })));
		})
	}, []);
	return (
		<div>
			<h1>Home</h1>
			{allUser.map((item: any, index: number) => {
				return (
					<p key={index}>{item.information.name}</p>
				)
			})}
		</div>
	)
}

export default HomeView