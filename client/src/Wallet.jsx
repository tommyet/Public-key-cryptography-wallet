import server from "./server";

import * as secp from 'ethereum-cryptography/secp256k1'

function Wallet({ address, setAddress, balance, setBalance, signature, setSignature }) {
  async function onChange1(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }
    async function onChange2(evt) {
      const signature = evt.target.value;
      setSignature(signature);
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange1}></input>
      </label>

      <label>
        Signature
        <input placeholder="Enter private key and block number hash to transact" value={signature} onChange={onChange2}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
