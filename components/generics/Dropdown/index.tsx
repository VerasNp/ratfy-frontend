"use client";

import { LucideChevronDown } from "lucide-react";
import { useState } from "react";

type DropdownItem = {
	icon?: React.ReactNode;
	item: React.ReactNode;
};

interface DropdownProps {
	itens?: DropdownItem[];
	trigger?: string;
	triggerIcon?: React.ReactNode;
}

export default function Dropdown({
	itens,
	trigger = "Menu",
	triggerIcon,
}: DropdownProps) {
	const [isOpen, setIsOpen] = useState(false);

	const handleClose = () => setIsOpen(false);

	return (
		<div className="relative inline-block w-full">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="w-full px-4 py-2 bg-[var(--bg-elevated-main)] border border-[var(--bg-secondary)] rounded-md text-white hover:bg-[var(--bg-elevated-hover)] transition-colors duration-200 flex items-center justify-between"
			>
				<span className="flex items-center gap-2">
					{triggerIcon}
					{trigger}
				</span>
				<LucideChevronDown
					size={20}
					className={`transition-transform duration-200 ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</button>

			{isOpen && (
				<div
					className="absolute top-full left-0 w-full mt-1 bg-[var(--bg-elevated-main)] border border-[var(--bg-secondary)] rounded-md shadow-lg z-50"
					onClick={handleClose}
				>
					<div className="py-2">
						{itens?.map((dropdownItem, index) => (
							<div
								key={index}
								className="px-4 py-2 hover:bg-[var(--bg-elevated-hover)] transition-colors duration-200 flex items-center gap-2 cursor-pointer"
							>
								{dropdownItem.icon}
								{dropdownItem.item}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
