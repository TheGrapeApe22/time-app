import { useMemo, useState } from "react";
import "./lists.css";

type ListsProps = {
	// Optional controlled list of list names (exclude "New").
	lists?: string[];
	// Optional controlled selected list name.
	selected?: string;
	onSelectList?: (name: string) => void;
	onCreateList?: (name: string) => void;
	className?: string;
};

export default function Lists({ lists, selected, onSelectList, onCreateList, className }: ListsProps = {}) {
	// Uncontrolled fallbacks
	const [internalLists, setInternalLists] = useState<string[]>(["Todo", "Cluster", "Plan Amaj7", "Plan B"]);
	const [internalSelected, setInternalSelected] = useState<string>("Todo");

	const isListsControlled = Array.isArray(lists);
	const isSelectedControlled = typeof selected === "string";

	const effectiveLists = isListsControlled ? (lists as string[]) : internalLists;
	const effectiveSelected = isSelectedControlled ? (selected as string) : internalSelected;

	const nextListName = useMemo(() => {
		const base = "List";
		const existingNumbers = effectiveLists
			.filter((l) => l.startsWith(base))
			.map((l) => Number(l.replace(base, "")))
			.filter((n) => !Number.isNaN(n));
		const max = existingNumbers.length ? Math.max(...existingNumbers) : 0;
		return `${base}${max + 1}`;
	}, [effectiveLists]);

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		if (value === "New") {
			const name = nextListName;
			// Uncontrolled update: mutate local state
			// if (!isListsControlled) {
			// 	setInternalLists((prev) => [...prev, name]);
			// }
			// if (!isSelectedControlled) {
			// 	setInternalSelected(name);
			// }
			onCreateList?.(name);
			onSelectList?.(name);
			return;
		}
		// Selecting existing list
		if (!isSelectedControlled) {
			setInternalSelected(value);
		}
		onSelectList?.(value);
	};

	// Compose options: current lists + trailing New
	const optionNames = [...effectiveLists, "New"];

	return (
		<div className={["lists-dropdown", className].filter(Boolean).join(" ")}>
			<label className="lists-label" htmlFor="lists-select">Lists</label>
			<select id="lists-select" className="lists-select" value={effectiveSelected} onChange={handleChange}>
				{optionNames.map((name) => (
					<option key={name} value={name}>
						{name}
					</option>
				))}
			</select>
		</div>
	);
}

