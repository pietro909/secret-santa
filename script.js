function run(event) {
    event.preventDefault()

    const namesContainer = document.getElementById("names")
    const recipients = Object.values(namesContainer.children).map(child => 
        ({
            name: child.children[0].value,
            number: child.children[1].value
        })
    )

    const budget = "20euro"

    console.log(recipients)

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
    const names = ["Alberto"] //, "Liliana", "Pietro", "Andrea", "Ettore", "Lisa"]
    const namesContainer = document.getElementById("names")
    const nodes = names.reduce((acc, name) => {
        const node = `
            <div id="${name}">
                <input type="text" value="${name}"/>
                <input type="tel" value="+39"/>
            </div>`
        acc += node
        return acc
    }, "");

    namesContainer.innerHTML = nodes;
}