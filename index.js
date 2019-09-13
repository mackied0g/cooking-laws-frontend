const ulLaws = document.querySelector(".list-of-laws");
const lawsURL = `http://localhost:3000/laws`;
const recipesURL = `http://localhost:3000/recipes`;
const lawForm = document.querySelector("#form")

document.addEventListener("click", (event) => {
    handleClicks()
})

lawForm.addEventListener("submit", (event) => {
    event.preventDefault();    
        let newLawValue = document.querySelector("#newlaw").value;
        let newDescriptionValue = document.querySelector("#newdescription").value;
        //when I hit submit, make a fetch post request to make a new law.
        fetch(lawsURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: newLawValue,
                description: newDescriptionValue,
            })
            
        })
        .then(banana => banana.json())
        .then(data => {
            //returns object created
            lawForm.reset()
            appendLawDiv(data)
        })
}) //end of submit 

function handleClicks() {
    if (event.target.classList == "law" && event.target.id) {
        let lawId = event.target.dataset.id
        // console.log(lawId)
        lawRecipeFetch(lawId)
    }
        else if (event.target.id && event.target.classList == "recipe") {  
            let lawId = event.target.dataset.lawid
            // console.log(lawId, "<- lawId, event.target -> ", event.target)
            let recipeId = event.target.id
            moreRecipeInfoFetch(lawId, recipeId)
        }
        else if (event.target.id == "delete"){
            deleteLaw(event)
        }
        
        else if (event.target.classList == "reverse-btn"){
            reverseLawFetch(event)
        }
} //end of handleClicks


function reverseLawFetch(event) {
    const dataButtonId = event.target.dataset.id 
    let lawNameReverse = document.getElementById(`${dataButtonId}`)
    let thatLaw = lawNameReverse.previousElementSibling.previousElementSibling
    let thatLawName = thatLaw.innerText
    let reversedName = thatLawName.split("").reverse().join("")

    // BELOW IS THE NAME OF THE LAW
    // console.log(lawNameReverse.innerText)
    fetch(lawsURL+`/${dataButtonId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: reversedName
        })
    })
    .then(resp => resp.json())
    .then(data => {
        reverseLaw(event)
    }) 
}
function reverseLaw(event) {
        let lawNameReverse = document.getElementById(`${event.target.id}`)
        let thatLaw = lawNameReverse.previousElementSibling.previousElementSibling
        let thatLawName = thatLaw.innerText
        let thatLawNameReversed = thatLawName.split("").reverse().join("")
        console.log(thatLawNameReversed)
        thatLaw.append(thatLaw.innerText = "")
        thatLaw.append(thatLawNameReversed)
}

function deleteLaw(event) {
    const dataId = event.target.dataset.id 
    fetch(lawsURL+`/${dataId}`, {
    method: "DELETE", 
    headers: {
    "Accept": "application/json"
    }
    })
    .then(resp => resp.json())
    .then(data => {
        deleteLawDiv(event)
    })    
}

function deleteLawDiv(event) {
    let divToBeDeleted = event.target.previousElementSibling
    let deleteReverseButton = event.target.nextElementSibling
    console.log(deleteReverseButton)
    // console.log(divToBeDeleted)
    divToBeDeleted.remove()
    deleteReverseButton.remove()
    event.target.remove()
}

function lawRecipeFetch(lawId){
    // console.log(lawId)
    const notBLawId = event.target.dataset.id
    fetch(`${lawsURL}/${notBLawId}`)
        .then(resp => resp.json())
        .then(law => {
            //Law object 
            law.recipes.forEach(singleRecipeObject => {
                const liTagForRecipe = document.createElement('li');
                const divTagForLaw = document.createElement("div");
                divTagForLaw.setAttribute("id", `${law.id}`)
                liTagForRecipe.setAttribute("id", `${singleRecipeObject.id}`)
                liTagForRecipe.setAttribute("data-lawId", `${lawId}`)
                liTagForRecipe.setAttribute("class", `recipe`)
                liTagForRecipe.innerText += singleRecipeObject.name
                document.getElementById(`b${law.id}`).append(divTagForLaw)
                divTagForLaw.append(liTagForRecipe)
            })
        })
} //end of lawRecipeFetch

function moreRecipeInfoFetch(lawId, recipeId){
    let notBLawId = event.target.data.id
    fetch(`${lawsURL}/${notBLawId}`)
        .then(resp => resp.json())
        .then(lawObject => {
            let recipeOfLawObject = lawObject.recipes
            recipeOfLawObject.forEach((obj) => {
            if(obj.id == recipeId ){
                let recipe = obj
                const divTagForRecipe = document.createElement("div");
                divTagForRecipe.setAttribute("class", `moreInfoForRecipe`)
                divTagForRecipe.dataset.id = recipe.id

                pTagForDescription = document.createElement("p");
                pTagForDescription.innerText = recipe.description
                pTagForDescription.setAttribute("class", `pTagForDescription`)
                // pTagForRecipe.innerText += recipe.description

                pTagForYield = document.createElement("p");
                pTagForYield.innerText = `Serves ${recipe.yield}`
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
                
                document.getElementById(`${recipeId}`).append(divTagForRecipe)
                divTagForRecipe.appendChild(pTagForYield)
                divTagForRecipe.appendChild(pTagForDescription)
                divTagForRecipe.appendChild(pTagForIngredients)
                divTagForRecipe.appendChild(pTagForInstructions)

            } //end of if statement 
        })
    })
}

fetch(`${lawsURL}`)
    .then(resp => resp.json())
    .then(dataLaw => renderLaws(dataLaw))
    // taking the fetch request and rendering it to the DOM
    function renderLaws(dataLaw) {
        // dataLaw = array of law objects!
    dataLaw.forEach(function(law) {
        appendLawDiv(law)
    });
}

function appendLawDiv(law){
    const divTagForLaw = document.createElement("div");
    divTagForLaw.setAttribute("class", "law")
    // WHERE I ADD THE B
    divTagForLaw.setAttribute("id", `b${law.id}`)
    // MAKE THE DATASET THE ID 
    divTagForLaw.dataset.id = `${law.id}`
    // console.log(law)
    //create delete button for each Law
    let deleteBtn = document.createElement("button");
    deleteBtn.id = "delete";
    deleteBtn.className = 'delete-btn'
    deleteBtn.dataset.id = law.id;
    deleteBtn.innerText = `Delete ${law.name}`;

    //create a reverse button for each Law
    let reverseButton = document.createElement("button");
    reverseButton.id = `${law.id}`;
    // console.log(reverseButton)
    reverseButton.className = 'reverse-btn'
    reverseButton.dataset.id = law.id;
    reverseButton.innerText = `Reverse ${law.name}`;
    // console.log(law.name)


    const br = document.createElement('br');
    divTagForLaw.innerText = law.name
    ulLaws.append(br)
    ulLaws.append(divTagForLaw)

    ulLaws.append(deleteBtn)
    ulLaws.append(reverseButton)
}


    // console.log(law.name)