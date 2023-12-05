// src/contracts/upload.ts
export async function handle(state, action) {
  const input = action.input;
  const caller = action.caller;
  switch (input.function) {
    case "registerAsset":
      if (!input.assetId || !input.initialShares) {
        throw new Error("Invalid input for registering an asset");
      }
      const newAsset = {
        id: input.assetId,
        shares: input.initialShares,
        owner: caller
      };
      state.assets.push(newAsset);
      break;
    case "registerCollection":
      if (!input.collectionId || !input.assets || !input.metadata) {
        throw new Error("Invalid input for registering a collection");
      }
      const newCollection = {
        id: input.collectionId,
        assets: input.assets,
        metadata: input.metadata,
        owner: caller
      };
      state.collections.push(newCollection);
      break;
    default:
      throw new Error("Invalid function");
  }
  return { state };
}
