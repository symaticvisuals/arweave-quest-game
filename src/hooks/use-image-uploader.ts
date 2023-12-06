import { useCallback, useState } from "react";
import { useConnection, useApi } from "arweave-wallet-kit";
import Arweave from "arweave";

// Singleton instance of Arweave
const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

export const useImageUploader = () => {
  const { connected, connect } = useConnection();
  const api = useApi();
  const [txIds, setTxIds] = useState<string[]>([]);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const readFile = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = () => reject("Error reading file");
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadImages = useCallback(
    async (files: File[]) => {
      if (!connected || !api) {
        setUploadStatus("Please connect the wallet first");
        return;
      }

      setUploadStatus("Uploading...");
      for (const file of files) {
        try {
          const buffer = await readFile(file);
          const transaction = await arweave.createTransaction({
            data: buffer,
            owner: await api.getActiveAddress(),
          });
          transaction.addTag("Content-Type", file.type);

          await api.sign(transaction);
          await arweave.transactions.post(transaction);

          setTxIds((prevTxIds) => [...prevTxIds, transaction.id]);
        } catch (error) {
          console.error(`Error uploading ${file.name}:`, error);
          setUploadStatus(`Error uploading ${file.name}`);
        }
      }
      setUploadStatus("Upload Complete");
    },
    [connected, api]
  );

  return { connected, connect, uploadImages, txIds, uploadStatus };
};
