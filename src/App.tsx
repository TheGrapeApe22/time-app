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

  return (
    <div className="App app-shell">
      <main className="content">
        <div className={`page ${activeTab === 'todo' ? 'visible' : 'hidden'}`} aria-hidden={activeTab !== 'todo'}>
          <TodoPage />
        </div>
        <div className={`page ${activeTab === 'cluster' ? 'visible' : 'hidden'}`} aria-hidden={activeTab !== 'cluster'}>
          <Clock />
        </div>
        <div className={`page ${activeTab === 'amaj7' ? 'visible' : 'hidden'}`} aria-hidden={activeTab !== 'amaj7'}>
          Amaj7 Clock
        </div>
        <div className={`page ${activeTab === 'planb' ? 'visible' : 'hidden'}`} aria-hidden={activeTab !== 'planb'}>
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