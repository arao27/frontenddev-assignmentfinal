import React from 'react';

function StatInput({ label, name, value, onChange, onBlur }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <label style={{ marginRight: '8px' }}>{label}:</label>
      <input
        type="number"
        name={name}
        value={value}              // string for smooth typing
        onChange={e => onChange(name, e.target.value)}
        onBlur={() => onBlur(name)} // update context on blur
        min="0"
        placeholder="Enter value"
      />
    </div>
  );
}

export default StatInput;