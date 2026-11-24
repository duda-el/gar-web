import type { Locale } from "./../config";
import en from "./en";
import ka from "./ka";
import type { Policies } from "./types";

export function getPolicies(locale: Locale): Policies {
  return locale === "ka" ? ka : en;
}
