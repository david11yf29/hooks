import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const [enteredFilter, setEnteredFilter] = useState([]);

  useEffect(() => {
    
  }, [enteredFilter])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input 
            type="text" 
            value={enteredFilter} 
            onChange={event => {
              // State 裡面為 我們輸入的內容
              setEnteredFilter(event.target.value)
            }} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
