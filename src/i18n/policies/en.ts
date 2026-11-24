import type { Policies } from "./types";

// Legal texts, rendered on the /privacy, /cookies and /terms pages
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
          "Usage data: pages visited, device and browser type, and approximate location, collected through Google Analytics, the Meta Pixel and the top.ge counter.",
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
          "Contact form messages are delivered by EmailJS. Analytics are provided by Google Analytics and Google Tag Manager, ad measurement by the Meta Pixel (Meta Platforms), and visit statistics by top.ge. Each of these providers processes data under its own privacy policy.",
        ],
      },
      {
        heading: "Cookies",
        paragraphs: [
          "We use cookies that the site needs to work. Analytics and advertising cookies (Google Analytics and the Meta Pixel), which help us understand traffic and measure our ads, are only set if you accept them in the cookie banner; if you reject them, neither is loaded at all. You can also block or delete cookies in your browser settings at any time.",
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
  cookies: {
    title: "Cookie Policy",
    updated: "November 24, 2026",
    intro:
      "This policy explains which cookies and similar technologies gargari.ge uses, why we use them and how you can control them.",
    sections: [
      {
        heading: "What cookies are",
        paragraphs: [
          "Cookies are small files a website stores in your browser. Some are needed for the site to work, others help us understand traffic and measure our advertising.",
        ],
      },
      {
        heading: "Strictly necessary",
        paragraphs: [
          "These need no consent. We store your cookie choice in your browser's local storage under the name gargari-cookie-consent so we don't ask you again on every visit. It never leaves your device.",
        ],
      },
      {
        heading: "Analytics: Google Analytics",
        paragraphs: [
          "Set only after you accept. Google Analytics helps us see which pages are visited and how people find the site.",
        ],
        list: [
          "_ga and _ga_TCBNN29N66: tell visitors apart and keep session state. Kept for up to 2 years.",
        ],
      },
      {
        heading: "Advertising: Meta Pixel",
        paragraphs: [
          "Set only after you accept. The Meta Pixel (Meta Platforms) lets us measure how our ads perform and which actions follow, such as a contact request.",
        ],
        list: [
          "_fbp: identifies the browser for ad measurement. Kept for up to 90 days.",
          "fr: set by Meta for ad delivery and measurement. Kept for up to 90 days.",
        ],
      },
      {
        heading: "Visit statistics: top.ge",
        paragraphs: [
          "The top.ge visit counter in the footer is loaded only after you accept. It may set its own cookies to count unique visitors, under the top.ge privacy policy.",
        ],
      },
      {
        heading: "Managing your choice",
        paragraphs: [
          "If you reject, none of the services above are loaded. To change your mind, clear this site's data in your browser (which removes the stored choice) and the banner will appear again. You can also block or delete cookies in your browser settings at any time.",
          "Read how we handle personal data in our Privacy Policy, or write to us at {email}.",
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
          "Prices on the site, such as \"from ₾1,000\", are indicative starting points. The final scope, price and timeline of a project are agreed in a written quote or contract before any work begins.",
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
