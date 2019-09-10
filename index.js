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
        var br = document.createElement('br');
        ulLaws.append(br)
        ulLaws.append(li)
    });
}

// document.querySelector("#ul-of-laws").addEventListener("click", renderRecipes());

// now fetch the recipes
fetch(`http://localhost:3000/recipes`)
    .then(resp => resp.json())
    .then(dataRecipe => renderRecipes(dataRecipe))

// render the recipes fetched 
function renderRecipes(dataRecipe) {
    // console.log(dataRecipe)
    dataRecipe.forEach(function(recipe) {
        // console.log(recipe)
        const liRecipeMoreInfo = document.createElement("li");
        liRecipeMoreInfo.innerHTML = recipe.description;
        var br = document.createElement('br');
        ulRecipes.append(br)
        ulRecipes.append(liRecipeMoreInfo)
    });
}



// now fetch a specific recipe object
fetch(`http://localhost:3000/recipes/`) //add../id?
    .then(resp => resp.json())
    .then(dataOfOneRecipe => renderOneRecipe(dataOfOneRecipe))

// render the specific recipe object fetched 
function renderOneRecipe(dataOfOneRecipe) {
    dataOfOneRecipe.forEach(function(oneRecipe) {
        const liRecipe = document.createElement("li");
        var br = document.createElement('br');
        liRecipe.innerHTML = oneRecipe.name;
        ulRecipes.append(liRecipe)
        ulRecipes.append(br)
    });
}





// function expandRecipes(dataRecipe) {
//     dataRecipe.forEach(function(recipe){
//         const expandDataRecipe = document.createElement("li");
//         expandDataRecipe.innerHTML = recipe;
//         ulRecipes.append(expandDataRecipe)
//         console.log(ulRecipes)
//     });
// }

// // function renderRecipes(dataRecipe) {
// // }