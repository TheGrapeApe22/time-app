export type Todo = {
	id: number;
	text: string;
};

type TodoItemProps = {
	todo: Todo;
	onChange: (id: number, newText: string) => void;
};

export default function TodoItem({ todo, onChange }: TodoItemProps) {
	return (
		<div className="todo-item">
			<input
				value={todo.text}
				onChange={(e) => onChange(todo.id, e.target.value)}
			/>
			<button className="x-button">✕</button>
		</div>
	);
}
