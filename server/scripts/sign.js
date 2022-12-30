const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { toHex } = require("ethereum-cryptography/utils");

const PRIVATE_KEY = "509abf9c76d148f8fab91cbeb84dc906ee7459ed3271d95500dbaa3823a687c7";

function hashMessage(message) {
    const messageBytes = utf8ToBytes(message)
    const messageHash = keccak256(messageBytes)
    return messageHash
}

async function signMessage(msg) {
    const hash = hashMessage(msg)
    return secp.sign(hash, PRIVATE_KEY, { recovered: true })
}

let signature;
let recoveryBit;
async function signedMessage(msg) {
    const sig = await signMessage(msg);
    signature = sig[0]
    recoveryBit = sig[1]
}

signedMessage('1').then((res) => console.log(signature))

async function recoverKey(msg) {
    hash = hashMessage(msg)
    signedMessage(msg).then((res) => console.log(toHex(secp.recoverPublicKey(hash, signature, recoveryBit))))
}

recoverKey('1')

/* async function recoveredKey(message, signature, recoveryBit) {
    console.log(await recoverKey(message, signature, recoveryBit))
} */