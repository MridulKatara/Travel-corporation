import React from "react";

const GroupForm = ({ index, group, updateGroup, deleteGroup }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateGroup(index, { ...group, [name]: value });
  };

  return (
    <div className="group-form">
      <input
        type="number"
        name="from"
        value={group.from}
        onChange={handleChange}
        min="1"
        max="10"
        required
      />
      <span>to</span>
      <input
        type="number"
        name="to"
        value={group.to}
        onChange={handleChange}
        min="1"
        max="10"
        required
      />
      <button onClick={() => deleteGroup(index)}>🗑️</button>
    </div>
  );
};

export default GroupForm;
