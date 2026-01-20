import { useState } from "react";
import { useContacts } from "../context/ContactContext";
import ContactDetailsModal from "./ContactDetailsModal";
import ContactEditModal from "./ContactEditModal";
import { Eye, Hash, Trash, SquarePen } from "lucide-react";

export default function ContactTable() {
	const { filteredContacts, loading, deleteContact } = useContacts();

	const [selectedContact, setSelectedContact] = useState(null);

	const [showModalOpen, setShowModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);

	const openShowModal = (contact) => {
		setSelectedContact(contact);
		setShowModalOpen(true);
	};

	const openEditModal = (contact) => {
		setSelectedContact(contact);
		setEditModalOpen(true);
	};

	const handleDelete = async (id) => {
		const confirm = window.confirm(
			"Are you sure you want to delete this contact?",
		);
		if (!confirm) return;
		await deleteContact(id);
	};

	if (loading) {
		return <div className="text-center p-8 text-gray-500">Loading...</div>;
	}

	if (!filteredContacts.length) {
		return (
			<div className="text-center p-8 text-gray-500">
				No Contact Information
			</div>
		);
	}

	return (
		<>
			<div className="overflow-x-auto">
				<table className="w-full border-separate border-spacing-0">
					<thead>
						<tr>
							<th className="text-left p-4 bg-gray-50 text-gray-500 font-semibold text-xs uppercase tracking-wider border-b border-gray-200 first:rounded-tl-lg">
								<Hash size={16} />
							</th>
							<th className="text-left p-4 bg-gray-50 text-gray-500 font-semibold text-xs uppercase tracking-wider border-b border-gray-200">
								First Name
							</th>
							<th className="text-left p-4 bg-gray-50 text-gray-500 font-semibold text-xs uppercase tracking-wider border-b border-gray-200">
								Last Name
							</th>
							<th className="text-left p-4 bg-gray-50 text-gray-500 font-semibold text-xs uppercase tracking-wider border-b border-gray-200">
								Email
							</th>
							<th className="text-left p-4 bg-gray-50 text-gray-500 font-semibold text-xs uppercase tracking-wider border-b border-gray-200">
								Phone
							</th>
							<th
								className="text-left p-4 bg-gray-50 text-gray-500 font-semibold text-xs uppercase tracking-wider border-b border-gray-200 last:rounded-tr-lg"
								style={{ width: 200 }}>
								Actions
							</th>
						</tr>
					</thead>

					<tbody>
						{filteredContacts.map((c, index) => (
							<tr
								key={c.id}
								className="transition-colors duration-100 hover:bg-gray-50 group">
								<td className="p-4 border-b border-gray-200 text-gray-900 text-sm group-last:border-b-0">
									{index + 1}
								</td>
								<td className="p-4 border-b border-gray-200 text-gray-900 text-sm group-last:border-b-0">
									{c.firstName}
								</td>
								<td className="p-4 border-b border-gray-200 text-gray-900 text-sm group-last:border-b-0">
									{c.lastName}
								</td>
								<td className="p-4 border-b border-gray-200 text-gray-900 text-sm group-last:border-b-0">
									{c.email}
								</td>
								<td className="p-4 border-b border-gray-200 text-gray-900 text-sm group-last:border-b-0">
									{c.phone}
								</td>
								<td className="p-4 border-b border-gray-200 text-gray-900 text-sm group-last:border-b-0 flex gap-2">
									<button
										className="w-8 h-8 rounded-md border border-gray-200 bg-white flex items-center justify-center cursor-pointer transition-all text-sm hover:border-indigo-600 hover:text-indigo-600"
										title="View Details"
										onClick={() => openShowModal(c)}>
										<Eye size={16} />
									</button>
									<button
										className="w-8 h-8 rounded-md border border-gray-200 bg-white flex items-center justify-center cursor-pointer transition-all text-sm hover:border-indigo-600 hover:text-indigo-600"
										title="Edit Contact"
										onClick={() => openEditModal(c)}>
										<SquarePen size={16} />
									</button>
									<button
										className="w-8 h-8 rounded-md border border-gray-200 bg-white flex items-center justify-center cursor-pointer transition-all text-sm hover:border-red-500 hover:text-red-500"
										title="Delete Contact"
										onClick={() => handleDelete(c.id)}>
										<Trash size={16} />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* ✅ Show Modal */}
			<ContactDetailsModal
				open={showModalOpen}
				onClose={() => setShowModalOpen(false)}
				contact={selectedContact}
				onEdit={() => {
					setShowModalOpen(false);
					setEditModalOpen(true);
				}}
			/>

			{/* ✅ Edit Modal */}
			<ContactEditModal
				open={editModalOpen}
				onClose={() => setEditModalOpen(false)}
				contact={selectedContact}
			/>
		</>
	);
}
