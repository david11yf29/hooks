import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    fetch('https://react-hooks-8a009.firebaseio.com/ingredients.json')
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
        // 再把這個 array 丟到 setState
        setUserIngredients(loadedIngredients);
      })
  }, [])

  useEffect(() => {
    console.log('RENDERING INGREDiENTS');
  })

  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-8a009.firebaseio.com/ingredients.json', {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: {"Content-Type": "application/json"}
    }).then(response => {
      return response.json();
    }).then(responseData => {
      setUserIngredients(prevIngredients => [
        ...prevIngredients,
        { id: Math.random().toString(), ...ingredient }
      ]);
    });
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={() => {}} />
      </section>
    </div>
  );
};

export default Ingredients;
