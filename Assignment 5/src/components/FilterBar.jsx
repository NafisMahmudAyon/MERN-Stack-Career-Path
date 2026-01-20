import { useNavigate } from "react-router-dom";
import { useContacts } from "../context/ContactContext";
import { Plus, SlidersVertical } from "lucide-react";

export default function FilterBar() {
	const navigate = useNavigate();
	const { searchText, setSearchText, filterBy, setFilterBy } = useContacts();

	return (
		<div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col gap-6 mb-8 md:flex-row md:items-center md:justify-between">
			<div className="flex items-center gap-4 flex-wrap w-full">
				{/* <h2 className="text-2xl font-bold text-gray-900 m-0">All Contacts</h2> */}

				<div className="flex gap-2 flex-1 max-w-[500px]">
					<input
						className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm transition-all bg-gray-50 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 focus:bg-white"
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						placeholder="Search contacts..."
					/>
				</div>

				<div className="ml-auto flex gap-4 items-center">
					<button
						className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-transparent font-medium text-sm transition-all gap-2 hover:-translate-y-px active:translate-y-0 bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20"
						onClick={() => navigate("/add")}>
						<Plus size={16} />
						New Contact
					</button>
				</div>
			</div>

			<div className="flex gap-4 items-center pt-4 border-l-0 md:border-l pl-0 md:pl-6 border-gray-200 mt-0 flex-wrap">
				<div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
					<SlidersVertical size={16} />
					<span>Sort By:</span>
				</div>

				<select
					className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm transition-all bg-gray-50 cursor-pointer focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 focus:bg-white"
					value={filterBy}
					onChange={(e) => setFilterBy(e.target.value)}>
					<option value="default">Default</option>
					<option value="firstName">First Name (A → Z)</option>
					<option value="lastName">Last Name (A → Z)</option>
					<option value="oldest">Date Created</option>
				</select>
			</div>
		</div>
	);
}
