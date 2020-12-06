function run(event) {
    event.preventDefault();

    const namesContainer = document.getElementById("names");
    const recipients = Object.values(namesContainer.children).flatMap(
        (child) => {
            const name = document.querySelector(`#${child.id} [type="text"]`)
                .value;
            const number = document.querySelector(`#${child.id} [type="tel"]`)
                .value;
            if (name && number) return [{ name, number }];
            return [];
        }
    );

    const budget = document.getElementById(`budget`).value;

    console.log(budget);
    console.log(recipients);

    fetch(".netlify/functions/drawNames", {
        method: "POST",
        body: JSON.stringify({
            recipients,
            budget,
        }),
    })
        .then((_) => {
            console.log("YAY!");
        })
        .catch((e) => {
            console.error("CAZZO", e);
        });
    return false;
}

let nextId = "recipient_0";

function addParticipant(event) {
    event.preventDefault();
    const id = parseInt(nextId.match(/\d+$/)[0], 10) + 1;

    nextId = `recipient_${id}`;
    const namesContainer = document.getElementById("names");
    const node = document.createElement("div");
    node.setAttribute("id", nextId);
    node.innerHTML = `
            <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">📞</span>
                </div>
                <input required type="tel" class="form-control" placeholder="+39" pattern="^\\+[0-9]{6,24}" title="Numero di telefono con prefisso internazionale"/>
                <input required type="text" class="form-control" placeholder="Nome" title="Nome della persona"/>
                <button type="button" class="close" onclick="remove('${nextId}')">
                    <span>&times;</span>
                </button>
        </div>`;
    namesContainer.appendChild(node);
}

function remove(id) {
    document.getElementById(id).remove();
}

function init() {}
