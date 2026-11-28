import CallToAction from '@/components/CallToAction'
import SectionHeader from '@/components/SectionHeader'
import { platformResults } from '@/data/platformWork'

const PlatformWork = () => (
  <div id="platform-work" className="grid gap-y-16 scroll-mt-24">
    <header className="px-8 grid gap-y-4">
      <SectionHeader
        title="Selected platform work"
        byline="Delivery pipelines, ephemeral environments, secretless identity, and event-driven systems that let teams ship safely."
      />
    </header>
    <ul className="grid sm:grid-cols-[repeat(2,1fr)] lg:grid-cols-[repeat(3,1fr)] gap-x-8 gap-y-12">
      {platformResults.map(result => (
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
