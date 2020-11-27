const axios = require('axios').default;

exports.handler = async function(event, context) {
    // your server-side functionality
    const payload = JSON.parse(event.body)
    const recipients = payload.recipients
    const budget = payload.budget

    const from = escape("Secret Santa")

    const USN = process.env.SMS_NAME;
    const PWD = process.env.SMS_PASSWORD;
    const url = `https://http-api.d7networks.com/send?username=${USN}&password=${PWD}`;
    const config = `&dlr-method=POST&dlr-url=https://4ba60af1.ngrok.io/receive&dlr=yes&dlr-level=3`;

    console.log(recipients);

    const promises = recipients.map(element => {
        const content = escape(`Ciao ${element.name}! Il budget e' ${budget}.`.replace("&", ""));
        const number = escape(element.number);
        const meta = `&from=${from}&content=${content}&to=${number}`;

        console.log(`sending to ${element.number} for ${element.name}`);

        return axios.post(`${url}${config}${meta}`);
    });

    try {
        const results = await Promise.all(promises);
        console.log("DONE!", results);
    } catch(e) {
        console.error(e);
        return { statusCode: 200, body: e.message };
    }
    return { statusCode: 200, body: "OK" };
};

