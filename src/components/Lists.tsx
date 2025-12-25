import { useMemo, useState } from "react";
import "./lists.css";

type ListsProps = {
	// Optional controlled list of list names (exclude "New").
	lists: string[];
	// Optional controlled selected list name.
	selected: string;
	onSelectList?: (name: string) => void;
	onCreateList?: (name: string) => void;
	className?: string;
	hideNew?: boolean;
};

export default function Lists({ lists, selected, onSelectList=()=>{}, onCreateList=()=>{}, className, hideNew=false }: ListsProps) {
	const nextListName = useMemo(() => {
		const base = "List";
		const existingNumbers = lists
			.filter((l) => l.startsWith(base))
			.map((l) => Number(l.replace(base, "")))
			.filter((n) => !Number.isNaN(n));
		const max = existingNumbers.length ? Math.max(...existingNumbers) : 0;
		return `${base}${max + 1}`;
	}, [lists]);

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		if (value === "New") {
			const name = nextListName;
			onCreateList?.(name);
			onSelectList?.(name);
			return;
		}
		onSelectList?.(value);
	};

	// Compose options: current lists + trailing New
	const optionNames = hideNew ? lists : [...lists, "New"];

	return (
		<div className={["lists-dropdown", className].filter(Boolean).join(" ")}>
			<label className="lists-label" htmlFor="lists-select">Lists</label>
			<select id="lists-select" className="lists-select" value={selected} onChange={handleChange}>
				{optionNames.map((name) => (
					<option key={name} value={name}>
						{name}
					</option>
				))}
			</select>
		</div>
	);
}
