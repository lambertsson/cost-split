import React, { useState, useEffect } from "react";

const CostInput = props => {
  const [cost, setCost] = useState(0);
  useEffect(() => setCost(""), []);

  const save = () => {
    props.save(cost);
    setCost("");
  };

  return (
    <div className="Cost-input">
      <label>Cost</label>
      <input type="number" value={cost} onChange={e => setCost(e.target.value)} />
      <button onClick={save}>Save</button>
    </div>
  );
};

export default CostInput;
