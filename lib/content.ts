import type { IconName } from "@/components/ui/icons";

/**
 * All site copy lives here. Rules from the company brief:
 * results for the owner (not features), plain words, and no reviews,
 * testimonials or made-up numbers. Mockup scenes are labelled as examples.
 */

export const site = {
  name: "Scaalus",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://scaalus.com").replace(
    /\/$/,
    "",
  ),
  title: "Scaalus: Booked Jobs for Home Service Businesses",
  shortTitle: "Scaalus: Booked jobs, not missed calls",
  description:
    "Done-for-you growth system for roofing, HVAC, plumbing, landscaping, remodeling & electrical pros. Catch every lead and book more jobs. $297/mo, no contract.",
  email: "contact@scaalus.com",
  phone: { display: "+1 (505) 528-6289", href: "tel:+15055286289" },
  price: "$297",
  promise: "Get found. Catch every lead. Book more jobs.",
  ogTagline:
    "Done-for-you for home service businesses · $297/month · No contract",
} as const;

export const nav = [
  { label: "How it works", href: "#how" },
  { label: "Results", href: "#results" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export const header = {
  cta: "Start free trial",
  ctaShort: "Free trial",
  menuCta: "Start your 7-day free trial",
  home: "Scaalus, back to top",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  skip: "Skip to content",
} as const;

export const hero = {
  eyebrowLead: "Built for",
  eyebrowWords: [
    "roofers",
    "HVAC pros",
    "plumbers",
    "landscapers",
    "remodelers",
    "electricians",
  ],
  titleStart: "A calendar full of ",
  titleHighlight: "booked jobs.",
  titleEnd: " Not a phone full of missed calls.",
  body: "We answer every call and message in seconds, follow up for you, and put the job on your calendar, day or night. Done for you, while you stay on the job.",
  primaryCta: "Start your 7-day free trial",
  secondaryCta: "See how it works",
  reassurance: ["$297/month", "No contract", "Cancel anytime"],
} as const;

/** The animated phone scene. An illustration, not a real customer. */
export const demo = {
  srSummary:
    "Example: a missed call at 9:42 PM gets an automatic text back. The customer replies, and a roof leak repair is booked on the calendar for Tuesday at 8:00 AM.",
  contact: "New customer",
  when: "Tonight",
  missed: "Missed call · 9:42 PM",
  textBack: "Sorry we missed your call! How can we help?",
  auto: "Sent automatically",
  ask: "Need someone to look at a roof leak.",
  offer: "We can come Tuesday at 8:00 AM. Want me to book it?",
  yes: "Yes please!",
  day: "Tuesday",
  open: "Open",
  bookedJob: "Roof leak repair",
  otherJobs: [
    { time: "10:30 AM", job: "Gutter repair" },
    { time: "1:00 PM", job: "Roof inspection" },
  ],
  bookedTime: "8:00 AM",
  toastLabel: "Job booked",
  toastBody: "Tue · 8:00 AM",
  chip: "Replied instantly",
  label: "Example",
  pause: "Pause",
  play: "Play",
  pauseLabel: "Pause animation",
  playLabel: "Play animation",
} as const;

export const tradesStrip = {
  label: "Made for home service pros",
} as const;

export const trades = [
  "Roofing",
  "HVAC",
  "Plumbing",
  "Landscaping",
  "Remodeling",
  "Electrical",
  "Other home service",
] as const;

export const tradeIcons: Record<(typeof trades)[number], IconName> = {
  Roofing: "home",
  HVAC: "fan",
  Plumbing: "droplet",
  Landscaping: "leaf",
  Remodeling: "hammer",
  Electrical: "zap",
  "Other home service": "wrench",
};

type Card = { icon: IconName; title: string; body: string };

export const problem = {
  eyebrow: "Sound familiar?",
  title: "Every missed call is a job for someone else.",
  highlight: "a job for someone else.",
  body: "You're great at the work. The phone is the problem.",
  cards: [
    {
      icon: "phoneMissed",
      title: "You miss calls on the job",
      body: "When you can't pick up, that customer calls the next company on Google.",
    },
    {
      icon: "clock",
      title: "Leads go cold",
      body: "Calls, texts, forms and messages come from everywhere. By the time you reply, they've moved on.",
    },
    {
      icon: "dollar",
      title: "Agencies sell leads, not jobs",
      body: "$2,000+ a month, 3 to 4 month contracts, and a list of names you still have to chase.",
    },
  ] satisfies Card[],
};

/** Before/after week view. Illustrative only: no counts or percentages. */
export const week = {
  eyebrow: "Your week",
  title: "Same leads. Very different week.",
  highlight: "Very different week.",
  body: "Flip between a normal week and a week with Scaalus answering for you.",
  label: "Illustration",
  toggleLabel: "Show my week",
  without: "Without Scaalus",
  with: "With Scaalus",
  days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  summaryWithout: "Calls missed, leads gone cold, open slots.",
  summaryWith: "Every lead answered, followed up and booked.",
  // One lead per day, shown in both states.
  leads: [
    {
      without: { kind: "missed", text: "Missed call" },
      with: { kind: "booked", text: "Roof repair booked" },
    },
    {
      without: { kind: "cold", text: "Replied next day. Gone." },
      with: { kind: "reply", text: "Replied instantly" },
    },
    {
      without: { kind: "missed", text: "Voicemail, no callback" },
      with: { kind: "booked", text: "AC install booked" },
    },
    {
      without: { kind: "cold", text: "Quote never followed up" },
      with: { kind: "followup", text: "Followed up, said yes" },
    },
    {
      without: { kind: "empty", text: "Open slot" },
      with: { kind: "review", text: "5-star review asked" },
    },
  ],
} as const;

export const steps = {
  eyebrow: "How it works",
  title: "From first call to booked job, on autopilot.",
  highlight: "booked job",
  items: [
    {
      icon: "inbox",
      title: "Capture every lead",
      body: "Calls, texts, forms and messages all land in one place. Nothing slips through.",
    },
    {
      icon: "zap",
      title: "Reply in seconds",
      body: "Every lead gets an answer right away, day or night, even when you're on a roof.",
    },
    {
      icon: "repeat",
      title: "Follow up automatically",
      body: "No more chasing. People who don't book right away get followed up for you.",
    },
    {
      icon: "calendarCheck",
      title: "Book the job",
      body: "The job goes straight onto your calendar. You just show up and do the work.",
    },
  ] satisfies Card[],
  // Labels inside the per-step mini visuals.
  visual: {
    sources: ["Call", "Text", "Form", "Message"],
    inbox: "All leads",
    reply: "Hi! Thanks for reaching out. When works for you?",
    replied: "Replied instantly",
    followups: ["Day 1: Checking in", "Day 3: Still need help?"],
    booked: "Booked",
    slot: "Tue · 8:00 AM",
  },
};

export const results = {
  eyebrow: "The results",
  title: "What changes for your business.",
  highlight: "your business.",
  items: [
    {
      icon: "calendarCheck",
      title: "More booked jobs",
      body: "A fuller calendar, week after week.",
    },
    {
      icon: "phone",
      title: "No missed calls",
      body: "Every caller gets a response, day or night.",
    },
    {
      icon: "message",
      title: "Every lead answered in seconds",
      body: "Reply first and win the job before a competitor calls back.",
    },
    {
      icon: "repeat",
      title: "Past customers come back",
      body: "The people you've already served book you again for new jobs.",
    },
    {
      icon: "star",
      title: "More 5-star reviews",
      body: "Happy customers are asked at the right moment.",
    },
    {
      icon: "mapPin",
      title: "Easier to find on Google",
      body: "Show up when locals search on Google and Maps.",
    },
  ] satisfies Card[],
  visual: {
    booked: "Booked",
    reply: "On it! When works?",
    welcome: "Welcome back",
    rank: "Near me",
    answered: "Answered",
  },
};

export const included = {
  eyebrow: "Done for you",
  title: "We set it up and run it. You do the work.",
  highlight: "You do the work.",
  body: "No piecing together tools and agencies. One system, everything included.",
  groups: [
    {
      icon: "search",
      title: "Get found",
      items: ["Website", "Google & Maps visibility"],
    },
    {
      icon: "message",
      title: "Catch every lead",
      items: [
        "Missed-call text back",
        "24/7 AI answering",
        "AI booking assistant",
      ],
    },
    {
      icon: "calendarCheck",
      title: "Book more jobs",
      items: [
        "Self-booking calendar",
        "Automatic follow-up",
        "No-show reminders",
      ],
    },
    {
      icon: "star",
      title: "Keep them coming back",
      items: [
        "Review funnel",
        "Past-customer reactivation",
        "Your own business app",
      ],
    },
  ] satisfies { icon: IconName; title: string; items: string[] }[],
};

export const pricing = {
  eyebrow: "Pricing",
  title: "One simple price.",
  highlight: "simple price.",
  body: "The whole system, done for you. Try it on your real leads before you pay.",
  plan: {
    name: "Scaalus Growth System",
    price: "$297",
    period: "/month",
    badge: "Everything included",
    features: [
      "Everything in the system, set up and run for you",
      "7-day free trial on your real leads",
      "No contract. Cancel anytime",
      "Satisfaction guarantee",
    ],
    cta: "Start your 7-day free trial",
  },
  compare: {
    title: "Agencies sell leads. We help you book jobs.",
    agency: {
      label: "Typical agency",
      rows: [
        "$2,000+ per month",
        "3 to 4 month contracts",
        "You get leads to chase",
      ],
    },
    scaalus: {
      label: "Scaalus",
      rows: [
        "$297 per month",
        "No contract, cancel anytime",
        "You get booked jobs",
      ],
    },
  },
};

export const guarantee = {
  eyebrow: "Zero risk",
  title: "Try it free for 7 days on your real leads.",
  body: "See the jobs land on your calendar first. Then decide.",
  points: [
    {
      icon: "calendarCheck",
      title: "7-day free trial",
      body: "On your real leads.",
    },
    { icon: "unlock", title: "No contract", body: "Cancel anytime." },
    {
      icon: "shield",
      title: "Satisfaction guarantee",
      body: "You're never locked in.",
    },
  ] satisfies Card[],
  cta: "Start your free trial",
};

export const faq = {
  eyebrow: "FAQ",
  title: "Questions, answered.",
  highlight: "answered.",
  contactTitle: "Rather talk to a real person?",
  contactBody: "Call or email us. We're happy to walk you through it.",
  items: [
    {
      q: "Is Scaalus software I have to learn?",
      a: "No. Scaalus is a done-for-you service that comes with software. We set everything up and run it for you, so you can stay on the job.",
    },
    {
      q: "Is there a contract?",
      a: "No. It's $297 a month with no contract, and you can cancel anytime.",
    },
    {
      q: "How does the free trial work?",
      a: "You get 7 days free, running on your real leads, so you can see the results for yourself first.",
    },
    {
      q: "Who is Scaalus for?",
      a: "Local home service businesses in the US with high-ticket jobs, like roofing, HVAC, plumbing, landscaping, remodeling and electrical.",
    },
    {
      q: "How is this different from a marketing agency?",
      a: "Agencies often charge $2,000+ a month, lock you into 3 to 4 month contracts, and hand you leads. Scaalus answers, follows up and books the job, so you get booked jobs, not just leads.",
    },
    {
      q: "What if I'm not happy?",
      a: "Scaalus comes with a satisfaction guarantee. And since there's no contract, you're never locked in.",
    },
  ],
};

export const trial = {
  eyebrow: "7-day free trial",
  title: "Tonight's missed call could be tomorrow's booked job.",
  highlight: "tomorrow's booked job.",
  body: "Tell us about your business. We'll reach out to get you set up.",
  points: ["No contract", "Cancel anytime", "Satisfaction guarantee"],
  formTitle: "Start your free trial",
  labels: {
    name: "Your name",
    business: "Business name",
    phone: "Mobile phone",
    email: "Email",
    notes: "Anything we should know?",
    optional: "Optional",
  },
  placeholders: {
    phone: "(555) 123-4567",
    email: "you@company.com",
    notes: "Your trade, service area, busiest season…",
  },
  contactHint: "Add a phone number, an email, or both.",
  honeypot: "Company website",
  submit: "Start my free trial",
  pending: "Starting your trial…",
  consent:
    "By submitting, you agree that Scaalus may contact you by call, text or email about your trial. Message and data rates may apply. Reply STOP to opt out.",
  errorFallback: "Something went wrong. Please try again, or call us.",
  success: {
    title: "You're in. We'll be in touch soon.",
    body: "Thanks for starting your free trial. Keep your phone handy: we'll reach out to get everything set up.",
  },
};

export const footer = {
  tagline: "Booked jobs, not missed calls.",
  navTitle: "Explore",
  contactTitle: "Contact",
  legal: "All rights reserved.",
  toTop: "Back to top",
} as const;

export const mobileBar = {
  price: "$297/month",
  note: "7-day free trial",
  cta: "Start free trial",
} as const;
