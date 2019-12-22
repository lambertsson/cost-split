import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import CostInput from "./components/CostInput";
import Balance from "./components/Balance";
import History from "./components/History";

const host = "http://localhost:8000/";
const users = ["Clara", "Chris"];

function App() {
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState(0);

  const handleSave = async (name, cost) => {
    await axios.post(host, { name, cost });
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
      <Balance balance={balance || []} />
      <CostInput names={users || []} save={handleSave} />
      <History history={history || []} />
    </div>
  );
}

export default App;
