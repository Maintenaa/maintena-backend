import { t } from "elysia";

export const paramsId = t.Object({
  id: t.Number(),
});

export const paramsCode = t.Object({
  code: t.String(),
});
