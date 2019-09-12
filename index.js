// const commentForm = document.querySelector('newcomment');
const ulLaws = document.querySelector(".list-of-laws");
const lawsURL = `http://localhost:3000/laws`;
const recipesURL = `http://localhost:3000/recipes`;
const commentsURL = `http://localhost:3000/comments`;

document.addEventListener("click", () => {
    handleClicks()
})

document.addEventListener("submit", (event) => {
    event.preventDefault();    

    let newLawValue = document.querySelector("#newlaw").value;
    let newDescriptionValue = document.querySelector("#newdescription").value;
       
    if (event.target.id === "submit")
        ulLaws.append(newLawValue)
        ulLaws.innerHTML +=
        `<div class="law"> ${ document.querySelector("#newlaw").value } </div>`

        fetch(lawsURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: newLawValue,
                description: newDescriptionValue,
                recipe_id: 1
            })
            
        })
        .then(resp => resp.json())
        .then(console.log)
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


function lawRecipeFetch(lawId){
    fetch(`${lawsURL}/${lawId}`)
        .then(resp => resp.json())
        .then(law => {
            law.recipes.forEach(singleRecipeObject => {
                const liTagForRecipe = document.createElement('li');
                const divTagForLaw = document.createElement("div");
                liTagForRecipe.setAttribute("id", `${singleRecipeObject.id}`)
                liTagForRecipe.setAttribute("class", `recipe`)
                liTagForRecipe.innerText += singleRecipeObject.name
                divTagForLaw.append(liTagForRecipe)
                document.getElementById(`${law.id}`).append(divTagForLaw)
                // divTagForLaw.append(singleRecipeObject)
            })
        })
}


function moreRecipeInfoFetch(lawId, recipeId){
    fetch(`${lawsURL}/${lawId}`)
        .then(resp => resp.json())
        .then(lawObject => {
            let recipeOfLawObject = lawObject.recipes
            recipeOfLawObject.forEach((obj) => {
            
            if(obj.id == recipeId ){
                let recipe = obj
                
                const divTagForRecipe = document.createElement("div");
                divTagForRecipe.dataset.id = recipe.id
                divTagForRecipe.setAttribute("class", `recipeContainer`)

                pTagForDescription = document.createElement("p");
                pTagForDescription.innerText = recipe.description
                pTagForDescription.setAttribute("class", `pTagForDescription`)
                // pTagForRecipe.innerText += recipe.description

                pTagForYield = document.createElement("p");
                pTagForYield.innerText = recipe.yield 
                pTagForYield.setAttribute("class", `pTagForYield`)
                // pTagForRecipe.innerText += recipe.yield

                pTagForIngredients = document.createElement("p");
                pTagForIngredients.innerText = recipe.ingredients
                pTagForIngredients.setAttribute("class", `pTagForIngredients`)
                // pTagForRecipe.innerText += recipe.ingredients

                pTagForInstructions = document.createElement("p");
                pTagForInstructions.innerText = recipe.instructions
                pTagForInstructions.setAttribute("class", `pTagForInstructions`)
                // pTagForRecipe.innerText += recipe.instructions
                
            //    pTagForComment.innerText = 
                
                document.getElementById(`${recipeId}`).append(divTagForRecipe)
                    
                divTagForRecipe.appendChild(pTagForDescription)
                divTagForRecipe.appendChild(pTagForIngredients)
                divTagForRecipe.appendChild(pTagForInstructions)
                divTagForRecipe.appendChild(pTagForYield)

                let lawForm = document.querySelector("#form")
                let recipeContainerqs = document.querySelector(".recipeContainer")   
                // console.log(recipeContainerqs)
                // // console.log(recipeContainerqs)


            } //end of if statement 
        })
    })
}

fetch(`${lawsURL}`)
    .then(resp => resp.json())
    .then(dataLaw => renderLaws(dataLaw))

// taking the fetch request and rendering it to the DOM
function renderLaws(dataLaw) {
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
