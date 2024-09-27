import Link from "next/link";
interface NavLinkProps {
	href: string;
	text: string;
}

const NavLink = ({ href, text } : NavLinkProps) => {
	return (
		<Link href={href}>
			<span className="decoration-auto">{text}</span>
		</Link>
	)
}
export default NavLink;

