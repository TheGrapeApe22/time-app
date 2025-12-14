import { useRef, useState } from "react";
import TodoItem, { Todo } from "./TodoItem";
import "./todo.css";

export default function TodoPage() {
    const [todos, setTodos] = useState<Todo[]>([
        { id: 1, text: "Buy milk" },
        { id: 2, text: "Read a book" },
    ]);

    const nextId = useRef(3);

    const handleChange = (id: number, newText: string) => {
        setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text: newText } : t)));
    };

    const [newText, setNewText] = useState("");
    const addTodo = () => {
        const text = newText.trim();
        if (!text) return;
        setTodos((prev) => [...prev, { id: nextId.current++, text }]);
        setNewText("");
    };

    return (
        <div className="todo-page">
            <div className="todo-list">
                {todos.map((t) => (
                    <TodoItem key={t.id} todo={t} onChange={handleChange} />
                ))}

                <div className="todo-item">
                    <input
                        placeholder="Add a todo"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                    />
                    <button onClick={addTodo} className="add-button">＋</button>
                </div>
            </div>
        </div>
    );
}