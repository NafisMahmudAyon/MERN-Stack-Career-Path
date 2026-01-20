import ContactTable from "../components/ContactTable";
import FilterBar from "../components/FilterBar";
import Header from "../components/Header";

export default function Home() {
	return (
		<div>
			<Header />

			<div className="container mx-auto p-8">
				<FilterBar />
				<div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
					<ContactTable />
				</div>
			</div>
		</div>
	);
}
