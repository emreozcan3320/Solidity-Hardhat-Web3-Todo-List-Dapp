import { useState } from 'react';
import './App.scss';
import NavBar from './components/NavBar';
import MainSection from './components/MainSection'

function App() {
  const [accounts, setAccounts] = useState([]);

  return (
    <div className="red">
      <NavBar accounts={accounts} setAccounts={setAccounts} />
      <MainSection accounts={accounts} setAccounts={setAccounts} />
    </div>
  );
}

export default App;
