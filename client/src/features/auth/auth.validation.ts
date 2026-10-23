const EMAIL_MAX_LENGTH = 254;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_BYTES = 72;
const NAME_MAX_LENGTH = 100;
const EMAIL_LOCAL_PART_PATTERN =
  /^[A-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Z0-9!#$%&'*+/=?^_`{|}~-]+)*$/i;

export function getNameError(name: string): string | undefined {
  const normalizedName = name.trim();

  if (!normalizedName) return "Please enter your name.";
  if (normalizedName.length > NAME_MAX_LENGTH) {
    return `Name must be ${NAME_MAX_LENGTH} characters or fewer.`;
  }
}

export function getEmailError(email: string): string | undefined {
  const normalizedEmail = email.trim();

  if (!normalizedEmail) return "Please enter your email address.";
  if (normalizedEmail.length > EMAIL_MAX_LENGTH) {
    return `Email address must be ${EMAIL_MAX_LENGTH} characters or fewer.`;
  }
  const [localPart, domain, extraPart] = normalizedEmail.split("@");
  const domainLabels = domain?.split(".");
  const hasValidDomain =
    !!domainLabels &&
    domainLabels.length >= 2 &&
    domainLabels.every(
      (label) =>
        label.length >= 1 && label.length <= 63 && /^[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?$/i.test(label),
      // This regex checks whether one domain label contains only letters, numbers, and hyphens,
      //  without starting or ending with a hyphen.
    ) &&
    (domainLabels.at(-1)?.length ?? 0) >= 2;
  // .at(-1) — gets the last element of the array

  if (
    extraPart !== undefined ||
    !localPart ||
    localPart.length > 64 ||
    !EMAIL_LOCAL_PART_PATTERN.test(localPart) ||
    !hasValidDomain
  ) {
    return "Enter a valid email address.";
  }
}

export function getPasswordError(
  password: string,
  requireMinimumLength = true,
): string | undefined {
  if (!password) return "Please enter your password.";
  if (requireMinimumLength && Array.from(password).length < PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
  }
  if (new TextEncoder().encode(password).length > PASSWORD_MAX_BYTES) {
    return "Password must be no more than 72 bytes.";
  }
}
