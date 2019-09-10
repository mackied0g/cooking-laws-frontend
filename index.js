// const loginForm = document.querySelector('#div')
const ulLaws = document.querySelector("#ul-of-laws");



document.addEventListener("DOMContentLoaded", function(){


// fetching from my API for the laws
fetch(`http://localhost:3000/laws`)
    .then(resp => resp.json())
    .then(dataLaw => renderLaws(dataLaw))

// taking the fetch request and rendering it to the DOM
function renderLaws(dataLaw) {
    // console.log(dataLaw) //each dataLaw has nested array of recipes
    // debugger
       dataLaw.forEach(function(law) {
            const divTagForLaw = document.createElement("div");
            const br = document.createElement('br');
            const li = document.createElement('li');
            // console.log(divTagForLaw, "hello from line 22")
            divTagForLaw.innerText = law.name;
            const recipesForLaw = law.recipes
            console.log(recipesForLaw) //array of Recipe objects
            // console.log(dataLaw)

            //nested forEach to iterate through Recipe objects
            recipesForLaw.forEach(singleRecipeObject => {
                //I need to create an li for each recipesForLaw
                li.innerText += singleRecipeObject.name
                divTagForLaw.append(li)
        })
        // debugger
        // console.log(law.name)
        // console.log(recipesForLaw) //array of Recipe objects!
        ulLaws.append(br)
        ulLaws.append(divTagForLaw)
        divTagForLaw.append(recipesForLaw)
        
        //create a function onClick to display recipes associated with each law
    });
}

// document.querySelector("#ul-of-laws").addEventListener("click", renderRecipes());

// // now fetch the recipes
// fetch(`http://localhost:3000/recipes`)
//     .then(resp => resp.json())
//     .then(dataRecipe => renderRecipes(dataRecipe))

// // render the recipes fetched 
// function renderRecipes(dataRecipe) {
//     // console.log(dataRecipe)
//     dataRecipe.forEach(function(recipe) {
//         // console.log(recipe)
//         const liRecipeName = document.createElement("li");
//         const br = document.createElement('br');
//         liRecipeName.innerHTML = recipe.name;
//         console.log(liRecipeName, "hello from line 37")
//         ulRecipes.append(liRecipeName)
//         ulRecipes.append(br)
//         ulRecipes.append(br)
//     });
// }

// now fetch a specific recipe object
// fetch(`http://localhost:3000/recipes/`) //add../id?
//     .then(resp => resp.json())
//     .then(dataOfOneRecipe => renderOneRecipe(dataOfOneRecipe))

// // render the specific recipe object fetched 
// function renderOneRecipe(dataOfOneRecipe) {
//     dataOfOneRecipe.forEach(function(oneRecipe) {
//         const liRecipeMoreInfo = document.createElement("li");
//         const br = document.createElement('br');
//         liRecipeMoreInfo.innerHTML = oneRecipe.description;
//         console.log(liRecipeMoreInfo, "hello from line 57")
//         ulRecipes.append(liRecipeMoreInfo)
//         ulRecipes.append(br)
//     });
// }


// ulLaws.addEventListener("click", function(event){ //ul is stable parent



// DOMContentLoaded
})