// src/contracts/upload.ts
export async function handle(state, action) {
  const input = action.input;
  const caller = action.caller;
  if (caller !== state.owner) {
    throw new Error("Only the owner can call this function.");
  }
  if (input.function === "setQuestionAndAnswer") {
    state.question = input.question ?? state.question;
    state.answer = input.answer ?? state.answer;
    return { state };
  }
  if (input.function === "updateTags") {
    state.tags["Content-Type"] = input.contentType ?? state.tags["Content-Type"];
    state.tags["App-Name"] = input.appName ?? state.tags["App-Name"];
    state.tags["App-Version"] = input.appVersion ?? state.tags["App-Version"];
    state.tags["Contract-Src"] = input.contractSrc ?? state.tags["Contract-Src"];
    state.tags["Init-State"].txIds = input.txIds ?? state.tags["Init-State"].txIds;
    state.tags["Init-State"].name = input.name ?? state.tags["Init-State"].name;
    state.tags["Init-State"].description = input.description ?? state.tags["Init-State"].description;
    return { state };
  }
  throw new Error("Invalid function call");
}
