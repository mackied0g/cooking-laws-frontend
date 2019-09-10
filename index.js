// const loginForm = document.querySelector('#div')
const ulLaws = document.querySelector("#ul-of-laws");
const ulRecipes = document.querySelector("#ul-of-recipes");

// fetching from my API for the laws
fetch(`http://localhost:3000/laws`)
    .then(resp => resp.json())
    .then(dataLaw => renderLaws(dataLaw))

// taking the fetch request and rendering it to the DOM
function renderLaws(dataLaw) {
    dataLaw.forEach(function(law) {
        const li = document.createElement("li");
        li.innerHTML = law.name;
        ulLaws.append(li)
    });
}

// now fetch the recipes
fetch(`http://localhost:3000/recipes`)
    .then(resp => resp.json())
    .then(dataRecipe => renderRecipes(dataRecipe))

// render the recipes fetched 
function renderRecipes(dataRecipe) {
    dataRecipe.forEach(function(recipe) {
        const liRecipe = document.createElement("li");
        liRecipe.innerHTML = recipe.name;
        ulRecipes.append(liRecipe)
    });
}

function expandRecipes(dataRecipe) {
    dataRecipe.forEach(function(recipe){
        const expandDataRecipe = document.createElement("li");
        expandDataRecipe.innerHTML = recipe;
        ulRecipes.append(expandDataRecipe)
        console.log(ulRecipes)
    });
}
// document.getElementById("li").addEventListener("click", renderRecipes());
// function renderRecipes(dataRecipe) {
// }