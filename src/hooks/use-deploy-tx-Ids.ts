import { useCallback, useState } from "react";
import { useApi } from "arweave-wallet-kit";
import contractData from "../contracts/contractData.json";
import Arweave from "arweave";

export const useSmartWeaveTransaction = () => {
  const api = useApi();
  const arweave = Arweave.init({
    host: "arweave.net", // Hostname or IP address for a Arweave host
    port: 443, // Port
    protocol: "https", // Network protocol http or https
    timeout: 20000, // Network request timeouts in milliseconds
    logging: false,
  });
  const [transactionStatus, setTransactionStatus] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const interactWithContract = useCallback(
    async (contractId: string, input: string) => {
      if (!api?.getActiveAddress()) {
        setTransactionStatus("Please connect the wallet first");
        return;
      }

      setTransactionStatus("Preparing transaction...");
      try {
        const interactionTx = await arweave.createTransaction({
          data: Math.random().toString().slice(-4),
        });

        interactionTx.addTag("App-Name", "SmartWeaveAction");
        interactionTx.addTag("App-Version", "0.3.0");
        interactionTx.addTag("Contract", contractId);
        interactionTx.addTag("Input", JSON.stringify(input));

        await arweave.transactions.sign(interactionTx);
        const response = await arweave.transactions.post(interactionTx);

        if (response.status === 200) {
          setTransactionStatus("Transaction sent successfully");
          setTransactionId(interactionTx.id);
        } else {
          setTransactionStatus("Transaction failed");
        }
      } catch (error) {
        console.error("Error in creating transaction:", error);
        setTransactionStatus("Error in creating transaction");
      }
    },
    [api, arweave]
  );

  return {
    transactionStatus,
    transactionId,
    interactWithContract,
  };
};
