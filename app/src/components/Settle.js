import React from "react";

const Settle = props => {
  const settle = (to, amount) => {
    props.settle(to, amount);
  };

  if (props.balance.length > 0) {
    const mostOwed = props.balance.reduce((most, current) => (most.balance < current.balance ? current : most));
    return (
      <div>
        <div>
          Betala {mostOwed.balance}kr till {mostOwed.name}
        </div>
        <button onClick={() => settle(mostOwed.name, mostOwed.balance)}>Markera som betald</button>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Settle;
