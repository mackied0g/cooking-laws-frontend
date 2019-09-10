// const loginForm = document.querySelector('#div')
const ulLaws = document.querySelector(".ul-of-laws");
document.addEventListener("click", () => {
    handleClicks()
})

function handleClicks() {
    // debugger
    if (event.target.classList == "law" && event.target.id) {
        let lawId = event.target.id;
        lawRecipeFetch(lawId)
    }
        else if (event.target.id && event.target.classList == "recipe") { 
            
            let lawId = event.target.parentElement.parentElement.id
            let recipeId = event.target.id

           moreRecipeInfoFetch(lawId, recipeId)
        }
}
// document.addEventListener("DOMContentLoaded", function(){


function lawRecipeFetch(lawId){
    fetch(`http://localhost:3000/laws/${lawId}`)
            .then(resp => resp.json())
            .then(law => {
                // console.log(law.recipes)
                law.recipes.forEach(singleRecipeObject => {
                    const liTagForRecipe = document.createElement('li');
                    const divTagForLaw = document.createElement("div");
                    liTagForRecipe.setAttribute("id", `${singleRecipeObject.id}`)
                    liTagForRecipe.setAttribute("class", `recipe`)
                    // console.log(singleRecipeObject.name)
                    liTagForRecipe.innerText += singleRecipeObject.name
                    divTagForLaw.append(liTagForRecipe)
                    document.getElementById(`${law.id}`).append(divTagForLaw)
                    // divTagForLaw.append(singleRecipeObject)
                })
            })
}


function moreRecipeInfoFetch(lawId, recipeId){
    fetch(`http://localhost:3000/laws/${lawId}`)
            .then(resp => resp.json())
            .then(lawObject => {
                let recipeOfLawObject = lawObject.recipes
             
                recipeOfLawObject.forEach((obj)=> {
                    
                    if(obj.id == recipeId ){
                      let recipe = obj
                    const liForRecipe = document.createElement('li');
                    const br = document.createElement('br');
                    const divTagForRecipe = document.createElement("div");
                    divTagForRecipe.dataset.id = recipe.id
                    br;
                    liForRecipe.innerText += recipe.description
                    // liForRecipe.innerText += recipe.yield
                    br;
                    liForRecipe.innerText += recipe.ingredients
                    br;
                    liForRecipe.innerText += recipe.instructions
                    br;
                    divTagForRecipe.append(liForRecipe)
                    document.getElementById(`${recipeId}`).append(divTagForRecipe)
                      
                    }
                  })
            })
}



// fetching from my API for the laws
fetch(`http://localhost:3000/laws`)
    .then(resp => resp.json())
    .then(dataLaw => renderLaws(dataLaw))

// taking the fetch request and rendering it to the DOM
function renderLaws(dataLaw) {
    // console.log(dataLaw) //each dataLaw has nested array of recipes
       dataLaw.forEach(function(law) {
            const divTagForLaw = document.createElement("div");
            divTagForLaw.setAttribute("class", "law")
            divTagForLaw.setAttribute("id", `${law.id}`)
            const br = document.createElement('br');
            divTagForLaw.innerText = law.name;
            const recipesForLaw = law.recipes
            ulLaws.append(br)
            ulLaws.append(divTagForLaw)
    });
}



// DOMContentLoaded
// })