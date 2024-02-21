import React, { useState, useEffect } from 'react'

function SortFilter({ post, setPosts }) {
  const [sortOrder, setSortOrder] = useState('ascending')

  useEffect(() => {
    const sortedData = [...post].sort((a, b) => {
      if (sortOrder === 'ascending') {
        return new Date(a.createdDateTime) - new Date(b.createdDateTime);
      } else {
        return new Date(b.createdDateTime) - new Date(a.createdDateTime);
      }
    })
    setPosts(sortedData); // Update the parent component's posts
  }, [sortOrder])

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'ascending' ? 'descending' : 'ascending'))
  }

  return (
    <div>
      <button onClick={toggleSortOrder}>
        {sortOrder === 'descending' ? 'Oldest to Newest' : 'Newest to Oldest'}
      </button>
    </div>
  )
}

export default SortFilter