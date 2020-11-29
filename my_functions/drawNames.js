const axios = require('axios').default;
const shufflr = require('shufflr');

const from = escape("🎄🎁 2020")
const USN = process.env.SMS_NAME;
const PWD = process.env.SMS_PASSWORD;
const url = `https://http-api.d7networks.com/send?username=${USN}&password=${PWD}`;
const config = `&dlr-method=POST&dlr-url=https://4ba60af1.ngrok.io/receive&dlr=yes&dlr-level=3`;

/**
 * Create random matches between recipients, generating the message for the number.
 * 
 * @param {Array<{name: string, number: string}>} recipients 
 * @param {number} budget 
 * @returns {Array<{message: string, number: string}>}
 */
function match(recipients, budget) {
    const result = [];
    const shuffledArray = shufflr.shuffle(recipients)
    for (let i = 0; i < shuffledArray.length; i+=1) {
        const current = shuffledArray[i];
        const next = shuffledArray[i+1] || shuffledArray[0];

        const message = `Ciao ${current.name}, devi fare il regalo a ${next.name}. Il budget e' ${budget}€, buon Natale!`
        result.push({ message, number: current.number });
    }
    return result;
}

exports.handler = async function(event, _) {
    // your server-side functionality
    const payload = JSON.parse(event.body)
    const recipients = match(payload.recipients, payload.budget)

    console.log(recipients);

    const promises = recipients.map(element => {
        const content = escape(element.message);
        const number = escape(element.number);
        const meta = `&from=${from}&content=${content}&to=${number}`;

        console.log(`sending to ${element.number} for '${element.message}'`);

        return axios.post(`${url}${config}${meta}`);
    });

    try {
        const results = await Promise.all(promises);
        console.log(results.map(r => r.data));
    } catch(e) {
        console.error(e);
        return { statusCode: 200, body: e.message };
    }
    return { statusCode: 200, body: "OK" };
};

