import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './components/Recipe';

const App = () => {


  const APP_ID='c1297a4a';
  const APP_KEY='3738b19dcc57ac35e1b9317f82b31556';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');
  


  useEffect( async () => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits)
  }

  const updateSearch = (e) => {
    setSearch(e.target.value)
  }

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search)
    setSearch('')
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input type="text" className="search-bar"
         value={search} onChange={updateSearch}/>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className='recipes'>
      {recipes.map(recipe => (
          <Recipe 
          key={recipe.recipe.label} 
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories} 
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
          />
        ))}
        </div>
    </div>
  );
}

export default App;
