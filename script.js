function run() {
    const recipients = [ { name: "Pietro", number: "+35677160883"}]
    const budget = "20euro"

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
}