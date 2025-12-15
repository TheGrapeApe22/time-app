import React, { useState } from 'react';
import Clock from './components/Clock';
import './App.css';
import TodoPage from './components/TodoPage';
import TabIcon1 from './assets/todo-icon.jpg';
import TabIcon2 from './assets/cluster-icon.png';
import TabIcon3 from './assets/amaj7-icon.png';
import TabIcon4 from './assets/plan-b-icon.png';

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
          <img src={TabIcon1} alt="todo tab icon" className="tab-icon" />
        </button>
        <button
          className={`tab ${activeTab === 'cluster' ? 'active' : ''}`}
          onClick={() => setActiveTab('cluster')}
        >
          <img src={TabIcon2} alt="cluster tab icon" className="tab-icon" />
        </button>
        <button
          className={`tab ${activeTab === 'amaj7' ? 'active' : ''}`}
          onClick={() => setActiveTab('amaj7')}
        >
          <img src={TabIcon3} alt="amaj7 tab icon" className="tab-icon" />
        </button>
        <button
          className={`tab ${activeTab === 'planb' ? 'active' : ''}`}
          onClick={() => setActiveTab('planb')}
        >
          <img src={TabIcon4} alt="planb tab icon" className="tab-icon" />
        </button>
      </nav>
    </div>
  );
}

export default App;