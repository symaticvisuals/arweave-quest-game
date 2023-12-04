import { createTransaction } from "arweavekit";
import { Asset } from "./../types/post";

function generateCustomTags(data: {
  contentType: string;
  creationDate: Date;
  category: string;
}) {
  const tags = [];

  // Example: Adding a content type tag
  if (data.contentType) {
    tags.push({ name: "Content-Type", value: data.contentType });
  }

  // Example: Tagging based on data creation date
  if (data.creationDate) {
    tags.push({
      name: "Creation-Date",
      value: data.creationDate.toISOString(),
    });
  }

  // Example: Tagging based on data category
  if (data.category) {
    tags.push({ name: "Category", value: data.category });
  }

  // Add more custom logic based on other data attributes

  return tags;
}

const toArrayBuffer = async (file: File): Promise<ArrayBuffer> =>
  new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.readAsArrayBuffer(file);
    fr.addEventListener("loadend", (e) => {
      resolve(e.target?.result as ArrayBuffer);
    });
  });

export async function postAtomicAssets(assets: Asset[]): Promise<string[]> {
  const transactionIds: string[] = [];

  for (const asset of assets) {
    const data: ArrayBuffer = await toArrayBuffer(asset.file);

    // ... rest of your existing logic to create inputTags ...
    const inputTags = generateCustomTags({
      contentType: "image/png",
      creationDate: new Date(),
      category: "artwork",
      // other data attributes...
    });
    const txn = await createTransaction({
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
  }

  return transactionIds;
}

export async function createCollectionManifest(
  assetsTxIds: string[],
  collectionMetadata: any
) {
  const collectionManifest = {
    type: "Collection",
    items: assetsTxIds,
    metadata: {
      title: collectionMetadata.title,
      description: collectionMetadata.description,
      topics: collectionMetadata.topics,
      // Add other necessary metadata
    },
  };

  const collectionTags = [
    { name: "Content-Type", value: "application/json" },
    { name: "Collection-Type", value: collectionMetadata.type },
    // Include other tags based on the Collection Protocol
  ];

  // Create and post the transaction for the collection manifest
  const collectionTxn = await createTransaction({
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
  return collectionTxn.transaction.id;
}
