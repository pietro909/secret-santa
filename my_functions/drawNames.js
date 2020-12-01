const axios = require('axios').default;

const from = escape("BabboNatale");
const USN = process.env.SMS_NAME;
const PWD = process.env.SMS_PASSWORD;
const url = `https://http-api.d7networks.com/send?username=${USN}&password=${PWD}`;
const config = `&dlr-method=POST&dlr-url=https://4ba60af1.ngrok.io/receive&dlr=yes&dlr-level=3`;

// a shameless copy/paste from https://www.npmjs.com/package/shufflr
function shuffle(list, seed) {
    var shuffleItem,
      i = 0,
      j = 0,
      shuffledList;
  
    if (!Array.isArray(list)) {
      return [];
    }
  
    shuffledList = Array.from(list);
  
    if (shuffledList.length <= 2) {
      return shuffledList;
    }
  
    seed = seed || 10000;
  
    for (i = 0; i < shuffledList.length - 2; i++) {
      j = (Math.round(Math.random() * seed) + i) % shuffledList.length;
  
      shuffleItem = shuffledList[i];
      shuffledList[i] = shuffledList[j];
      shuffledList[j] = shuffleItem;
    }
  
    return shuffledList;
  }

/**
 * Create random matches between recipients, generating the message for the number.
 * 
 * @param {Array<{name: string, number: string}>} recipients 
 * @param {number} budget 
 * @returns {Array<{message: string, number: string}>}
 */
function match(recipients, budget) {
    const result = [];
    const shuffledArray = shuffle(recipients)
    for (let i = 0; i < shuffledArray.length; i+=1) {
        const current = shuffledArray[i];
        const next = shuffledArray[i+1] || shuffledArray[0];

        const message = `Ciao ${current.name}, devi fare il regalo a ${next.name}. Il budget e' ${budget} euro, buon Natale!`
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

