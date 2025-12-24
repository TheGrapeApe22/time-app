import StarFilled from "../assets/star-filled.png";
import StarEmpty from "../assets/star-empty.png";
import XIcon from "../assets/x-icon.png";
import { TimeField } from "@mui/x-date-pickers";

export type Todo = {
	id: number;
	text: string;
	starred: boolean;
};

type TodoItemProps = {
	todo: Todo;
	onChange: (next: Todo) => void;
	onDelete: (id: number) => void;
};

function textAreaAdjust(element : HTMLTextAreaElement) {
	element.style.height = "1px";
	element.style.height = (element.scrollHeight)+"px";
}

export default function TodoItem({ todo, onChange, onDelete }: TodoItemProps) {
	return (
		<div className="todo-item">
			<button
				className="icon-button"
				onClick={() => onChange({ ...todo, starred: !todo.starred })}
			>
				<img src={todo.starred ? StarFilled : StarEmpty} alt={todo.starred ? "★" : "☆"} width="36px"/>
			</button>
			<textarea className="todo-input"
				value={todo.text}
				onChange={(e) => {onChange({ ...todo, text: e.target.value }); textAreaAdjust(e.currentTarget);}}
			/>
			<TimeField label="Start" />
			<TimeField label="End" />
			<button className="icon-button" onClick={() => onDelete(todo.id)}>
				<img src={XIcon} alt="✕" width="36px" />
			</button>
		</div>
	);
}
