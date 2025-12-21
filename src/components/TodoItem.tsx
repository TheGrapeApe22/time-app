// import { useState } from "react";
import StarFilled from "../assets/star-filled.png";
import StarEmpty from "../assets/star-empty.png";
import XIcon from "../assets/x-icon.png";
import { MobileTimePicker } from "@mui/x-date-pickers";

export type Todo = {
	id: number;
	text: string;
	starred: boolean;
};

type TodoItemProps = {
	todo: Todo;
	onChange: (id: number, newText: string) => void;
	onDelete: (id: number) => void;
	onToggleStar: (id: number) => void;
};

function textAreaAdjust(element : HTMLTextAreaElement) {
	element.style.height = "1px";
	element.style.height = (element.scrollHeight)+"px";
}

export default function TodoItem({ todo, onChange, onDelete, onToggleStar }: TodoItemProps) {
	return (
		<div className="todo-item">
			<button
				className="icon-button"
				onClick={() => onToggleStar(todo.id)}
			>
				<img src={todo.starred ? StarFilled : StarEmpty} alt={todo.starred ? "★" : "☆"} width="36px"/>
			</button>
			<textarea className="todo-input"
				value={todo.text}
				onChange={(e) => {onChange(todo.id, e.target.value); textAreaAdjust(e.currentTarget);}}
			/>
			<MobileTimePicker label="Select Time" />
			<button className="icon-button" onClick={() => onDelete(todo.id)}>
				<img src={XIcon} alt="✕" width="36px" />
			</button>
		</div>
	);
}
