"use client";
import NavLink from './NavLink'
import { useEffect, useState } from "react"
import Logo from "../logo"
import Link from "next/link"

type NavLink = {
  slug: string;
  text: string;
}
// const MenuSidebar = () => {
//   return (
//     <>
//       {/* Dark overlay */}
//       <div onClick={()=>toggleMenu()}>

//       </div>
//     </>
//   )
// }
// This component is 
export default function HeaderBar() {
  const [navLinks, setNavLinks] = useState<NavLink[]>([])
  useEffect(() => {
    fetch("/api/page")
      .then((res) => res.json())
      .then((res) => {
        if (res.hasError) throw new Error("Error fetching nav links")
        setNavLinks(res.payload)
      })

  }, [])
  return (
    <header className={`flex fixed w-full  bg-opacity-90 backdrop-blur-lg  px-20 py-3 bg-blue-500 md:justify-around items-center`}>
      <nav className={`flex-initial w-64 p-3 items-center justify-between md:justify-around `}>
        <Link href={"/"}>
          <div className="cursor-pointer">
            <Logo />
          </div>
        </Link>
      </nav>
      <div className="flex gap-5">
        {navLinks.length !== 0 && navLinks.slice(0, 5).map((item, index) => (
          <p key={index}>
            <NavLink href={`/${item.slug}`} text={item.text} />
          </p>
        ))}
      </div>
    </header>
  )
}