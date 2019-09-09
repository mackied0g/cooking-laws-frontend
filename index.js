fetch(`http://localhost:3000/laws`)
    .then(resp => resp.json())
    .then(data => renderLaws(data))

    const ul = document.createElement("ul");
    document.body.append(ul);
function renderLaws(data) {
    data.forEach(function(law) {
        
        const li = document.createElement("li");
        li.innerHTML = law.name;
        
    ul.append(li)
    });
}