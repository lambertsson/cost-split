import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import CostInput from "./components/CostInput";
import Balance from "./components/Balance";
import History from "./components/History";
import Settle from "./components/Settle";

const host = "http://localhost:8000/";
const users = ["Klara", "Chris"];

function App() {
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState(0);

  const handleSave = async (name, cost) => {
    await axios.post(host, { name, cost });
    getBalance();
    getHistory();
  };

  const handleSettle = async (to, amount) => {
    await axios.post(`${host}settle/`, { from: "Klara", to, amount });
    getBalance();
    getHistory();
  };

  const getBalance = async () => {
    const { data, status } = await axios.get(host);
    if (status === 200) setBalance(data);
  };

  const getHistory = async () => {
    const { data, status } = await axios.get(`${host}history/`);
    if (status === 200) setHistory(data);
  };

  useEffect(() => {
    getBalance();
  }, []);

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className="App">
      <h1>Balance</h1>
      <Balance balance={balance || []} />
      <h1>Settle</h1>
      <Settle balance={balance || []} settle={handleSettle} />
      <h1>Input</h1>
      <CostInput names={users || []} save={handleSave} />
      <h1>History</h1>
      <History history={history || []} />
    </div>
  );
}

export default App;
