// const loginForm = document.querySelector('#div')
const ulLaws = document.querySelector(".ul-of-laws");


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
            // console.log(recipesForLaw) //array of Recipe objects

            //nested forEach to iterate through Recipe objects
        //     recipesForLaw.forEach(singleRecipeObject => {
        //         const liTagForRecipe = document.createElement('li');
        //         liTagForRecipe.setAttribute("id", `${singleRecipeObject.id}`)
        //         // console.log(singleRecipeObject.name)
        //         liTagForRecipe.innerText += singleRecipeObject.name
        //         divTagForLaw.append(liTagForRecipe)
        //         // divTagForLaw.append(singleRecipeObject)
        // })

        ulLaws.append(br)
        ulLaws.append(divTagForLaw)
        
        //create a function onClick to display recipes associated with each law
    });
}




document.addEventListener("click", () => {
    handleClicks()
})

// document.addEventListener("DOMContentLoaded", function(){



function handleClicks() {
    // debugger
    if (event.target.classList == "law" && event.target.id) {
        let lawId = event.target.id;
        const recipesForLaw = law.recipes
        fetch(`http://localhost:3000/laws/${lawId}`)
            .then(resp => resp.json())
            .then(recipesForLaw.forEach(singleRecipeObject => {
                const liTagForRecipe = document.createElement('li');
                liTagForRecipe.setAttribute("id", `${singleRecipeObject.id}`)
                // console.log(singleRecipeObject.name)
                liTagForRecipe.innerText += singleRecipeObject.name
                divTagForLaw.append(liTagForRecipe)
                // divTagForLaw.append(singleRecipeObject)
        }))
    }
    else if (event.target.id && event.target.classList == "recipe") { 
        debugger
    }
}




// DOMContentLoaded
// })