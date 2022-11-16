import { signOut } from "firebase/auth";
import { collection, DocumentData, getDoc, getDocs, onSnapshot, QuerySnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { auth, db } from "../../FirebaseConfig";
import Person1 from '../../../public/person1.jpg'
import Person2 from '../../../public/person2.jpg'

const HomeView = () => {
	const navigate = useNavigate();
	const { user } = useAuth();
	const [isClick, setClick] = useState<boolean>(false);
	const [allUser, setAllUser] = useState<any>([]);

	useEffect(() => {
		const getData = async () => {
			const docRef = collection(db, "users")
			getDocs(docRef)
				.then((snapshot: QuerySnapshot<DocumentData>) => {
					console.log(snapshot.docs.map((doc) => ({ ...doc.data() })))
					setAllUser(snapshot.docs.map((doc) => ({ ...doc.data() })));
				})
		}
		return () => {
			getData()
		}
	}, []);

	const LogOut = () => {
		signOut(auth);
		navigate('/login');
	}

	return (
		<div className="w-100 mx-auto grid grid-column-3">
			<div className="bg-gray-800 overflow-y-scroll">
				<header className="w-100 mb-6 px-4 shadow-w relative">
					<div className="py-3 flex items-center">
						<p className="mr-3">
							<img src={Person1} alt="" className="w-12 h-12 block radius-circle object-cover" />
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

				<div className="px-4">
					{allUser.map((item: any, index: number) => {
						if (item.information.uid !== user?.uid) {
							return (
								<Link to={item.information.name} className="py-3 flex items-center" key={index} state={{ data: item.information, userInformation: allUser }} >
									<p className="mr-3">
										<img src={Person1} alt="" className="w-12 h-12 block radius-circle object-cover" />
									</p>
									<div>
										<h3 className="py-1 text-white text-20 font-medium">{item.information.name}</h3>
										{/*
										<p className="text-14 text-gray-400">Hello World.</p>
										*/}
									</div>
									<div className="ml-auto text-center">

										{/* 
										<p className="mb-1 block text-white text-12">20:21</p>
										<span>
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
												<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
											</svg>
										</span>									
										
										<p className="px-2 py-1 inline-block radius-circle bg-green-400 text-12 text-white">2</p>
									*/}
									</div>
								</Link>
							)
						}
					})}
				</div>
			</div>
			<main className="h-full flex flex-col justify-between bg-gray-300">
				{/*
				<div className="px-3 overflow-y-scroll">
					<div className="px-4 py-3 flex">
						<p className="mr-3">
							<img src="src/assets/person1.jpg" alt="" className="w-12 h-12 block radius-circle object-cover" />
						</p>
						<div className="pt-2">
							<div className="mb-3 flex">
								<p className="max-w-50 mr-2 px-3 py-2 text-white bg-gray-800 radius-2 radius-tl-none">Lorem Ispum</p>
								<div className="flex flex-col justify-end">
									<p className="text-12 block">20:22</p>
									<p className="text-12 block">既読</p>
								</div>
							</div>
							<div className="flex">
								<p className="max-w-50 mr-2 px-3 py-2 text-white bg-gray-800 radius-2 radius-tl-none">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
								<div className="flex flex-col justify-end">
									<p className="text-12 block">20:22</p>
									<p className="text-12 block">既読</p>
								</div>
							</div>
						</div>
					</div>
					<div className="px-4 py-3 flex justify-end">
						<div className="pt-2">
							<div className="mb-3 flex justify-end">
								<div className="flex flex-col justify-end">
									<p className="text-12 block">20:22</p>
								</div>
								<p className="max-w-50 ml-2 px-3 py-2 bg-white radius-2 radius-tr-none">Lorem Ispum</p>
							</div>
							<div className="flex justify-end">
								<div className="flex flex-col justify-end">
									<p className="text-12 block">20:22</p>
								</div>
								<p className="max-w-50 ml-2 px-3 py-2 bg-white radius-2 radius-tr-none">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
							</div>
						</div>
						<p className="ml-3">
							<img src="src/assets/person1.jpg" alt="" className="w-12 h-12 block radius-circle object-cover" />
						</p>
					</div>
				</div>
				
				<form className="w-100" onSubmit={(e) => sendMessage(e)}>
					<div className="px-4 py-2 flex items-center bg-white">
						<input type="text" name="message" className="w-100 px-4 py-2" />
						<span className="mr-2">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
								<path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
							</svg>
						</span>
						<button type="submit" className="px-1 py-1 bg-gray-800 radius-circle">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
							</svg>
						</button>
					</div>
				</form>*/}
			</main>
		</div>
	)
}

export default HomeView