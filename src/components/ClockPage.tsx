import Clock from './Clock';
import TodoPage from './TodoPage';
import type { Todo } from './TodoItem';
import defaultTodoList from '../utils/defaultTodoList';

type Colors = {
	outline: string;
	fill: string;
	shade: string;
};

type ClockPageProps = {
	title: string;
	listKey: string;
	colors: Colors;
	listsData: Record<string, { todos: Todo[]; nextId: number }>;
	addTodoTo: (listName: string) => void;
	updateTodoIn: (listName: string, next: Todo) => void;
	deleteTodoFrom: (listName: string, id: number) => void;
};

export default function ClockPage({title, listKey, colors, listsData, addTodoTo, updateTodoIn, deleteTodoFrom}: ClockPageProps) {
	const bucket = listsData[listKey] ?? defaultTodoList;

	return (
		<>
			<div className="title">{title}</div>
			<Clock
				todos={bucket.todos}
				outlineColor={colors.outline}
				fillColor={colors.fill}
				shadeColor={colors.shade}
			/>
			<TodoPage
				todos={bucket.todos}
				onAdd={() => addTodoTo(listKey)}
				onChange={(next) => updateTodoIn(listKey, next)}
				onDelete={(id) => deleteTodoFrom(listKey, id)}
				minimize={false}
			/>
		</>
	);
}

