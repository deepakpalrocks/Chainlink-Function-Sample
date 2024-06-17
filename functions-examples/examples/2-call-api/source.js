// Refer to https://github.com/smartcontractkit/functions-hardhat-starter-kit#javascript-code

// Arguments can be provided when a request is initated on-chain and used in the request source code as shown below
const txnHash = args[0];
const magpieCustodianWallet = args[1];
// const magpieCustodianWallet = `bc1p6eklcpk4tzuvc5wkjm0v770jx6jvwqz8s56mypjz74tggzcr4aeqc5y0xj`

// make HTTP request
const url = `https://blockchain.info/rawtx/${txnHash}?format=json`;
console.log(url);

const txnInfo = Functions.makeHttpRequest({
  url: url,
  headers: {
    "Content-Type": "application/json",
  },
});
const txnData = await txnInfo;
const transaction = txnData.data;
let transferredBTC = 0;
transaction.out.forEach(output => {
  if (output.addr === magpieCustodianWallet) {
    const amountBTC = output.value / 100000000; // Convert from satoshis to BTC
    transferredBTC = output.value;
    console.log(`Amount transferred to ${magpieCustodianWallet}: ${amountBTC} BTC`);
  }
});

return Functions.encodeUint256(transferredBTC);
