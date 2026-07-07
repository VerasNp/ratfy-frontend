"use client";

import { useState, useEffect, useRef, useId } from "react";

export type DropdownItem = {
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
  const [verticalPos, setVerticalPos] = useState<"bottom" | "top">("bottom");
  const [horizontalPos, setHorizontalPos] = useState<"left" | "right">(align);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const handleClose = () => setIsOpen(false);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (isOpen && menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();

      if (rect.bottom > window.innerHeight) {
        setVerticalPos("top");
      } else {
        setVerticalPos("bottom");
      }

      if (rect.left < 0) {
        setHorizontalPos("left");
      } else if (rect.right > window.innerWidth) {
        setHorizontalPos("right");
      }
    } else {
      setVerticalPos("bottom");
      setHorizontalPos(align);
    }
  }, [isOpen, align]);

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
    if (isOpen && menuRef.current) {
      const firstItem = menuRef.current.querySelector<HTMLButtonElement>(
        '[role="menuitem"]',
      );
      firstItem?.focus();
    }
  }, [isOpen]);

  const verticalClass = verticalPos === "bottom" ? "top-full mt-2" : "bottom-full mb-2";
  const horizontalClass = horizontalPos === "right" ? "right-0" : "left-0";

  return (
    <div
      className="relative inline-block w-full"
      ref={dropdownRef}
      data-state={isOpen ? "open" : "closed"}
    >
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={menuId}
        className="flex items-center justify-center cursor-pointer relative z-10 w-full"
      >
        {triggerComponent || "Dropdown"}
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute ${verticalClass} ${horizontalClass} min-w-[220px] bg-[var(--bg-elevated-highlight)] rounded-md shadow-2xl z-50 p-1`}
          onClick={handleMenuClick}
          id={menuId}
          role="menu"
        >
          {itens?.map((dropdownItem) => (
            <button
              key={dropdownItem.id}
              role="menuitem"
              className="px-3 py-3 w-full text-left hover:bg-white/10 rounded-sm transition-colors duration-200 flex items-center gap-3 cursor-pointer text-white"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dropdownItem.onSelect?.();
                handleClose();
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
