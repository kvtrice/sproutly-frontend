
import React from 'react';

function SortFilter({ sortOrder, onToggle }) {
  return (
    <button onClick={onToggle}>
      {sortOrder === 'descending' ? 'Filter Ascending' : 'Filter Descending'}
    </button>
  )
}

export default SortFilter