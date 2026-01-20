import { useEffect, useState } from "react";
import { useContacts } from "../context/ContactContext";
import Modal from "./Modal";

export default function ContactEditModal({ open, onClose, contact }) {
	const { updateContact } = useContacts();

	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
	});

	useEffect(() => {
		if (contact) {
			setForm({
				firstName: contact.firstName || "",
				lastName: contact.lastName || "",
				email: contact.email || "",
				phone: contact.phone || "",
			});
		}
	}, [contact]);

	const handleChange = (e) => {
		setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const ok = await updateContact(contact.id, form);
		if (ok) onClose();
	};

	if (!contact) return null;

	return (
		<Modal open={open} onClose={onClose} title="Edit Contact">
			<form className="p-6 flex flex-col gap-5" onSubmit={handleSubmit}>
				<div className="flex flex-col gap-2">
					<label className="text-sm font-medium text-gray-500">
						First Name
					</label>
					<input
						className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 focus:bg-white transition-all"
						name="firstName"
						value={form.firstName}
						onChange={handleChange}
						placeholder="First Name"
						required
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label className="text-sm font-medium text-gray-500">Last Name</label>
					<input
						className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 focus:bg-white transition-all"
						name="lastName"
						value={form.lastName}
						onChange={handleChange}
						placeholder="Last Name"
						required
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label className="text-sm font-medium text-gray-500">
						Email Address
					</label>
					<input
						className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 focus:bg-white transition-all"
						name="email"
						value={form.email}
						onChange={handleChange}
						placeholder="Email"
						type="email"
						required
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label className="text-sm font-medium text-gray-500">
						Phone Number
					</label>
					<input
						className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 focus:bg-white transition-all"
						name="phone"
						value={form.phone}
						onChange={handleChange}
						placeholder="Phone"
						required
					/>
				</div>

				<div className="flex justify-end mt-4">
					<button
						className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-transparent font-medium text-sm transition-all gap-2 bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20"
						type="submit">
						Update Contact
					</button>
				</div>
			</form>
		</Modal>
	);
}
