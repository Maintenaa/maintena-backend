import {
  agentStreamEvent,
  agentToolCallEvent,
  WorkflowStream,
  type AgentResultData,
  type WorkflowEventData,
} from "@llamaindex/workflow";
import { logger } from "../core";

class StreamResponse {
  constructor(
    public content: string,
    public type: "event" | "end" = "event",
    public done: boolean = false
  ) {}
}

export async function* stream_handler(
  handler: WorkflowStream<WorkflowEventData<AgentResultData<any>>>
) {
  let response = "";

  for await (const event of handler) {
    if (agentToolCallEvent.include(event)) {
      logger.debug(`Using tool: ${event.data.toolName}`);
    }

    if (agentStreamEvent.include(event)) {
      response += event.data.delta;

      yield new StreamResponse(event.data.delta);
    }
  }

  logger.debug(`Response: \n${response}`);

  yield new StreamResponse(response, "end", true);
}
