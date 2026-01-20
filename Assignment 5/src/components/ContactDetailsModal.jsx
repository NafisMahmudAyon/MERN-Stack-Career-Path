import Modal from "./Modal";
import { SquarePen } from "lucide-react";

export default function ContactDetailsModal({
	open,
	onClose,
	contact,
	onEdit,
}) {
	if (!contact) return null;

	return (
		<Modal open={open} onClose={onClose} title="Contact Details">
			<div className="p-6 flex flex-col gap-3 text-gray-800">
				<p>
					<b className="font-semibold">First Name:</b> {contact.firstName}
				</p>
				<p>
					<b className="font-semibold">Last Name:</b> {contact.lastName}
				</p>
				<p>
					<b className="font-semibold">Email:</b> {contact.email}
				</p>
				<p>
					<b className="font-semibold">Phone:</b> {contact.phone}
				</p>
			</div>

			<div className="p-6 pt-0 flex justify-end">
				<button
					className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 hover:bg-gray-50 transition-colors gap-2 font-medium text-sm"
					onClick={onEdit}>
					<SquarePen size={16} />
					Edit
				</button>
			</div>
		</Modal>
	);
}
