import Elysia from "elysia";
import { updateProfileSchema } from "./profile.schema";
import { AuthMiddleware } from "../auth/auth.middleware";
import { updateProfile } from "./profile.service";

export default function createProfileRoute() {
  return new Elysia({ prefix: "/profile", tags: ["Profile"] }).use(
    AuthMiddleware()
      .get(
        "/",
        async ({ user }) => {
          return {
            profile: user,
          };
        },
        {
          detail: {
            summary: "Profile - Get Profile",
          },
        }
      )

      .put(
        "/",
        async ({ user, body }) => {
          return updateProfile({
            ...body,
            id: user!.id,
          });
        },
        {
          body: updateProfileSchema,
          detail: {
            summary: "Profile - Update Profile",
          },
        }
      )
  );
}
