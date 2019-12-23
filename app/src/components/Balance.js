import React from "react";

const Balance = props => {
  const balances = props.balance.map(person => (
    <div key={person.name}>
      <div className="Balance-balance">{person.balance}kr</div>
      <div className="Balance-name">{person.name}</div>
    </div>
  ));
  return <div className="Balance-container">{balances}</div>;
};

export default Balance;
