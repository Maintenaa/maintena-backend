import Elysia, { ValidationError } from "elysia";
import { TypeORMError } from "typeorm";

export function ErrorMiddleware() {
  return new Elysia().onError(
    { as: "global" },
    ({ error, set: { status: code } }) => {
      if (error instanceof TypeORMError) {
        console.log(error.message);

        return Response.json(
          {
            message: error.message,
          },
          {
            status: (code as number) || 500,
          }
        );
      }

      if (error instanceof ValidationError) {
        console.log(error.valueError);
      }
    }
  );
}
