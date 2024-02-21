
import React from 'react';

function Filter({ sortOrder, onToggle }) {
  return (
    <button onClick={onToggle}>
      {sortOrder === 'descending' ? 'Filter Ascending' : 'Filter Descending'}
    </button>
  )
}

export default Filter