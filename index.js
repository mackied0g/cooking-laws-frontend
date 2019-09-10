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
       dataLaw.forEach(function(law) {
            const divTagForLaw = document.createElement("div");
            const br = document.createElement('br');
            divTagForLaw.innerText = law.name;
            const recipesForLaw = law.recipes
            console.log(recipesForLaw) //array of Recipe objects

            //nested forEach to iterate through Recipe objects
            recipesForLaw.forEach(singleRecipeObject => {
                const liTagForRecipe = document.createElement('li');
                liTagForRecipe.innerText += singleRecipeObject.name
                divTagForLaw.append(liTagForRecipe)
                divTagForLaw.append(singleRecipeObject)
        })
        
        ulLaws.append(br)
        ulLaws.append(divTagForLaw)
        
        
        //create a function onClick to display recipes associated with each law
    });
}



// DOMContentLoaded
})