import "./todo.css";
import TodoItem, { Todo } from "./TodoItem";
import PlusIcon from "../assets/plus-icon.png";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

type TodoPageProps = {
    todos: Todo[];
    onChange: (next: Todo) => void;
    onDelete: (id: number) => void;
    onAdd: () => void;
};

export default function TodoPage({ todos, onChange, onDelete, onAdd }: TodoPageProps) {
    return (
        <ThemeProvider theme={appTheme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="todo-page">
            <div className="todo-list">
                {todos.map((t) => (
                    <TodoItem key={t.id} todo={t} onChange={onChange} onDelete={onDelete} />
                ))}
                <div className="todo-item">
                    <button onClick={onAdd} className="icon-button">
                        <img src={PlusIcon} alt="+" width="60px" />
                    </button>
                </div>
            </div>
        </div>
        </LocalizationProvider>
        </ThemeProvider>
    );
}