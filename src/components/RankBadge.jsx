import React from 'react';
import { RANKS, calculateRank } from '../utils/calculateRanks';

function RankBadge({ exercise, value, bodyweight }) {
  const rankIndex = calculateRank(exercise, value, bodyweight);
  const rankName = RANKS[rankIndex] || 'Beginner';

  return (
    <span style={{
      padding: '4px 8px',
      borderRadius: '4px',
      backgroundColor: '#eee',
      marginRight: '4px',
      fontWeight: 'bold'
    }}>
      {rankName}
    </span>
  );
}

export default RankBadge;