import React, { useState } from 'react';
import Clock from './components/Clock';
import './App.css';
import TodoPage from './components/TodoPage';

type TabKey = 'todo' | 'cluster' | 'amaj7' | 'planb';

function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('todo');

  const renderPage = () => {
    switch (activeTab) {
      case 'todo':
        return <div className="page">
          <TodoPage />
        </div>;
      case 'cluster':
        return <div className="page">
          <Clock />
        </div>;
      case 'amaj7':
        return <div className="page">Amaj7 Clock</div>;
      case 'planb':
        return <div className="page">Plan B Clock</div>;
      default:
        return null;
    }
  };

  return (
    <div className="App app-shell">
      <main className="content">
        {renderPage()}
      </main>
      <nav className="tabbar">
        <button
          className={`tab ${activeTab === 'todo' ? 'active' : ''}`}
          onClick={() => setActiveTab('todo')}
        >
          Todo
        </button>
        <button
          className={`tab ${activeTab === 'cluster' ? 'active' : ''}`}
          onClick={() => setActiveTab('cluster')}
        >
          Cluster Clock
        </button>
        <button
          className={`tab ${activeTab === 'amaj7' ? 'active' : ''}`}
          onClick={() => setActiveTab('amaj7')}
        >
          Amaj7 Clock
        </button>
        <button
          className={`tab ${activeTab === 'planb' ? 'active' : ''}`}
          onClick={() => setActiveTab('planb')}
        >
          Plan B Clock
        </button>
      </nav>
    </div>
  );
}

export default App;