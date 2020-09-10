import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query = enteredFilter.length === 0 
          ? '' 
          : `?orderBy="title"&equalTo="${enteredFilter}"`
        fetch('https://react-hooks-8a009.firebaseio.com/ingredients.json' + query)
          .then(res => res.json())
          .then(resData => {
            const loadedIngredients = [];
            for (const key in resData) {
              // 創一個 array 把收到 data 放進去
              loadedIngredients.push({
                id: key,
                title: resData[key].title,
                amount: resData[key].amount
              })
            }
            onLoadIngredients(loadedIngredients)
          })
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    }
  }, [enteredFilter, onLoadIngredients, inputRef])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input 
            ref={inputRef}
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
