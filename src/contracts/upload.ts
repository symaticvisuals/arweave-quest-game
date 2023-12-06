// Define the state and action types for your contract
type State = {
  owner: string;
  txId: string;
  question: string;
  answer: string;
  tags: {
    "Content-Type": string;
    "App-Name": string;
    "App-Version": string;
    "Contract-Src": string;
    "Init-State": {
      txIds: string[];
      name: string;
      description: string;
    };
  };
};

type Input = {
  function: "setQuestionAndAnswer" | "updateTags";
  question?: string;
  answer?: string;
  contentType?: string;
  appName?: string;
  appVersion?: string;
  contractSrc?: string;
  txIds?: string[];
  name?: string;
  description?: string;
};

type Action = {
  input: Input;
  caller: string;
};

export async function handle(
  state: State,
  action: Action
): Promise<{ state: State }> {
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
    state.tags["Content-Type"] =
      input.contentType ?? state.tags["Content-Type"];
    state.tags["App-Name"] = input.appName ?? state.tags["App-Name"];
    state.tags["App-Version"] = input.appVersion ?? state.tags["App-Version"];
    state.tags["Contract-Src"] =
      input.contractSrc ?? state.tags["Contract-Src"];
    state.tags["Init-State"].txIds =
      input.txIds ?? state.tags["Init-State"].txIds;
    state.tags["Init-State"].name = input.name ?? state.tags["Init-State"].name;
    state.tags["Init-State"].description =
      input.description ?? state.tags["Init-State"].description;
    return { state };
  }

  throw new Error("Invalid function call");
}
