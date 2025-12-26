import Clock from './Clock';
import TodoPage from './TodoPage';
import type { Todo } from './TodoItem';
import Lists from './Lists';
import React from 'react';

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
	importTodosFrom: (sourceName: string, targetName: string) => void;
	focusId?: number;
};

export default function ClockPage({title, listKey, colors, listsData, addTodoTo, updateTodoIn, deleteTodoFrom, importTodosFrom, focusId}: ClockPageProps) {
	const initialImport = "Import from...";
	const [importListKey, setImportListKey] = React.useState<string>(initialImport);

	return (
		<>
			<div className="title">{title}</div>
			<Lists
				lists={[initialImport, ...Object.keys(listsData).filter((k) => k !== listKey)]}
				selected={importListKey}
				hideNew={true}
				onSelectList={(newList) => {
					if (newList === initialImport) {
						setImportListKey(newList);
						return;
					}
					if (window.confirm(`Import list from "${newList}" into "${listKey}"? This will replace all existing items in "${listKey}".`)) {
						importTodosFrom(newList, listKey);
						setImportListKey(newList);
					}
				}}
			/>
			<Clock
				todos={listsData[listKey].todos}
				outlineColor={colors.outline}
				fillColor={colors.fill}
				shadeColor={colors.shade}
			/>
			<TodoPage
				todos={listsData[listKey].todos}
				onAdd={() => addTodoTo(listKey)}
				onChange={(next) => updateTodoIn(listKey, next)}
				onDelete={(id) => deleteTodoFrom(listKey, id)}
				minimize={false}
				focusId={focusId}
			/>
		</>
	);
}

