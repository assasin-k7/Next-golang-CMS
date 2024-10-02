"use client";
import NavLink from './NavLink'
import { useEffect, useState } from "react"
import Logo from "../logo"
import Link from "next/link"

type NavLink = {
	slug: string;
	text: string;
}
// This component is 
export default function HeaderBar() {
	const [navLinks, setNavLinks] = useState<NavLink[]>([])
  useEffect( () => {
    fetch("/api/page")
    .then((res) => res.json())
	.then((res) =>{
		if (res.hasError) throw new Error("Error fetching nav links")
		console.log(res)
	})

  },[])
	return (
		<header className={`fixed w-full bg-primary bg-opacity-90 backdrop-blur-lg  px-10 py-3`}>
			<nav className={`flex-initial w-64 p-3 items-center justify-between md:justify-around`}>
				<Link href={"/"}>
					<div className="cursor-pointer">
						<Logo />
					</div>
				</Link>
			</nav>
			<div className="flex">
				{navLinks.length !== 0 && navLinks.slice(0, 5).map((item, index) => (
					<p key={index}>
						<NavLink href={`/${item.slug}`} text={item.text}/>
					</p>
				))}
			</div>
		</header>
	)
}