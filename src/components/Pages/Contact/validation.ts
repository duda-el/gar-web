import { format } from "@/i18n/format";
import type { Dictionary } from "@/i18n/dictionaries/en";

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
type ErrorMessages = Dictionary["contact"]["errors"];

// Letters in any script (Georgian included), spaces, apostrophes, dots and hyphens
const NAME_PATTERN = /^[\p{L}][\p{L}\s'.-]*$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const URL_PATTERN = /(https?:\/\/|www\.)\S+/gi;
const MAX_LINKS_IN_MESSAGE = 3;

export function validateField(
  field: ContactField,
  raw: string,
  messages: ErrorMessages,
): string | undefined {
  const value = raw.trim();

  switch (field) {
    case "from_name":
      if (!value) return messages.nameRequired;
      if (value.length < LIMITS.name.min) return messages.nameShort;
      if (value.length > LIMITS.name.max) return format(messages.nameLong, { max: LIMITS.name.max });
      if (!NAME_PATTERN.test(value)) return messages.nameChars;
      return;
    case "email":
      if (!value) return messages.emailRequired;
      if (value.length > LIMITS.email.max || !EMAIL_PATTERN.test(value)) return messages.emailInvalid;
      return;
    case "service":
      if (!value) return messages.serviceRequired;
      return;
    case "message": {
      if (!value) return messages.messageRequired;
      if (value.length < LIMITS.message.min)
        return format(messages.messageShort, { min: LIMITS.message.min });
      if (value.length > LIMITS.message.max)
        return format(messages.messageLong, { max: LIMITS.message.max });
      if ((value.match(URL_PATTERN)?.length ?? 0) > MAX_LINKS_IN_MESSAGE)
        return format(messages.messageLinks, { max: MAX_LINKS_IN_MESSAGE });
      return;
    }
  }
}

export function validateAll(values: ContactValues, messages: ErrorMessages): ContactErrors {
  const errors: ContactErrors = {};
  (Object.keys(values) as ContactField[]).forEach((field) => {
    const error = validateField(field, values[field], messages);
    if (error) errors[field] = error;
  });
  return errors;
}
