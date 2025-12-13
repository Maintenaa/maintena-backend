import type { Static } from "elysia";
import { createChatSchema } from "./chat.schema";
import { createMainAgent } from "./agent/main.agent";

export async function* createChat({
  message,
  company_id,
}: Static<typeof createChatSchema> & {
  company_id: number;
}) {
  const agent = createMainAgent({ company_id });

  const result = await agent.chat({ message, stream: true });

  for await (const chunk of result) {
    yield chunk.delta;
  }

  return {
    company_id,
    message,
  };
}
