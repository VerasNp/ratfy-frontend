"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

interface DateInputProps {
	day: string;
	setDay: (val: string) => void;
	month: string;
	setMonth: (val: string) => void;
	year: string;
	setYear: (val: string) => void;
}

export default function DateInput({ day, setDay, month, setMonth, year, setYear }: DateInputProps) {
	const months = [
		"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
		"Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
	];

	const baseInputClass = "bg-[var(--bg-elevated-main)] border-[var(--bg-secondary)] border text-primary rounded-md h-11 px-3 outline-none focus:ring-1 focus:ring-white transition-all duration-200 text-sm";

	return (
		<div className="flex gap-3 w-full">
			<input
				type="text"
				placeholder="dd"
				maxLength={2}
				className={`${baseInputClass} w-[25%]`}
				value={day}
				onChange={(e) => setDay(e.target.value.replace(/\D/g, ""))}
			/>
			
			<div className="relative flex-1">
				<select
					className={`${baseInputClass} w-full appearance-none pr-10 cursor-pointer text-white invalid:text-[var(--text-secondary)]`}
					value={month}
					onChange={(e) => setMonth(e.target.value)}
					required
				>
					<option value="" disabled hidden>Mês</option>
					{months.map((m, index) => {
						const monthValue = String(index + 1).padStart(2, '0');
						return (
							<option key={index} value={monthValue} className="text-black bg-white">
								{m}
							</option>
						)
					})}
				</select>
				<div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
					<ChevronDown size={20} />
				</div>
			</div>

			<input
				type="text"
				placeholder="aaaa"
				maxLength={4}
				className={`${baseInputClass} w-[30%]`}
				value={year}
				onChange={(e) => setYear(e.target.value.replace(/\D/g, ""))}
			/>
		</div>
	);
}