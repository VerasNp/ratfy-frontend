"use client";

import { useState, useEffect, useRef } from "react";

type DropdownItem = {
    icon?: React.ReactNode;
    item: React.ReactNode;
};

interface DropdownProps {
    itens?: DropdownItem[];
    triggerComponent?: React.ReactNode;
}

export default function Dropdown({
    itens,
    triggerComponent
}: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClose = () => setIsOpen(false);

    const handleMenuClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block w-full" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 text-white flex items-center justify-between cursor-pointer"
            >
                <span className="flex items-center gap-2">
                    {triggerComponent || "Dropdown"}
                </span>
            </button>

            {isOpen && (
                <div
                    className="absolute top-full left-0 w-full mt-1 bg-[var(--bg-elevated-main)] rounded-sm z-50"
                    onClick={handleMenuClick}
                >
                    <div className="py-2">
                        {itens?.map((dropdownItem, index) => (
                            <div
                                key={index}
                                className="mx-1 px-4 py-2 hover:bg-[var(--bg-elevated-highlight)] rounded-sm transition-colors duration-200 flex items-center gap-2 cursor-pointer"
                                onClick={handleClose}
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