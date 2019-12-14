import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import CostInput from "./components/CostInput";
import Balance from "./components/Balance";

const host = "http://localhost:8000/";
const name = "Chris";

const handleSave = async cost => {
  const res = await axios.post(host, { name, cost });
  console.log(res);
};

function App() {
  const [balance, setBalance] = useState(0);

  const getBalance = async () => {
    const { data, status } = await axios.get(host);
    if (status === 200) setBalance(data);
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div className="App">
      <Balance balance={balance || []} />
      <CostInput save={handleSave} />
    </div>
  );
}

export default App;
