import { useEffect, useState } from 'react'
import { auth, db } from '../../FirebaseConfig';
import { collection, DocumentData, getDocs, QuerySnapshot } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useAuth } from '../../Context/AuthContext';
import person1 from '../../../public/person1.jpg'
import person2 from '../../../public/person2.jpg'

const HomeView = () => {
	const navigate = useNavigate();
	const { user } = useAuth();
	const [allUser, setAllUser] = useState<any>([])
	const [isClick, setClick] = useState<boolean>(false);
	const docRef = collection(db, "users")
	
	useEffect(() => {
		getDocs(docRef)
		.then((snapshot: QuerySnapshot<DocumentData>) => {
			setAllUser(snapshot.docs.map((doc) => ({ ...doc.data() })));
		})
	}, []);

	const LogOut = () => {
		signOut(auth);
		navigate('/login');
	}
	
	return (
		<div className='w-100 mx-auto grid grid-column-3'>
			<div className="bg-gray-800 overflow-y-scroll">
				<header className="w-100 mb-6 px-4 shadow-w relative spx-4 sflex-col">
					<div className="py-3 flex items-center">
						<p className="mr-3">
							<img src={person1} alt="" className="w-12 h-12 block radius-circle object-cover" />
						</p>
						{allUser.map((item: any, index: number) => {
							if (item.information.uid === user?.uid) {
								return (
									<h3 className="py-1 text-white text-20 font-medium" key={index}>{item.information.name}</h3>
								)
							}
						})}
						<div className="ml-auto">
							<button onClick={() => { setClick(!isClick) }}>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400 ">
									<path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
								</svg>
							</button>
						</div>
						<div className={isClick ? "py-4 bg-white radius-0_5 absolute top-12 right-4" : "hidden"}>
							<Link to={'/adduser'} className="mb-2 px-12 py-3 hover-bg-gray-200 block" >AddUser</Link>
							<button className="w-100 px-12 py-3 block hover-bg-gray-200 block" onClick={() => LogOut()}>LogOut</button>
						</div>
					</div>
				</header>
				{/*
				<form className="mb-4 px-3 py-2 radius-0_5 shadow-w">
					<div className="flex">
						<span className="block">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
								<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
							</svg>
						</span>
						<input type="text" name="search" id="search" className="px-2 py-1 mr-2 block text-white" placeholder="Search User" />
					</div>
				</form>				
				*/}

				<div className="px-4 spx-4">
					{allUser.map((item: any, index: number) => {
						if(item.information.uid !== user?.uid) {
							return (
								<Link to={item.information.name} className="py-3 flex items-center sflex-col" key={index} state={{ data: item.information, userInformation: allUser }} >
									<p className="mr-3">
										<img src={person1} alt="" className="w-12 h-12 block radius-circle object-cover" />
									</p>
									<div>
										<h3 className="py-1 text-white text-20 font-medium">{item.information.name}</h3>
										{/*
									<p className="text-14 text-gray-400">Hello World.</p>
									*/}
									</div>
									{/* <div className="ml-auto text-center">

									
									<p className="mb-1 block text-white text-12">20:21</p>
									<span>
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
											<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
										</svg>
									</span>									
									
									<p className="px-2 py-1 inline-block radius-circle bg-green-400 text-12 text-white">2</p>
								
								</div>*/}
								</Link>
							)
						}
					})}
				</div>
			</div>
			<main className="h-full flex flex-col justify-between bg-gray-300"></main>
		</div>
	)
}

export default HomeView