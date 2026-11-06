import { createHash, randomBytes } from "node:crypto";
import bcrypt from "bcrypt";
import {
  deletePasswordResetToken,
  findUserByEmail,
  savePasswordResetToken,
  updatePasswordWithResetToken,
} from "../db/queries/auth.query.js";

interface PasswordResetEmailService {
  sendPasswordResetEmail(email: string, resetUrl: string): Promise<void>;
}

const TOKEN_TTL_MS = 30 * 60 * 1000;

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function requestPasswordReset(
  email: string,
  appUrl: string,
  emailService: PasswordResetEmailService,
): Promise<void> {
  const user = await findUserByEmail(email);
  if (!user) return;

  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const saved = await savePasswordResetToken(
    user.id,
    tokenHash,
    new Date(Date.now() + TOKEN_TTL_MS),
  );
  if (!saved) return;

  const resetUrl = new URL("/auth/reset-password", appUrl);
  resetUrl.searchParams.set("token", token);

  void Promise.resolve()
    .then(() => emailService.sendPasswordResetEmail(user.email, resetUrl.toString()))
    .catch(async (emailError: unknown) => {
      console.error("Password reset email delivery failed", emailError);
      try {
        await deletePasswordResetToken(user.id, tokenHash);
      } catch (cleanupError) {
        console.error("Failed to remove unsent password reset token", cleanupError);
      }
    });
}

export async function resetPassword(token: string, password: string): Promise<boolean> {
  if (!/^[\da-f]{64}$/.test(token)) return false;

  const passwordHash = await bcrypt.hash(password, 12);
  return updatePasswordWithResetToken(hashToken(token), passwordHash);
}
