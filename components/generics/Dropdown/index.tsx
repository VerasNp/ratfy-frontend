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
}

export default function Dropdown({
	items: itens,
	triggerComponent,
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

	return (
		<div className="relative inline-block w-full" ref={dropdownRef}>
			<button
				ref={triggerRef}
				onClick={() => setIsOpen(!isOpen)}
				aria-expanded={isOpen}
				aria-haspopup="menu"
				aria-controls={menuId}
				className="px-4 py-2 text-white flex items-center justify-between cursor-pointer relative z-10"
			>
				<span className="flex items-center gap-2">
					{triggerComponent || "Dropdown"}
				</span>
			</button>

			{isOpen && (
				<div
					className="absolute top-full left-0 w-full mt-1 bg-bg-elevated-main rounded-sm z-50"
					onClick={handleMenuClick}
					id={menuId}
					role="menu"
				>
					<div className="m-1 ">
						{itens?.map((dropdownItem) => (
							<button
								key={dropdownItem.id}
								role="menuitem"
								className="px-2 py-2 w-full text-left hover:bg-bg-elevated-highlight rounded-sm transition-colors duration-200 flex items-center gap-2 cursor-pointer"
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
				</div>
			)}
		</div>
	);
}
