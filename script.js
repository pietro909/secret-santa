function run(event) {
    event.preventDefault()

    const namesContainer = document.getElementById("names")
    const recipients = Object.values(namesContainer.children).map(child => {
        const name = document.querySelector(`#${child.id} [type="text"]`).value 
        const number = document.querySelector(`#${child.id} [type="tel"]`).value
        return { name, number }
    })

    const budget = document.getElementById(`budget`).value;

    console.log(budget);
    console.log(recipients);

    fetch(".netlify/functions/drawNames",{
        method: "POST",
        body: JSON.stringify({
            recipients,
            budget,
        })
    }).then(_ => {
        console.log("YAY!")
    }).catch(e => {
        console.error("CAZZO", e)
    })
    return false
}

function init() {
    const names = ["Alberto", "Liliana", "Pietro", "Andrea", "Ettore", "Lisa"]
    const namesContainer = document.getElementById("names")
    const nodes = names.reduce((acc, name) => {
        const node = `
            <div id="${name}">
                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">📞</span>
                    </div>
                    <input type="tel" class="form-control" placeholder="+39"/>
                    <input type="text" class="form-control" placeholder="nome" value="${name}"/>
                    <button type="button" class="close" onclick="remove('${name}')">
                        <span>&times;</span>
                    </button>
                </div>
            </div>`
        acc += node
        return acc
    }, "");

    namesContainer.innerHTML = nodes;
}

function remove(id) {
    document.getElementById(id).remove()
}