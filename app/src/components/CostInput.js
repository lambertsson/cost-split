import React, { useState } from "react";

const CostInput = props => {
  const [cost, setCost] = useState(0);

  return (
    <div className="Cost-input">
      <label>Cost</label>
      <input type="number" onChange={e => setCost(e.target.value)} />
      <button onClick={() => props.save(cost)}>Save</button>
    </div>
  );
};

export default CostInput;
