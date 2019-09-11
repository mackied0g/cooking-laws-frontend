// const commentForm = document.querySelector('newcomment');
const ulLaws = document.querySelector(".list-of-laws");
const lawsURL = `http://localhost:3000/laws`;
const recipesURL = `http://localhost:3000/recipes`;
const commentsURL = `http://localhost:3000/comments`;

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
                const pTagForRecipe = document.createElement('p');
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

                divTagForRecipe.append(pTagForRecipe)
                document.getElementById(`${recipeId}`).append(divTagForRecipe)
                    
                pTagForRecipe.appendChild(pTagForDescription)
                pTagForRecipe.appendChild(pTagForIngredients)
                pTagForRecipe.appendChild(pTagForInstructions)
                pTagForRecipe.appendChild(pTagForYield)
            
                let commentForm = document.createElement("form")
                let recipeContainerqs = document.querySelector(".recipeContainer")   
                // // console.log(recipeContainerqs)

                commentForm.innerHTML = `
                <h3> Add New Comment for ${recipe.name} </h3>
                <label for="new-comment">New Comment</label>
                <br>
                    <input type = "text" data-id = ${recipe.id} name="name",id="new-comment" placeholder="Enter a new comment..." class="input.text">
                    <br>
                    <label for="user"> Full name</label>
                    <br>
                    <input type = "text" name="user",id="new-user" placeholder="Enter your name..." class="input.text">
                        <br>
                        <br>
                    <input id = "add-comment" type="submit" name="submit" value="Add New Comment" class="submit">
                `
                recipeContainerqs.appendChild(commentForm)

                commentForm.reset()
            }
        })
    })
}



// fetching from my API for the laws
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
