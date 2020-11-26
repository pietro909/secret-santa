exports.handler = async function(event, context) {
    // your server-side functionality
    const payload = JSON.parse(event.body)
    const recipients = payload.recipients
    const budget = payload.budget

    const from = escape("Secret Santa")

    const USN = process.env.SMS_NAME
    const PWD = process.env.SMS_PWD
    const url = `https://http-api.d7networks.com/send?username=${USN}&password=${PWD}`
    const config = `&dlr-method=POST&dlr-url=https://4ba60af1.ngrok.io/receive&dlr=yes&dlr-level=3`

    const promises = recipients.array.forEach(element => {
        const content = escape(`
            Ciao ${element.name}! Il budget e' ${budget}.
        `);
        const number = escape(element.number);
        const meta = `&from=${from}&content=${content}&to=${number}`

        fetch(`${url}${config}${meta}`, 
            { method: "POST"}
        )
    });

    try {
        await Promise.all(promises)
    } catch(e) {
        return { statusCode: 500, body: e.message }
    }
    return { statusCode: 200, body: "OK" }
}
