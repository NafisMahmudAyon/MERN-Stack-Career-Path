import { Link } from "react-router-dom";

export default function Header() {
	return (
		<div className="bg-white px-8 py-4 border-b border-gray-200 shadow-sm flex items-center justify-between">
			<div className="container mx-auto font-extrabold text-xl text-indigo-600 tracking-tight flex items-center gap-2">
				<Link to="/">CONTACT APP</Link>
			</div>
		</div>
	);
}
