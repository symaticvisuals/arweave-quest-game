import { createTransaction } from "arweavekit";
import { Asset, ShareData } from "../types/post"; // Ensure this import is correct
import Arweave from "arweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import { interactWrite } from "smartweave";

interface CollectionMetadata {
  title: string;
  description: string;
  topics: string[];
  type: string;
}

class ArweaveContract {
  private arweave: Arweave;
  private wallet: JWKInterface;
  private walletAddress: string | undefined;

  constructor(wallet: JWKInterface) {
    this.arweave = Arweave.init({
      host: "arweave.net",
      port: 443,
      protocol: "https",
    });
    this.wallet = wallet;
  }

  private async toArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.readAsArrayBuffer(file);
      fr.addEventListener("loadend", (e) => {
        resolve(e.target?.result as ArrayBuffer);
      });
    });
  }

  private generateCustomTags(data: {
    contentType: string;
    creationDate: Date;
    category: string;
  }) {
    const tags = [];

    if (data.contentType) {
      tags.push({ name: "Content-Type", value: data.contentType });
    }

    if (data.creationDate) {
      tags.push({
        name: "Creation-Date",
        value: data.creationDate.toISOString(),
      });
    }

    if (data.category) {
      tags.push({ name: "Category", value: data.category });
    }

    return tags;
  }

  public async postAtomicAssets(
    assets: Asset[],
    contractId: string
  ): Promise<string[]> {
    const transactionIds: string[] = [];

    for (const asset of assets) {
      const data: ArrayBuffer = await this.toArrayBuffer(asset.file);

      const inputTags = this.generateCustomTags({
        contentType: asset.file.type,
        creationDate: new Date(),
        category: "artwork", // Modify as needed
      });

      const txn = await createTransaction({
        arweave: this.arweave,
        wallet: this.wallet,
        type: "data",
        environment: "mainnet",
        data: data,
        options: {
          tags: inputTags,
          signAndPost: true,
        },
      });

      console.log("Transaction uploaded successfully", txn.transaction.id);
      transactionIds.push(txn.transaction.id);

      // Register asset in the SmartWeave contract
      await interactWrite(this.arweave, this.wallet, contractId, {
        function: "registerAsset",
        asset: {
          file: asset.file, // Assuming asset.file is of type File
          title: asset.title,
          description: asset.description,
          license: asset.license,
          tags: asset.tags,
          creatorId: this.walletAddress, // Wallet address as creatorId
          shareData: asset.shareData,
        },
      });
    }

    return transactionIds;
  }

  public async createCollectionManifest(
    assetsTxIds: string[],
    collectionMetadata: CollectionMetadata,
    contractId: string
  ): Promise<string> {
    const collectionManifest = {
      type: "Collection",
      items: assetsTxIds,
      metadata: {
        title: collectionMetadata.title,
        description: collectionMetadata.description,
        topics: collectionMetadata.topics,
      },
    };

    const collectionTags = [
      { name: "Content-Type", value: "application/json" },
      { name: "Collection-Type", value: collectionMetadata.type },
    ];

    const collectionTxn = await createTransaction({
      arweave: this.arweave,
      wallet: this.wallet,
      type: "data",
      environment: "mainnet",
      data: JSON.stringify(collectionManifest),
      options: {
        tags: collectionTags,
        signAndPost: true,
      },
    });

    console.log(
      "Collection manifest uploaded successfully",
      collectionTxn.transaction.id
    );

    // Register collection in the SmartWeave contract
    await interactWrite(this.arweave, this.wallet, contractId, {
      function: "registerCollection",
      collection: {
        asset: assetsTxIds.map((id) => ({ id })), // Assuming each asset is referenced by its transaction ID
        game: collectionMetadata.title, // Modify as needed
        description: collectionMetadata.description,
        topics: collectionMetadata.topics,
        owner: this.walletAddress, // Wallet address as owner
      },
    });

    return collectionTxn.transaction.id;
  }
}

export default ArweaveContract;
