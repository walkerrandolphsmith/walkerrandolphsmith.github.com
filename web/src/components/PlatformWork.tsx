import CallToAction from '@/components/CallToAction'
import SectionHeader from '@/components/SectionHeader'

type Result = {
  headline: string
  text: string
  company: string
  writeUp?: { href: string; dataTestId: string }
}

const results: Result[] = [
  {
    headline: '999 zero-downtime releases in one quarter',
    text: 'I replaced stop-the-site releases with a GitOps delivery model. Each of the 71 legacy releases needed an outage.',
    company: 'Blue Line Solutions',
  },
  {
    headline: 'Builds from 12 to 4 minutes across 45 services',
    text: 'I rebuilt verification so that teams can release AI-generated code safely at volume. I moved 45 service pipelines into an NX monorepo. Each change gets an ephemeral environment with its own data and a full set of quality gates.',
    company: 'Blue Line Solutions',
  },
  {
    headline: '6x faster CI',
    text: 'I made CI six times faster. This gave engineering teams back about 1,300 developer hours each year.',
    company: 'Microsoft',
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
    headline: 'No billable event dropped in a national migration',
    text: 'I owned the move of a national traffic enforcement platform from an end-of-life data center to AKS. It processes millions of IoT events each day.',
    company: 'Blue Line Solutions',
  },
  {
    headline: '30% fewer rollbacks',
    text: 'I designed ephemeral environments for full end-to-end tests across a distributed system.',
    company: 'Microsoft',
    writeUp: {
      href: '/blog/environment-vs-request-isolation',
      dataTestId: 'read-ephemeral-environments',
    },
  },
]

const PlatformWork = () => (
  <div id="platform-work" className="grid gap-y-16 scroll-mt-24">
    <header className="px-8 grid gap-y-4">
      <SectionHeader
        title="Selected platform work"
        byline="Measured results from my platform work at Blue Line Solutions and Microsoft."
      />
    </header>
    <ul className="grid sm:grid-cols-[repeat(2,1fr)] lg:grid-cols-[repeat(3,1fr)] gap-x-8 gap-y-12">
      {results.map(result => (
        <li key={result.headline} className="grid gap-y-2 ml-4 content-start">
          <span className="text-sm font-semibold tracking-[0.2px] text-[#adbdcc]">
            {result.company}
          </span>
          <h3 className="text-2xl font-semibold relative tracking-[-0.05em] text-white">
            {result.headline}
          </h3>
          <p className="tracking-[0.2px] text-[#adbdcc]">{result.text}</p>
          {result.writeUp && (
            <CallToAction
              justify="justify-start"
              includeArrow
              excludeLeftPadding
              href={result.writeUp.href}
              title="Read the write-up"
              dataTestId={result.writeUp.dataTestId}
              color="text-white"
              darkColor="text-white"
            />
          )}
        </li>
      ))}
    </ul>
  </div>
)

export default PlatformWork
