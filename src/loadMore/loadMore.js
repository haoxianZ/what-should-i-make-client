import React,{useContext} from 'react';
import context from '../context';
export default function LoadMore(props){
    const {recipes} = useContext(context);
    const renderMore=recipes.slice(5,props.click*5+5).map((item,index)=>(
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
    return(
        <section className="loadMore">   
            {renderMore}
        </section>
    )
}