import StarFilled from "../assets/star-filled.png";
import StarEmpty from "../assets/star-empty.png";
import XIcon from "../assets/x-icon.png";
import { TimeField } from "@mui/x-date-pickers";
import colors from "../utils/colors";
import { dateToTimeString, timeStringToDate } from "../utils/dates";

export type Todo = {
	id: number;
	text: string;
	starred: boolean;
	startTime: string | null;
	endTime: string | null;
	colorIndex: number;
};

type TodoItemProps = {
	todo: Todo;
	onChange: (next: Todo) => void;
	onDelete: (id: number) => void;
	showTimes?: boolean;
};

function textAreaAdjust(element : HTMLTextAreaElement) {
	element.style.height = "1px";
	element.style.height = (element.scrollHeight)+"px";
}

export default function TodoItem({ todo, onChange, onDelete, showTimes }: TodoItemProps) {
	return (
		<div className="todo-item">
			<button
				className="icon-button"
				onClick={() => onChange({ ...todo, starred: !todo.starred })}
			>
				<img
					src={todo.starred ? StarFilled : StarEmpty}
					alt={todo.starred ? "★" : "☆"}
					style={{ filter: colors[4]}}
					width="36px"
					/>
			</button>
			<textarea className="todo-input"
				value={todo.text}
				onChange={(e) => {onChange({ ...todo, text: e.target.value }); textAreaAdjust(e.currentTarget);}}
			/>
			{showTimes && (<>
				<TimeField
					label="Start"
					ampm={false}
					format="HH:mm"
					value={timeStringToDate(todo.startTime)}
					onChange={(value) =>
						onChange({ ...todo, startTime: dateToTimeString(value) })
					}
				/>
				<TimeField
					label="End"
					ampm={false}
					format="HH:mm"
					value={timeStringToDate(todo.endTime)}
					onChange={(value) =>
						onChange({ ...todo, endTime: dateToTimeString(value) })
					}
				/>
			</>)}
			<button className="icon-button" onClick={() => onDelete(todo.id)}>
				<img src={XIcon} alt="✕" width="36px" />
			</button>
		</div>
	);
}
