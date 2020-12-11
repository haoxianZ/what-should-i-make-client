import React,{useContext, useState} from 'react';
import context from '../context';
import config from '../config';
import LoadMore from '../loadMore/loadMore';
import './displayRecipe.css';
// const recipeSearchAPIid='2a499952';
// const recipeSearchAPIkey='c5e68ccb26db262d07a7a350a3573cc0';
// const recipeSearchURL='https://api.edamam.com/search';
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
};
function getRecipe(keyword, filter, showRecipe, fromResult=0, maxResults=10){
    const params = {
        q: keyword,
        app_id: config.recipeSearchAPIid,
        app_key:config.recipeSearchAPIkey,
        from: fromResult,
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
    const { showRecipe,recipes} = useContext(context);
    let count = 0;
    let fromResult=0;
    let toResult=100;
    let filter;
    let keywords='';
    const [click, setClick] = useState(0);
    const handleSearch= e=>{
        e.preventDefault();
            //use get for local storage

        let checkedTerm = Object.values(localStorage);      
        console.log(checkedTerm)
        const ingredient = checkedTerm.join(',');
        filter = document.getElementById("filter").value;
        console.log(filter)
        keywords= ingredient+' '+filter;
        getRecipe(keywords, filter, showRecipe, fromResult, toResult)
        // let elements = document.getElementsByTagName("INPUT");
        // for (let inp of elements) {
        //     if (inp.type === "checkbox")
        //         inp.checked = false;
        // }
    } 
    let renderRecipes;
    if(recipes.length===0){
      renderRecipes = null
        
    }
    else renderRecipes = recipes.slice(0,5).map((item,index)=>(
        <div key={index}>
            <h4>{item.recipe.label}</h4>
            <img src={item.recipe.image}/>
            <ul>
                 {item.recipe.ingredients.map((ingre,i)=>(
                <li key={i}>{ingre.text}</li>
                ))}
            </ul>
           <a href={item.recipe.url}>Link to Full recipe</a>
        </div>
    )) 
    const searchForMore = ()=>{
      setClick(click+1);

    };
    let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

const  scrollFunction=()=> {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
    return ( 
        <div className='recipes'>
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
        <LoadMore click={click}/>
        <button onClick={searchForMore}>Load More Results</button>
        <button onClick={topFunction} id="myBtn" title="Go to top">Top</button>

        </div>
    )
}
