import { createContract } from "arweavekit/contract";
import fs from "fs";
import { execSync } from "child_process";

// Compile TypeScript to JavaScript
console.log("Compiling TypeScript contract to JavaScript...");
execSync("tsc ./scripts/ownership.ts --outDir ./scripts");

// Read wallet, compiled contract source, and initial state
const w = JSON.parse(fs.readFileSync("./wallet.json", "utf8"));
const src = fs.readFileSync("./contracts-dist/ownership.js", "utf8"); // Read the compiled JS file
const istate = fs.readFileSync("./scripts/state.json", "utf8");

console.log("🚀 Contract deployment started ⏰ ⏰.....");

// Deploy the contract
const contract = await createContract({
  wallet: w,
  contractSource: src,
  environment: "mainnet",
  initialState: istate,
});

// Write deployment information to file
fs.writeFileSync(
  "./deployment.json",
  JSON.stringify({ contractAddr: contract.contractTxId, network: "mainnet" }),
  "utf8"
);

console.log("🚀 Contract deployed ✅ ✅.....", contract.contractTxId);
