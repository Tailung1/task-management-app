import pool from "../pool.js";

export const findUserByEmail = async (email: string) => {
  const result = await pool.query(
    `
      SELECT
      id,
      name,
      email,
      password
      FROM users
      WHERE LOWER(email) = $1;
    `,
    [email]
  );
  return result.rows[0] ?? null;
};

export const createUser = async (name: string, email: string, password: string) => {
  const result = await pool.query(
    `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING
        id,
        name,
        email,
        created_at,
        updated_at;
    `,
    [name, email, password]
  );

  return result.rows[0];
};

export const savePasswordResetToken = async (
  userId: string,
  tokenHash: string,
  expiresAt: Date,
): Promise<boolean> => {
  const result = await pool.query(
    `
      INSERT INTO password_reset_tokens (user_id, token_hash, expires_at)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id)
      DO UPDATE SET
        token_hash = EXCLUDED.token_hash,
        expires_at = EXCLUDED.expires_at,
        created_at = NOW()
      WHERE password_reset_tokens.created_at <= NOW() - INTERVAL '1 minute'
      RETURNING user_id;
    `,
    [userId, tokenHash, expiresAt],
  );

  return result.rowCount === 1;
};

export const deletePasswordResetToken = async (userId: string, tokenHash: string) => {
  await pool.query(
    "DELETE FROM password_reset_tokens WHERE user_id = $1 AND token_hash = $2",
    [userId, tokenHash],
  );
};

export const updatePasswordWithResetToken = async (
  tokenHash: string,
  passwordHash: string,
): Promise<boolean> => {
  const result = await pool.query(
    `
      WITH valid_token AS (
        DELETE FROM password_reset_tokens
        WHERE token_hash = $1 AND expires_at > NOW()
        RETURNING user_id
      )
      UPDATE users
      SET password = $2
      FROM valid_token
      WHERE users.id = valid_token.user_id
      RETURNING users.id;
    `,
    [tokenHash, passwordHash],
  );

  return result.rowCount === 1;
};
