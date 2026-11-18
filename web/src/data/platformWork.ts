// Measured platform results. The homepage renders them, and the build
// serializes them for llms.txt, llms-full.txt, and the WebMCP tools.

export type PlatformResult = {
  headline: string
  text: string
  company: string
  writeUp?: { href: string; dataTestId: string }
}

export const platformResults: PlatformResult[] = [
  {
    headline: '14x more releases, from outages to zero downtime',
    text: 'I replaced releases that each needed an outage with a GitOps delivery model. In one quarter, teams made 999 zero-downtime releases, versus 71 legacy releases.',
    company: 'Blue Line Solutions',
  },
  {
    headline: 'Verification that scales with AI-assisted code',
    text: 'I scaled verification so that teams can release AI-assisted code safely. Each change gets an ephemeral environment with environment and request isolation. A custom CI queue batches changes to raise CI throughput.',
    company: 'Blue Line Solutions',
    writeUp: {
      href: '/blog/environment-vs-request-isolation',
      dataTestId: 'read-ephemeral-environments',
    },
  },
  {
    headline: '6x faster CI',
    text: 'I made CI six times faster and gave engineering teams back about 1,300 developer hours each year. Nx builds and tests only the apps that a change affects. An image promotion pipeline moves one image through every environment, so no configuration is baked in at build time.',
    company: 'Microsoft',
  },
  {
    headline: 'CJIS audit passed and final NLETS approval',
    text: 'I locked down identity with a separate tenant and the network with private endpoints. Istio encrypts traffic end to end, Flux deploys from inside the network, and managed identity replaced 150+ static credentials.',
    company: 'Blue Line Solutions',
  },
  {
    headline: 'Publication time from 2 hours to 1 minute',
    text: 'I led the design and rollout of an event-driven system across five organizations at Microsoft.',
    company: 'Microsoft',
    writeUp: {
      href: '/blog/reduced-content-latency-event-driven-cache-invalidation',
      dataTestId: 'read-content-latency',
    },
  },
  {
    headline: 'Webhooks for hundreds of engineering teams',
    text: 'I led the webhooks feature at Digital.ai. Hundreds of engineering teams used it to automate their delivery workflows on a platform that served 53% of the Fortune 100.',
    company: 'Digital.ai',
    writeUp: {
      href: '/blog/webhooks-for-the-fortune-500',
      dataTestId: 'read-webhooks',
    },
  },
]
