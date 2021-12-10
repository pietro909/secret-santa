function run(event, TEST) {
    event.preventDefault();

    const namesContainer = document.getElementById("names");
    const recipients = Object.values(namesContainer.children).flatMap(
        (child) => {
            const name = document
                .querySelector(`#${child.id} [name="name"]`)
                .value?.toLowerCase();
            const partner = document
                .querySelector(`#${child.id} [name="partner"]`)
                .value?.toLowerCase();
            const number = document.querySelector(
                `#${child.id} [type="tel"]`
            ).value;
            if (name && number) return [{ name, number, partner }];
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
            isTest: TEST,
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

function runTest(event) {
    run(event, true);
}

let nextId = "recipient_0";

function addParticipant(event) {
    event?.preventDefault();
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
                <input required type="text" name="name" class="form-control" placeholder="Nome" title="Nome della persona"/>
                <input type="text" name="partner" class="form-control" placeholder="Partner" title="Nome del partner"/>
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
