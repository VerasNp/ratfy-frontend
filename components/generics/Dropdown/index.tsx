"use client";

import { useState, useEffect, useRef, useId } from "react";

type DropdownItem = {
	icon?: React.ReactNode;
	item: React.ReactNode;
	id: string;
	onSelect?: () => void;
};

interface DropdownProps {
	items?: DropdownItem[];
	triggerComponent?: React.ReactNode;
	align?: "left" | "right";
}

export default function Dropdown({
	items: itens,
	triggerComponent,
	align = "right",
}: DropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);

	const handleClose = () => setIsOpen(false);

	const handleMenuClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	const menuId = useId();

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		if (!isOpen) return;
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setIsOpen(false);
				triggerRef.current?.focus();
			}
		};
		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, [isOpen]);

	useEffect(() => {
		if (isOpen && dropdownRef.current) {
			const firstItem =
				dropdownRef.current.querySelector<HTMLButtonElement>(
					'[role="menuitem"]',
				);
			firstItem?.focus();
		}
	}, [isOpen]);

	const alignmentClass = align === "right" ? "right-0" : "left-0";

	return (
		<div className="relative inline-block" ref={dropdownRef}>
			<button
				ref={triggerRef}
				onClick={() => setIsOpen(!isOpen)}
				aria-expanded={isOpen}
				aria-haspopup="menu"
				aria-controls={menuId}
				className="flex items-center justify-center cursor-pointer relative z-10"
			>
				{triggerComponent || "Dropdown"}
			</button>

			{isOpen && (
				<div
					className={`absolute top-full ${alignmentClass} min-w-[220px] mt-2 bg-[var(--bg-elevated-highlight)] rounded-md shadow-2xl z-50 p-1`}
					onClick={handleMenuClick}
					id={menuId}
					role="menu"
				>
					{itens?.map((dropdownItem) => (
						<button
							key={dropdownItem.id}
							role="menuitem"
							className="px-3 py-3 w-full text-left hover:bg-white/10 rounded-sm transition-colors duration-200 flex items-center gap-3 cursor-pointer text-white"
							onClick={() => {
								handleClose();
								dropdownItem.onSelect?.();
							}}
						>
							{dropdownItem.icon}
							{dropdownItem.item}
						</button>
					))}
				</div>
			)}
		</div>
	);
}