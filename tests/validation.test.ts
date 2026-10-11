import { describe, expect, it } from "vitest";
import en from "@/i18n/dictionaries/en";
import ka from "@/i18n/dictionaries/ka";
import { LIMITS, validateAll, validateField } from "@/components/Pages/Contact/validation";

const m = en.contact.errors;

describe("contact form validation", () => {
  it("accepts a valid submission", () => {
    expect(
      validateAll(
        {
          from_name: "გიორგი Test",
          email: "test@example.com",
          service: "Branding",
          message: "We need a new website for our coffee shop in Tbilisi.",
        },
        m,
      ),
    ).toEqual({});
  });

  it("requires every field", () => {
    expect(validateAll({ from_name: "", email: "", service: "", message: "" }, m)).toEqual({
      from_name: m.nameRequired,
      email: m.emailRequired,
      service: m.serviceRequired,
      message: m.messageRequired,
    });
  });

  it("checks names", () => {
    expect(validateField("from_name", "G", m)).toBe(m.nameShort);
    expect(validateField("from_name", "G1", m)).toBe(m.nameChars);
    expect(validateField("from_name", "a".repeat(LIMITS.name.max + 1), m)).toContain(String(LIMITS.name.max));
    expect(validateField("from_name", "Mary-Jane O'Neil", m)).toBeUndefined();
  });

  it("checks emails", () => {
    expect(validateField("email", "test@", m)).toBe(m.emailInvalid);
    expect(validateField("email", "test@example", m)).toBe(m.emailInvalid);
    expect(validateField("email", "  test@example.com  ", m)).toBeUndefined();
  });

  it("checks message length and links", () => {
    expect(validateField("message", "Hi there", m)).toContain(String(LIMITS.message.min));
    const spam = "Check https://a.com https://b.com https://c.com https://d.com now";
    expect(validateField("message", spam, m)).toContain("3");
  });

  it("returns messages in the visitor's language", () => {
    expect(validateField("email", "", ka.contact.errors)).toBe(ka.contact.errors.emailRequired);
    expect(validateField("message", "short", ka.contact.errors)).toMatch(/[Ⴀ-ჿ]/);
  });
});
