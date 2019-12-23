import React from "react";
import dayjs from "dayjs";
import sv from "dayjs/locale/sv";

dayjs.locale(sv);

const History = props => {
  const history = props.history.map(transaction => (
    <div className="History-item" key={transaction.timestamp}>
      <div className="History-cost">{transaction.cost}kr</div>
      <div className="History-meta">
        <span>{transaction.name}</span>
        <span> | </span>
        <span>{dayjs(transaction.timestamp).format("dddd[en den] D MMMM, YYYY")}</span>
      </div>
    </div>
  ));
  return <div>{history}</div>;
};

export default History;
