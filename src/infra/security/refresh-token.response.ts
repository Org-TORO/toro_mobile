
import type { AuthenticatedUser } from "./auth.store";

export default interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthenticatedUser;
}
