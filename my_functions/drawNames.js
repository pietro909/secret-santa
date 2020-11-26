const request = require('request');

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

    const options = {
        method: 'POST',
        headers: {},
        formData: {}
      };

      console.log(recipients);

    recipients.forEach(element => {
        const content = escape(`
            Ciao ${element.name}! Il budget e' ${budget}.
        `);
        const number = escape(element.number);
        const meta = `&from=${from}&content=${content}&to=${number}`
        options.url = `${url}${config}${meta}`

        console.log(options);

        request(options, function (error, response) {
            if (error) {
                return { statusCode: 500, body: e.message }
            }
            console.log(response.body);
          });
    });

    return { statusCode: 200, body: "OK" };
};
