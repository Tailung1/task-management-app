const EMAIL_MAX_LENGTH = 254;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_BYTES = 72;
const NAME_MAX_LENGTH = 100;
const EMAIL_LOCAL_PART_PATTERN =
  /^[A-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Z0-9!#$%&'*+/=?^_`{|}~-]+)*$/i;

interface AuthInput {
  email: string;
  password: string;
}

interface RegistrationInput extends AuthInput {
  name: string;
}

type ValidationResult<T> =
  | { valid: true; value: T }
  | { valid: false; message: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validateEmail(value: unknown): ValidationResult<string> {
  if (typeof value !== "string" || !value.trim()) {
    return { valid: false, message: "Email address is required" };
  }

  const email = value.trim().toLowerCase();
  const [localPart, domain, extraPart] = email.split("@");
  const domainLabels = domain?.split(".");
  const hasValidDomain =
    !!domainLabels &&
    domainLabels.length >= 2 &&
    domainLabels.every(
      (label) =>
        label.length >= 1 &&
        label.length <= 63 &&
        /^[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?$/i.test(label),
    ) &&
    (domainLabels.at(-1)?.length ?? 0) >= 2;

  if (
    email.length > EMAIL_MAX_LENGTH ||
    extraPart !== undefined ||
    !localPart ||
    localPart.length > 64 ||
    !EMAIL_LOCAL_PART_PATTERN.test(localPart) ||
    !hasValidDomain
  ) {
    return { valid: false, message: "Enter a valid email address" };
  }

  return { valid: true, value: email };
}

function validatePassword(
  value: unknown,
  requireMinimumLength: boolean,
): ValidationResult<string> {
  if (typeof value !== "string" || !value) {
    return { valid: false, message: "Password is required" };
  }

  if (requireMinimumLength && Array.from(value).length < PASSWORD_MIN_LENGTH) {
    return {
      valid: false,
      message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
    };
  }

  if (Buffer.byteLength(value, "utf8") > PASSWORD_MAX_BYTES) {
    return {
      valid: false,
      message: `Password must be no more than ${PASSWORD_MAX_BYTES} bytes`,
    };
  }

  return { valid: true, value };
}

export function validateLoginInput(value: unknown): ValidationResult<AuthInput> {
  if (!isRecord(value)) {
    return { valid: false, message: "Email and password are required" };
  }

  const email = validateEmail(value.email); // !!!
  if (!email.valid) return email;

  const password = validatePassword(value.password, false);
  if (!password.valid) return password;

  return { valid: true, value: { email: email.value, password: password.value } };
}

export function validateRegistrationInput(
  value: unknown,
): ValidationResult<RegistrationInput> {
  if (!isRecord(value)) {
    return { valid: false, message: "Name, email, and password are required" };
  }

  if (typeof value.name !== "string" || !value.name.trim()) {
    return { valid: false, message: "Name is required" };
  }

  const name = value.name.trim();
  if (Array.from(name).length > NAME_MAX_LENGTH) {
    return {
      valid: false,
      message: `Name must be ${NAME_MAX_LENGTH} characters or fewer`,
    };
  }

  const email = validateEmail(value.email);
  if (!email.valid) return email;

  const password = validatePassword(value.password, true);
  if (!password.valid) return password;

  return {
    valid: true,
    value: { name, email: email.value, password: password.value },
  };
}
