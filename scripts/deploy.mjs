import fs from "fs";
import * as esbuild from "esbuild";
import { DeployPlugin, ArweaveSigner } from "warp-contracts-plugin-deploy";
import { WarpFactory } from "warp-contracts";
import replace from "replace-in-file";
import path from "path";

(async () => {
  const walletPath = process.argv[2] ?? "wallet.json";
  const warp = WarpFactory.forMainnet().use(new DeployPlugin());
  const key = JSON.parse(fs.readFileSync(walletPath).toString());
  const __dirname = path.resolve();

  const contractFiles = fs.readdirSync(path.join(__dirname, "src", "contracts"))
    .filter(file => file.endsWith('.ts') || file.endsWith('.js'))
    .map(file => `src/contracts/${file}`);

  for (const file of contractFiles) {
    const outFile = `contracts-dist/${path.basename(file, path.extname(file))}.js`;

    await esbuild.build({
      entryPoints: [file],
      bundle: true,
      outfile: outFile,
      format: "esm",
      platform: "node",
    });

    replace.sync({
      files: outFile,
      from: [/async function handle/g, /export {\n {2}handle\n};\n/g],
      to: ["export async function handle", ""],
      countMatches: true,
    });

    const contractSource = fs.readFileSync(outFile, "utf-8");

    const newSource = await warp.createSource(
      { src: contractSource },
      new ArweaveSigner(key)
    );
    const newSrcId = await warp.saveSource(newSource);

    const contractDataPath = path.join(__dirname, "src", "contracts", "contractData.json");
    const contractData = fs.existsSync(contractDataPath) ? JSON.parse(fs.readFileSync(contractDataPath, "utf-8")) : {};
    contractData[path.basename(file, path.extname(file))] = newSrcId;
    fs.writeFileSync(contractDataPath, JSON.stringify(contractData));

    console.log(`New Source Contract Id for ${file}: `, newSrcId);
  }
})();
