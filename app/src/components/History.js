import React from "react";

const History = props => {
  const history = props.history.map(transaction => (
    <div key={transaction.timestamp}>
      {transaction.name} betalade {transaction.cost}kr vid {transaction.timestamp}
    </div>
  ));
  return <div>{history}</div>;
};

export default History;
