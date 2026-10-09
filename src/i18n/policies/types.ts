import type { PolicyType } from "@/constants/policies";

export interface PolicySection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  /** Shown after the list */
  note?: string;
}

export interface Policy {
  title: string;
  updated: string;
  intro: string;
  sections: PolicySection[];
}

export type Policies = Record<PolicyType, Policy>;
