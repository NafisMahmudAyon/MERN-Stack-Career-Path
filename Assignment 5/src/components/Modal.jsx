import { X } from "lucide-react";

export default function Modal({ open, onClose, title, children }) {
	if (!open) return null;

	return (
		<div
			className="fixed inset-0 bg-black/40 backdrop-blur-xs flex justify-center items-center z-50 animate-fadeIn"
			onClick={onClose}>
			<div
				className="bg-white rounded-xl w-full max-w-[500px] shadow-2xl overflow-hidden animate-slideUp m-4"
				onClick={(e) => e.stopPropagation()}>
				<div className="p-5 border-b border-gray-200 flex justify-between items-center bg-gray-50">
					<h2 className="text-lg font-semibold">{title}</h2>
					<button
						className="p-1 rounded hover:bg-gray-200 transition-colors text-gray-500 hover:text-gray-700 cursor-pointer border-none bg-transparent"
						onClick={onClose}>
						<X size={20} />
					</button>
				</div>

				<div className="">{children}</div>
			</div>
		</div>
	);
}
