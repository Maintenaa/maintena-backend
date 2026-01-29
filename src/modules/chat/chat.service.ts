import { sse, type Static } from "elysia";
import { createChatSchema } from "./chat.schema";
import { createChatAgent } from "./chat.agent";
import type { User } from "../../database/entities";
import { stream_handler } from "../../lib/llm_handler";

export async function* createChat({
  message,
  company_id,
  user,
}: Static<typeof createChatSchema> & {
  company_id: number;
  user?: User;
}) {
  const agent = await createChatAgent({ company_id, user });

  const handler = agent.runStream(message);

  for await (const chunk of stream_handler(handler)) {
    yield sse(JSON.stringify(chunk));
  }
}
