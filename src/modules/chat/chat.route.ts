import Elysia, { t } from "elysia";
import { CompanyMiddleware } from "../company/company.middleware";
import { createChatSchema } from "./chat.schema";
import { createChat } from "./chat.service";

export function createChatRoute() {
  return new Elysia({
    prefix: "/chat",
  }).use(
    CompanyMiddleware().post(
      "/",
      async function* ({ company, body }) {
        return createChat({ company_id: company.id, message: body.message });
      },
      {
        body: createChatSchema,
      }
    )
  );
}
