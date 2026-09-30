import {
  faq,
  hero,
  included,
  pricing,
  problem,
  site,
  steps,
} from "@/lib/content";

export const dynamic = "force-static";

// Plain-language fact sheet for AI answer engines (llmstxt.org format). Built from the page copy.
export function GET() {
  const body = `# ${site.name}

> ${site.name} is a done-for-you growth system for US local home service businesses with high-ticket jobs, like roofing, HVAC, plumbing, landscaping, remodeling and electrical. It is a service company with software, not a SaaS. It sells booked jobs, not leads.

${hero.titleStart}${hero.titleHighlight}${hero.titleEnd}
${site.promise}

## The problem it solves
${problem.cards.map((c) => `- ${c.title}: ${c.body}`).join("\n")}

## How it works
${steps.items.map((s, i) => `${i + 1}. ${s.title}: ${s.body}`).join("\n")}

## What's included (sold as one system)
${included.groups.map((g) => `- ${g.title}: ${g.items.join(", ")}`).join("\n")}

## Pricing
- ${pricing.plan.price}${pricing.plan.period}, everything included
- 7-day free trial on the owner's real leads
- No contract, cancel anytime
- Satisfaction guarantee

## FAQ
${faq.items.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

## Contact
- Website: ${site.url}
- Email: ${site.email}
- Phone: ${site.phone.display}
- Start a free trial: ${site.url}/#trial
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
