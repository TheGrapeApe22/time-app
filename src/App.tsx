import React, { useEffect, useMemo, useState } from 'react';
import Clock from './components/Clock';
import './App.css';
import TodoPage from './components/TodoPage';
import TabIcon1 from './assets/todo-icon.jpg';
import TabIcon2 from './assets/cluster-icon.png';
import TabIcon3 from './assets/amaj7-icon.png';
import TabIcon4 from './assets/plan-b-icon.png';
import Lists from './components/Lists';
import type { Todo } from './components/TodoItem';
import { getDefaultTodoLists, loadTodoLists, saveTodoLists, TODO_STORAGE_VERSION } from './storage/todoStorage';
import defaultTodoList from './constants/defaultTodoList';

type TabKey = 'todo' | 'cluster' | 'amaj7' | 'planb';

function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('todo');
  const initial = loadTodoLists() ?? getDefaultTodoLists();
  const [selectedList, setSelectedList] = useState<string>(initial.selectedList);
  const [listsData, setListsData] = useState<Record<string, { todos: Todo[]; nextId: number }>>(initial.lists);

  const listNames = useMemo(() => Object.keys(listsData), [listsData]);

  const addTodo = () => {
    setListsData((prev) => {
      const bucket = prev[selectedList] ?? { todos: [], nextId: 1 };
      const newTodo: Todo = { id: bucket.nextId, text: '', starred: false, startTime: null, endTime: null, colorIndex: 0 };
      return {
        ...prev,
        [selectedList]: { todos: [...bucket.todos, newTodo], nextId: bucket.nextId + 1 },
      };
    });
  };

  const updateTodo = (next: Todo) => {
    setListsData((prev) => {
      const bucket = prev[selectedList] ?? { todos: [], nextId: 1 };
      return {
        ...prev,
        [selectedList]: {
          ...bucket,
          todos: bucket.todos.map((t) => (t.id === next.id ? next : t)),
        },
      };
    });
  };

  const deleteTodo = (id: number) => {
    setListsData((prev) => {
      const bucket = prev[selectedList] ?? { todos: [], nextId: 1 };
      return {
        ...prev,
        [selectedList]: {
          ...bucket,
          todos: bucket.todos.filter((t) => t.id !== id),
        },
      };
    });
  };


  // Persist to localStorage whenever core state changes
  useEffect(() => {
    saveTodoLists({
      version: TODO_STORAGE_VERSION,
      selectedList,
      lists: listsData,
    });
  }, [selectedList, listsData]);

  return (
    <div className="App app-shell">
      <main className="content">
        <div className={`page ${activeTab === 'todo' ? 'visible' : 'hidden'}`} >
          <div className="title">Todo</div>
          <Lists
            lists={listNames}
            selected={selectedList}
            onSelectList={(name) => setSelectedList(name)}
            onCreateList={(name) => {
              setListsData((prev) => ({ ...prev, [name]: defaultTodoList }));
            }}
          />
          <TodoPage
            todos={(listsData[selectedList] ?? defaultTodoList).todos}
            onAdd={addTodo}
            onChange={updateTodo}
            onDelete={deleteTodo}
          />
        </div>
        <div className={`page ${activeTab === 'cluster' ? 'visible' : 'hidden'}`} >
          <Clock />
        </div>
        <div className={`page ${activeTab === 'amaj7' ? 'visible' : 'hidden'}`} >
          Amaj7 Clock
        </div>
        <div className={`page ${activeTab === 'planb' ? 'visible' : 'hidden'}`} >
          Plan B Clock
        </div>
      </main>
      <nav className="tabbar">
        <button className={`tab ${activeTab === 'todo' ? 'active' : ''}`} onClick={() => setActiveTab('todo')}>
          <img src={TabIcon1} alt="todo tab icon" className="tab-icon" />
        </button>
        <button className={`tab ${activeTab === 'cluster' ? 'active' : ''}`} onClick={() => setActiveTab('cluster')}>
          <img src={TabIcon2} alt="cluster tab icon" className="tab-icon" />
        </button>
        <button className={`tab ${activeTab === 'amaj7' ? 'active' : ''}`} onClick={() => setActiveTab('amaj7')}>
          <img src={TabIcon3} alt="amaj7 tab icon" className="tab-icon" />
        </button>
        <button className={`tab ${activeTab === 'planb' ? 'active' : ''}`} onClick={() => setActiveTab('planb')}>
          <img src={TabIcon4} alt="planb tab icon" className="tab-icon" />
        </button>
      </nav>
    </div>
  );
}

export default App;