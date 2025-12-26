import { useEffect, useMemo, useState } from 'react';
import ClockPage from './components/ClockPage';
import './App.css';
import TodoPage from './components/TodoPage';
import TabIcon1 from './assets/todo-icon.jpg';
import TabIcon2 from './assets/cluster-icon.png';
import TabIcon3 from './assets/amaj7-icon.png';
import TabIcon4 from './assets/plan-b-icon.png';
import Lists from './components/Lists';
import type { Todo } from './components/TodoItem';
import { getDefaultTodoLists, loadTodoLists, saveTodoLists, TODO_STORAGE_VERSION } from './storage/todoStorage';
import getNewTodoList from './utils/newTodoList';
import ListMenu from './components/ListMenu';
import { appTheme } from './components/theme';
import { ThemeProvider } from '@mui/material';
import StartupPage from './components/StartupPage';

type TabKey = 'todo' | 'cluster' | 'amaj7' | 'planb';

function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('todo');
  const initial = loadTodoLists() ?? getDefaultTodoLists();
  const [selectedList, setSelectedList] = useState<string>(initial.selectedList);
  const [listsData, setListsData] = useState<Record<string, { todos: Todo[]; nextId: number }>>(initial.lists);
  const [focusTodoId, setFocusTodoId] = useState<number | null>(null);
  const [startupState, setStartupState] = useState<'visible' | 'entering' | 'exiting' | 'hidden'>('visible');

  const listNames = useMemo(() => Object.keys(listsData), [listsData]);

  // Generic helpers to mutate a specific list by name
  const addTodoTo = (listName: string) => {
    setListsData((prev) => {
      const oldList = prev[listName];
      const newTodo: Todo = { id: oldList.nextId, text: '', starred: false, startTime: null, endTime: null, colorIndex: 0 };
      return {
        ...prev,
        [listName]: { todos: [...oldList.todos, newTodo], nextId: oldList.nextId + 1 },
      };
    });
    setFocusTodoId(listsData[listName].nextId);
  };

  const updateTodoIn = (listName: string, next: Todo) => {
    setListsData((prev) => {
      const bucket = prev[listName] ?? getNewTodoList();
      return {
        ...prev,
        [listName]: {
          ...bucket,
          todos: bucket.todos.map((t) => (t.id === next.id ? next : t)),
        },
      };
    });
  };

  const deleteTodoFrom = (listName: string, id: number) => {
    setListsData((prev) => {
      const bucket = prev[listName] ?? getNewTodoList();
      return {
        ...prev,
        [listName]: {
          ...bucket,
          todos: bucket.todos.filter((t) => t.id !== id),
        },
      };
    });
  };

  // Import todos from one list into another (replace target contents)
  const importTodosFrom = (sourceName: string, targetName: string) => {
    setListsData((prev) => {
      const source = prev[sourceName] ?? getNewTodoList();
      const copiedTodos = source.todos.map((t) => ({ ...t }));
      return {
        ...prev,
        [targetName]: { todos: copiedTodos, nextId: source.nextId },
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

  // When reopening, mount off-screen then trigger slide down
  useEffect(() => {
    if (startupState === 'entering') {
      requestAnimationFrame(() => setStartupState('visible'));
    }
  }, [startupState]);

  return (
    <div className="App app-shell"><ThemeProvider theme={appTheme}>
      {startupState !== 'hidden' && (
        <div
          className={`startup-overlay ${startupState === 'visible' ? 'visible' : 'hidden-up'}`}
          onTransitionEnd={() => startupState === 'exiting' && setStartupState('hidden')}
        >
          <StartupPage onContinue={() => startupState === 'visible' && setStartupState('exiting')} />
        </div>
      )}
      <main className="content">
        <div className={`page ${activeTab === 'todo' ? 'visible' : 'hidden'}`} >
          <button
            className="startup-link"
            onClick={() => startupState === 'hidden' && setStartupState('entering')}
          >
            A Natural Scream
          </button>
          <div className="title">Todo</div>
          <div className="lists-header">
            <Lists
              lists={listNames}
              selected={selectedList}
              onSelectList={(name) => setSelectedList(name)}
              onCreateList={(name) => {
                setListsData((prev) => ({ ...prev, [name]: getNewTodoList() }));
              }}
              className="lists"
            />
            <ListMenu
              isDefault={selectedList === 'Todo' || selectedList === 'Cluster' || selectedList === 'Plan Amaj7' || selectedList === 'Plan B'}
              currentName={selectedList}
              onRename={(newName) => {
                setListsData((prev) => {
                  const trimmed = newName.trim();
                  if (!trimmed || trimmed === selectedList) return prev;
                  if (prev[trimmed]) {
                    window.alert('A list with that name already exists.');
                    return prev;
                  }
                  const entries = Object.entries(prev);
                  const next = entries.reduce((acc, [k, v]) => {
                    const key = k === selectedList ? trimmed : k;
                    acc[key] = v;
                    return acc;
                  }, {} as typeof prev);
                  // Move selection to the renamed list (order preserved)
                  setSelectedList(trimmed);
                  return next;
                });
              }}
              onDelete={() => {
                setListsData((prev) => {
                  const { [selectedList]: _removed, ...rest } = prev;
                  setSelectedList('Todo');
                  return rest;
                });
              }}
            />
          </div>
          <TodoPage
            todos={(listsData[selectedList] ?? getNewTodoList()).todos}
            onAdd={() => addTodoTo(selectedList)}
            onChange={(next) => updateTodoIn(selectedList, next)}
            onDelete={(id) => deleteTodoFrom(selectedList, id)}
            focusId={focusTodoId ?? undefined}
            minimize={true}
          />
        </div>
        <div className={`page ${activeTab === 'cluster' ? 'visible' : 'hidden'}`} >
          <ClockPage
            title="Cluster Clock"
            listKey="Cluster"
            colors={{ outline: '#49b3ffff', fill: '#c2e5ffff', shade: '#6dd6ff7c' }}
            listsData={listsData}
            addTodoTo={addTodoTo}
            updateTodoIn={updateTodoIn}
            deleteTodoFrom={deleteTodoFrom}
            importTodosFrom={importTodosFrom}
            focusId={focusTodoId ?? undefined}
          />
        </div>
        <div className={`page ${activeTab === 'amaj7' ? 'visible' : 'hidden'}`} >
          <ClockPage
            title="Amaj7 Clock"
            listKey="Plan Amaj7"
            colors={{ outline: '#bc79ffff', fill: '#e7c1ffff', shade: '#eea3ffaa' }}
            listsData={listsData}
            addTodoTo={addTodoTo}
            updateTodoIn={updateTodoIn}
            deleteTodoFrom={deleteTodoFrom}
            importTodosFrom={importTodosFrom}
            focusId={focusTodoId ?? undefined}
          />
        </div>
        <div className={`page ${activeTab === 'planb' ? 'visible' : 'hidden'}`} >
          <ClockPage
            title="Plan B Clock"
            listKey="Plan B"
            colors={{ outline: '#8bac6eff', fill: '#d3ffe8ff', shade: '#8fff8f7a' }}
            listsData={listsData}
            addTodoTo={addTodoTo}
            updateTodoIn={updateTodoIn}
            deleteTodoFrom={deleteTodoFrom}
            importTodosFrom={importTodosFrom}
            focusId={focusTodoId ?? undefined}
          />
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
    </ThemeProvider></div>
  );
}

export default App;