<<<<<<< HEAD
import Arweave from "arweave";
const { SmartWeaveNodeFactory, LoggerFactory } = require("redstone-smartweave");

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const smartweave = SmartWeaveNodeFactory.memCached(arweave);
LoggerFactory.INST.logLevel("error");

const assetContractId = "asset-contract-id";
const gameContractId = "game-contract-id";
=======
import Arweave from 'arweave';
const { SmartWeaveNodeFactory, LoggerFactory } = require('redstone-smartweave');

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https'
});

const smartweave = SmartWeaveNodeFactory.memCached(arweave);
LoggerFactory.INST.logLevel('error');

const assetContractId = 'asset-contract-id';
const gameContractId = 'game-contract-id';
>>>>>>> 22554f1607e44aeaafdd2be4d1af475a3c98ae3f

async function main() {
  const assetContract = smartweave.contract(assetContractId);
  const gameContract = smartweave.contract(gameContractId);

  const assetState = await readContractState(assetContract);
  const gameState = await readContractState(gameContract);

<<<<<<< HEAD
  console.log("Asset State:", assetState);
  console.log("Game State:", gameState);
  await writeInteraction(assetContract, {
    /* action input here */
  });
  await writeInteraction(gameContract, {
    /* action input here */
  });
=======
  console.log('Asset State:', assetState);
  console.log('Game State:', gameState);
  await writeInteraction(assetContract, { /* action input here */ });
  await writeInteraction(gameContract, { /* action input here */ });
>>>>>>> 22554f1607e44aeaafdd2be4d1af475a3c98ae3f
}

async function readContractState(contract: any) {
  return await contract.readState();
}

async function writeInteraction(contract: any, input: any) {
  const walletKey = {};
  await contract.connect(walletKey).writeInteraction(input);
}

main().catch((error) => {
  console.error(error);
});
