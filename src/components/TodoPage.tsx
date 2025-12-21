import "./todo.css";
import { useRef, useState } from "react";
import TodoItem, { Todo } from "./TodoItem";
import PlusIcon from "../assets/plus-icon.png";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function TodoPage() {
    const [todos, setTodos] = useState<Todo[]>([
        { id: 1, text: "Do stuff", starred: false },
    ]);

    const nextId = useRef(2);

    const handleChange = (id: number, newText: string) => {
        setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text: newText } : t)));
    };

    const handleDelete = (id: number) => {
        setTodos((prev) => prev.filter((t) => t.id !== id));
    };

    const handleToggleStar = (id: number) => {
        setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, starred: !t.starred } : t)));
    };

    const addTodo = () => {
        setTodos((prev) => [...prev, { id: nextId.current++, text: "", starred: false }]);
    };

    return (
        <ThemeProvider theme={appTheme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="todo-page">
            <div className="title">Todo</div>
            <div className="todo-list">
                {todos.map((t) => (
                    <TodoItem key={t.id} todo={t} onChange={handleChange} onDelete={handleDelete} onToggleStar={handleToggleStar} />
                ))}
                <div className="todo-item">
                    <button onClick={addTodo} className="icon-button">
                        <img src={PlusIcon} alt="+" width="60px" />
                    </button>
                </div>
            </div>
        </div>
        </LocalizationProvider>
        </ThemeProvider>
    );
}