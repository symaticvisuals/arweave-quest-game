import Arweave from "arweave";

async function uploadImagesToArweave(files: File[], arweaveWallet: any) {
  const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
  });

  for (const file of files) {
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const buffer = Buffer.from(reader.result as ArrayBuffer);
        const transaction = await arweave.createTransaction(
          { data: buffer },
          arweaveWallet
        );
        transaction.addTag("Content-Type", file.type);

        await arweave.transactions.sign(transaction, arweaveWallet);
        const response = await arweave.transactions.post(transaction);

        console.log(
          `Uploaded ${file.name}: Transaction ID - ${transaction.id}`
        );
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error(`Error uploading ${file.name}:`, error);
    }
  }
}

export { uploadImagesToArweave };
