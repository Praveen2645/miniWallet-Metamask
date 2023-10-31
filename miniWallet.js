require('dotenv').config();

const { Web3 } = require('web3');
//const Web3 = require ('web3');
const apiKey = process.env['apikey']
const network = 'sepolia';

const node = `https://go.getblock.io/${apiKey}/${network}/` //we took the endpoints from getblock so we can tallk to the BC
const web3 = new Web3(node) //creating the object of the web3

//console.log(web3) //run node miniWallet.js to check

//to create a new accout
const accountTo = web3.eth.accounts.create();
console.log(accountTo);
console.log(accountTo.address);

//gives you the address from the private key
const privateKey = process.env['privateKey'];//fetching private key
const accountFrom = web3.eth.accounts.privateKeyToAccount(privateKey);
console.log(accountFrom)

//function to sign the transaction
const createSignedTx = async(rawTx) =>{
    rawTx.gas = await web3.eth.estimateGas(rawTx); //estimating the gas
    return await accountFrom.signTransaction(rawTx);
}

//function to send the signed transation

const sendSignedTx = async(signedTx) => {
    web3.eth.sendSignedTransactiona(signedTx.rawTransaction).then(console.log);
}

//create a raw transation
const amount ="0.01"
const rawTx = {
    to:accountTo.address,
    value:web3.utils.toWei(amount,"ether")//as all tx on ethreum done in wei

}
createSignedTx(rawTx).then(sendSignedTx)

