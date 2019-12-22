import React from "react";
import dayjs from "dayjs";
import sv from "dayjs/locale/sv";

dayjs.locale(sv);

const History = props => {
  const history = props.history.map(transaction => (
    <div key={transaction.timestamp}>
      {transaction.name} betalade {transaction.cost}kr under
      {dayjs(transaction.timestamp).format(" dddd[en den] D MMMM, YYYY")}
    </div>
  ));
  return <div>{history}</div>;
};

export default History;
