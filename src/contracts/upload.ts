// Define the structure of your contract's state
interface State {
  assets: Asset[];
  collections: Collection[];
}

interface Asset {
  id: string;
  shares: Record<string, number>;
  owner: string;
}

interface Collection {
  id: string;
  assets: string[];
  metadata: CollectionMetadata;
  owner: string;
}

interface CollectionMetadata {
  title: string;
  description: string;
  topics: string[];
}

interface Action {
  input: Input;
  caller: string;
}

interface Input {
  function: string;
  assetId?: string;
  initialShares?: Record<string, number>;
  collectionId?: string;
  assets?: string[];
  metadata?: CollectionMetadata;
}

// Initialize the contract's state
const initialState: State = {
  assets: [],
  collections: [],
};

// The 'handle' function is the main entry point of the SmartWeave contract
export async function handle(
  state: State,
  action: Action
): Promise<{ state: State }> {
  const input = action.input;
  const caller = action.caller;

  switch (input.function) {
    case "registerAsset":
      if (!input.assetId || !input.initialShares) {
        throw new Error("Invalid input for registering an asset");
      }
      const newAsset: Asset = {
        id: input.assetId,
        shares: input.initialShares,
        owner: caller,
      };
      state.assets.push(newAsset);
      break;

    case "registerCollection":
      if (!input.collectionId || !input.assets || !input.metadata) {
        throw new Error("Invalid input for registering a collection");
      }
      const newCollection: Collection = {
        id: input.collectionId,
        assets: input.assets,
        metadata: input.metadata,
        owner: caller,
      };
      state.collections.push(newCollection);
      break;

    default:
      throw new Error("Invalid function");
  }

  return { state };
}
