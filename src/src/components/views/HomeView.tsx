import { useEffect, useState } from 'react'
import { db } from '../../FirebaseConfig';
import { collection, DocumentData, getDocs, QuerySnapshot } from 'firebase/firestore';


const HomeView = () => {
	const [allUser, setAllUser] = useState<any>([])
	const docRef = collection(db, "users")

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