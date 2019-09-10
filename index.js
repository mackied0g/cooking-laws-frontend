// const loginForm = document.querySelector('#div')
const ulLaws = document.querySelector(".ul-of-laws");
document.addEventListener("click", () => {
    handleClicks()
})

function handleClicks() {
    // debugger
    if (event.target.classList == "law" && event.target.id) {
        let lawId = event.target.id)
        // const recipesForLaw = law.recipes
        lawRecipeFetch(lawId)
    }
    else if (event.target.id && event.target.classList == "recipe") { 
        debugger
    }
}
// document.addEventListener("DOMContentLoaded", function(){


function lawRecipeFetch(lawId){
    fetch(`http://localhost:3000/laws/${lawId}`)
            .then(resp => resp.json())
            .then(law => {
                law.recipes.forEach(singleRecipeObject => {
                    const liTagForRecipe = document.createElement('li');
                    const divTagForLaw = document.createElement("div");
                    liTagForRecipe.setAttribute("id", `${singleRecipeObject.id}`)
                    // console.log(singleRecipeObject.name)
                    liTagForRecipe.innerText += singleRecipeObject.name
                    divTagForLaw.append(liTagForRecipe)
                    document.getElementById(`${law.id}`).append(divTagForLaw)
                    // divTagForLaw.append(singleRecipeObject)
                })
            })
}


function moreRecipeInfoFetch(lawId){
    fetch(`http://localhost:3000/laws/${lawId}`)
            .then(resp => resp.json())
            .then(law => {
                law.recipes.forEach(singleRecipeObject => {
                    const liTagForRecipe = document.createElement('li');
                    const divTagForLaw = document.createElement("div");
                    liTagForRecipe.setAttribute("id", `${singleRecipeObject.id}`)
                    // console.log(singleRecipeObject.name)
                    liTagForRecipe.innerText += singleRecipeObject.name
                    divTagForLaw.append(liTagForRecipe)
                    document.getElementById(`${law.id}`).append(divTagForLaw)
                    // divTagForLaw.append(singleRecipeObject)
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