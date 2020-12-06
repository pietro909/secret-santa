# Secret Santa

## Do we need another Secret Santa app?

While organizing a secret santa for my own family, I realized how much friction it is to convince everyone to create an account _somewhere_.
Then I realized that **everybody have mobile phones**: SMSs are available even to my 82 y.o. grandmother and she knows how to use them.

This app is a stateless _wheel of names_ where people are coupled using a few lines of code stolen from [this NPM package](https://www.npmjs.com/package/shufflr). They get the SMS with their assigned recipient and the budget, as a memo.

### Disclaimer

This project covers **exactly** my use case. You will have to configure, localize, customize the colors, maybe support a different SMS provider and/or JAM stack platform.

## Running it

1. get your own account on [D7](https://d7networks.com/)
2. fork and set up the project on Netlify, with the environment variables `SMS_NAME` and `SMS_PASSWORD`
3. customize it :-)
