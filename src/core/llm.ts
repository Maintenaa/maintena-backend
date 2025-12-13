import { OpenAI } from "@llamaindex/openai";
import { Config } from "./config";

export const llm = new OpenAI({
  baseURL: Config.AI_BASE_URL,
  model: Config.AI_MODEL,
  apiKey: Config.AI_API_KEY,
});
