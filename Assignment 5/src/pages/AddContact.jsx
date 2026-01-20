import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useContacts } from "../context/ContactContext";

export default function AddContact() {
	const navigate = useNavigate();
	const { addContact } = useContacts();

	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
	});

	const handleChange = (e) => {
		setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const ok = await addContact(form);
		if (ok) navigate("/");
	};

	return (
		<div>
			<Header />

			<div className="container mx-auto p-8">
				<div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
					<h2 className="text-2xl font-bold text-gray-900 mb-6">
						Add New Contact
					</h2>

					<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
						<div className="flex flex-col gap-2">
							<label className="text-sm font-medium text-gray-500" htmlFor="firstName">
								First Name
							</label>
							<input
								className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 focus:bg-white transition-all"
								id="firstName"
								name="firstName"
								value={form.firstName}
								onChange={handleChange}
								placeholder="e.g. John"
								required
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label className="text-sm font-medium text-gray-500" htmlFor="lastName">
								Last Name
							</label>
							<input
								className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 focus:bg-white transition-all"
								id="lastName"
								name="lastName"
								value={form.lastName}
								onChange={handleChange}
								placeholder="e.g. Doe"
								required
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label className="text-sm font-medium text-gray-500" htmlFor="email">
								Email Address
							</label>
							<input
								className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 focus:bg-white transition-all"
								id="email"
								name="email"
								type="email"
								value={form.email}
								onChange={handleChange}
								placeholder="john@example.com"
								required
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label className="text-sm font-medium text-gray-500" htmlFor="phone">
								Phone Number
							</label>
							<input
								className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 focus:bg-white transition-all"
								id="phone"
								name="phone"
								value={form.phone}
								onChange={handleChange}
								placeholder="+1 (555) 000-0000"
								required
							/>
						</div>

						<div className="flex gap-2 mt-4">
							<button
								className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-transparent font-medium text-sm transition-all gap-2 bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20"
								type="submit">
								Save Contact
							</button>
							<button
								className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-red-500 font-medium text-sm transition-all gap-2 bg-white text-red-500 hover:bg-red-50"
								type="button"
								onClick={() => navigate("/")}>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
