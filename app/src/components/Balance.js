import React from "react";

const Balance = props => {
  const balances = props.balance.map(person => (
    <div key={person.name}>
      {person.name} ({person.balance})
    </div>
  ));
  return <div>{balances}</div>;
};

export default Balance;
