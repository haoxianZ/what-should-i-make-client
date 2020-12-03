import React,{useContext, useState} from 'react';
import context from '../context';
import config from '../config';
// const recipeSearchAPIid='2a499952';
// const recipeSearchAPIkey='c5e68ccb26db262d07a7a350a3573cc0';
// const recipeSearchURL='https://api.edamam.com/search';
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
};
function getRecipe(keyword, filter, showRecipe, maxResults=10){
    const params = {
        q: keyword,
        app_id: config.recipeSearchAPIid,
        app_key:config.recipeSearchAPIkey,
        to: maxResults,
        Health: filter
        // cuisineType:filter
      };
      const queryString = formatQueryParams(params)
      const url = config.recipeSearchURL + '?' + queryString;
      console.log(url)
      return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => showRecipe(responseJson.hits))
    .catch(error => {
        console.error({ error })
      });
};

export default function DisplayRecipe(props){
    const {checkedWords, showRecipe,recipes} = useContext(context);
  
    const handleSearch= e=>{
        e.preventDefault();
            //use get for local storage

        let checkedTerm = Object.values(localStorage);      
        console.log(checkedTerm)
        const ingredient = checkedTerm.join(',');
        let filter = document.getElementById("filter").value;
        console.log(filter)
        const keywords= ingredient;
        getRecipe(keywords, filter, showRecipe)
        // let elements = document.getElementsByTagName("INPUT");
        // for (let inp of elements) {
        //     if (inp.type === "checkbox")
        //         inp.checked = false;
        // }
    } 
    let renderRecipes;
    if(recipes.length===0){
      renderRecipes = <div>Sorry, there is nothing found. Try changing the filter</div>
        
    }
    else renderRecipes = recipes.map((item,index)=>(
        <div key={index}>
            <h4>{item.recipe.label}</h4>
            <ul>
                 {item.recipe.ingredients.map((ingre,i)=>(
                <li key={i}>{ingre.text}</li>
                ))}
            </ul>
           <a href={item.recipe.url}>Link to Full recipe</a>
        </div>
    )) 
    return ( 
        <div>
         <form onSubmit={handleSearch}>
          <label htmlFor="filter">Choose a filter:</label>
          <select id="filter" name="filter">
            <option value="">None</option>
            <option value="alcohol-free">Alcohol free</option>
            <option value="peanut-free">Peanut free	</option>
            <option value="sugar-conscious">Sugar conscious	</option>
            <option value="tree-nut-free">Tree nut free	</option>
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
          </select>
          <button type='submit' className='submitBtn'>Search</button>
        </form>
        {renderRecipes}
        </div>
    )
}
