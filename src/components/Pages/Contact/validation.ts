export const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  message: { min: 20, max: 3000 },
} as const;

export type ContactValues = {
  from_name: string;
  email: string;
  service: string;
  message: string;
};

export type ContactField = keyof ContactValues;
export type ContactErrors = Partial<Record<ContactField, string>>;

// Letters in any script (Georgian included), spaces, apostrophes, dots and hyphens
const NAME_PATTERN = /^[\p{L}][\p{L}\s'.-]*$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const URL_PATTERN = /(https?:\/\/|www\.)\S+/gi;
const MAX_LINKS_IN_MESSAGE = 3;

export function validateField(field: ContactField, raw: string): string | undefined {
  const value = raw.trim();

  switch (field) {
    case "from_name":
      if (!value) return "Please enter your name.";
      if (value.length < LIMITS.name.min) return "Name is too short.";
      if (value.length > LIMITS.name.max) return `Name can be at most ${LIMITS.name.max} characters.`;
      if (!NAME_PATTERN.test(value)) return "Name can only contain letters, spaces and hyphens.";
      return;
    case "email":
      if (!value) return "Please enter your email.";
      if (value.length > LIMITS.email.max || !EMAIL_PATTERN.test(value))
        return "Please enter a valid email, like name@example.com.";
      return;
    case "service":
      if (!value) return "Please choose a service.";
      return;
    case "message": {
      if (!value) return "Please tell us a bit about your project.";
      if (value.length < LIMITS.message.min)
        return `A few more words please, at least ${LIMITS.message.min} characters.`;
      if (value.length > LIMITS.message.max)
        return `Message can be at most ${LIMITS.message.max} characters.`;
      if ((value.match(URL_PATTERN)?.length ?? 0) > MAX_LINKS_IN_MESSAGE)
        return `Please include at most ${MAX_LINKS_IN_MESSAGE} links.`;
      return;
    }
  }
}

export function validateAll(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  (Object.keys(values) as ContactField[]).forEach((field) => {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  });
  return errors;
}
