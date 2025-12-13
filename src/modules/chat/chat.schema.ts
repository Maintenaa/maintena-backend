import { t } from "elysia";

export const createChatSchema = t.Object({
  message: t.String(),
});
