const loginForm = document.querySelector('#div')

// fetching from my API for the laws

fetch(`http://localhost:3000/laws`)
    .then(resp => resp.json())
    .then(data => renderLaws(data))

const ul = document.querySelector("#ul-of-laws");
    // document.body.append(ul);

// taking the fetch request and rendering it to the DOM
function renderLaws(data) {
    data.forEach(function(law) {
        const li = document.createElement("li");
        li.innerHTML = law.name;
        ul.append(li)
    });
}


// now fetch the recipes
fetch(`http://localhost:3000/recipes`)
    .then(resp => resp.json())
    .then(dataRecipe => renderRecipes(dataRecipe))

// render the recipes fetched 
function renderRecipes(dataRecipe) {
    dataRecipe.forEach(function(recipe) {
        const li = document.createElement("li");
        li.innerHTML = recipe.name;
        ul.append(li)
    });
}

// document.getElementById("li").addEventListener("click", renderRecipes());
// function renderRecipes(dataRecipe) {
// }