import React from 'react';

function StatInput({ label, name, value, onChange }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <label style={{ marginRight: '8px' }}>{label}:</label>
      <input
        type="number"
        name={name}
        value={value}
        onChange={e => onChange(name, Number(e.target.value))}
      />
    </div>
  );
}

export default StatInput;