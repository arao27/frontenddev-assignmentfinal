// src/components/RankBadge.jsx
import React from 'react';
import { RANKS } from '../utils/calculateRanks';

function RankBadge({ rank }) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 8px',
        marginLeft: '8px',
        borderRadius: '4px',
        backgroundColor: ['#d3d3d3','#a0c4ff','#90be6d','#f9c74f','#f3722c','#9d4edd'][rank] || '#ccc',
        color: '#fff',
        fontWeight: 'bold',
        minWidth: '80px',
        textAlign: 'center',
      }}
    >
      {RANKS[rank]}
    </span>
  );
}

export default RankBadge;