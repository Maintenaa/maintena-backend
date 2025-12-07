import Elysia from "elysia";
import { authHeaderSchema, updateProfileSchema } from "./profile.schema";
import { AuthMiddleware } from "../auth/auth.middleware";
import { updateProfile } from "./profile.service";

export default function createProfileRoute() {
  return new Elysia({ prefix: "/profile" })
    .use(AuthMiddleware())

    .get(
      "/",
      async ({ user }: any) => {
        return {
          profile: user,
        };
      },
      {
        headers: authHeaderSchema,
      }
    )

    .put(
      "/",
      async ({ user, body }: any) => {
        return updateProfile({
          ...body,
          id: user.id,
        });
      },
      {
        headers: authHeaderSchema,
        body: updateProfileSchema,
      }
    );
}
