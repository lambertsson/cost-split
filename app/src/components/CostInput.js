import React, { useState } from "react";

const CostInput = props => {
  const [cost, setCost] = useState("");
  const [name, setName] = useState(props.names[0]);

  const save = () => {
    props.save(name, cost);
    setCost("");
  };

  const options = props.names.map(name => <option key={name}>{name}</option>);

  return (
    <div className="Cost-input">
      <select value={name} onChange={e => setName(e.target.value)}>
        {options}
      </select>
      <input type="number" value={cost} onChange={e => setCost(e.target.value)} />
      <button onClick={save}>Spara</button>
    </div>
  );
};

export default CostInput;
