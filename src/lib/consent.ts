"use client";

import { useSyncExternalStore } from "react";

export type Consent = "accepted" | "rejected";

const STORAGE_KEY = "gargari-cookie-consent";
const CHANGE_EVENT = "gargari-consent-change";

function read(): Consent | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    // Private mode or blocked storage: treat as "not decided yet"
    return null;
  }
}

export function saveConsent(value: Consent) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage unavailable: the choice still applies for this page view
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: value }));
}

let sessionChoice: Consent | null = null;

function subscribe(onChange: () => void) {
  const handler = (e: Event) => {
    sessionChoice = (e as CustomEvent<Consent>).detail ?? null;
    onChange();
  };
  window.addEventListener(CHANGE_EVENT, handler);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, handler);
    window.removeEventListener("storage", onChange);
  };
}

/**
 * The visitor's cookie choice: "accepted", "rejected", null if not decided yet,
 * or "unknown" during server rendering (before the browser storage can be read).
 */
export function useConsent(): Consent | null | "unknown" {
  return useSyncExternalStore(
    subscribe,
    () => read() ?? sessionChoice,
    () => "unknown",
  );
}
