import type { Policies } from "./types";

// Loaded on demand when a policy modal opens, so it isn't sent with every page
const policies: Policies = {
  privacy: {
    title: "Privacy Policy",
    updated: "October 10, 2026",
    intro:
      "Your privacy matters to us. This policy explains what information GarGari collects through gargari.ge, why we collect it and how we keep it safe.",
    sections: [
      {
        heading: "Information we collect",
        paragraphs: ["We only collect what you choose to share with us, plus basic anonymous usage data:"],
        list: [
          "Contact form details: your name, email address, the service you're interested in and your message.",
          "Usage data: pages visited, device and browser type, and approximate location, collected through Google Analytics and the top.ge counter.",
        ],
      },
      {
        heading: "How we use it",
        list: [
          "To reply to your enquiry and discuss your project.",
          "To send you a confirmation that we received your message.",
          "To understand how the site is used and make it better.",
        ],
        note: "We never sell your data or use it for unrelated marketing.",
      },
      {
        heading: "Services we rely on",
        paragraphs: [
          "Contact form messages are delivered by EmailJS. Analytics are provided by Google Analytics and Google Tag Manager, and visit statistics by top.ge. Each of these providers processes data under its own privacy policy.",
        ],
      },
      {
        heading: "Cookies",
        paragraphs: [
          "We use cookies that the site needs to work, and analytics cookies that help us understand traffic. You can block or delete cookies in your browser settings at any time.",
        ],
      },
      {
        heading: "How long we keep it",
        paragraphs: [
          "Contact form messages are kept for as long as needed to handle your enquiry and any project that follows. You can ask us to delete them at any time.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "You can ask to see, correct or delete the personal information we hold about you. Just email us at {email} and we'll respond as soon as we can.",
        ],
      },
      {
        heading: "Changes to this policy",
        paragraphs: [
          "We may update this policy from time to time. The date at the top always shows when it was last changed.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    updated: "October 10, 2026",
    intro:
      "By using gargari.ge you agree to these terms. Please read them carefully, and get in touch if anything is unclear.",
    sections: [
      {
        heading: "About the site",
        paragraphs: [
          "gargari.ge presents the services and work of GarGari, a web design and development studio based in Tbilisi, Georgia.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "The design, text, graphics and code of this site belong to GarGari. Projects shown in our portfolio remain the property of their respective clients and are shown with their permission. Please don't copy or reuse any of this material without written consent.",
        ],
      },
      {
        heading: "Prices and quotes",
        paragraphs: [
          "Prices on the site, such as \"from ₾2,500\", are indicative starting points. The final scope, price and timeline of a project are agreed in a written quote or contract before any work begins.",
        ],
      },
      {
        heading: "Using the contact form",
        list: [
          "Provide accurate contact details so we can reply.",
          "Don't send spam, abusive content or anything unlawful.",
          "Don't try to disrupt or misuse the site or its services.",
        ],
      },
      {
        heading: "Links to other sites",
        paragraphs: [
          "The site links to client websites and social networks. We aren't responsible for the content or privacy practices of those sites.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "We work hard to keep the information on this site accurate and the site available, but we provide it \"as is\" and can't guarantee it will always be complete, current or uninterrupted.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: ["These terms are governed by the laws of Georgia."],
      },
      {
        heading: "Changes to these terms",
        paragraphs: [
          "We may update these terms from time to time. The date at the top always shows when they were last changed.",
        ],
      },
    ],
  },
};

export default policies;
