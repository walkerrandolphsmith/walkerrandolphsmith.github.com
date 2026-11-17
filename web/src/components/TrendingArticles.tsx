import Link from 'next/link'

import CallToAction from './CallToAction'
import SectionHeader from './SectionHeader'

const ArticleCard = ({ slug, tags, title, children }) => (
  <div
    className={`break-inside-avoid mb-12 group flex flex-col relative rounded-[8px] bg-white bg-white dark:bg-[rgba(39,39,42,0.9)] shadow-[0px_18px_36px_-18px_rgba(0,0,0,0.1),0px_30px_45px_-30px_rgba(50,50,93,0.25)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.3)] overflow-hidden`}
  >
    <div className="relative overflow-hidden m-[4px] mb-0 rounded-[4px] p-8 pb-0">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl relative text-zinc-950 dark:text-white tracking-[-0.05em] grid-cols-1">
          <Link href={slug}>{title}</Link>
        </h2>
        <p className="indent-8 leading-relaxed dark:text-gray-400">
          {children}
        </p>
      </div>
    </div>
    <div className="translate-y-12 group-focus-within:-translate-y-1 group-hover:-translate-y-1 grid gap-2 px-8 py-4 transition-transform [transition-timing-function:cubic-bezier(0.33,1,0.68,1)] will-change-transform bg-white dark:bg-transparent">
      <div className="flex justify-between w-full items-center">
        <div className="inline-flex flex-wrap items-center justify-start gap-2">
          {tags.map(tag => (
            <span
              className="inline-flex items-center justify-start gap-x-3 bg-[#f6f9fc] dark:bg-[rgba(39,39,42,1)] dark:text-gray-400 border border-transparent dark:border-gray-600 px-4 py-2 pr-4 rounded-sm text-[12px] font-semibold leading-[1.25]"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <CallToAction
        title="Read article"
        href={slug}
        dataTestId="read-article"
        includeArrow
        excludeLeftPadding
        color="text-[#7a6ded]"
        darkColor="text-[#7a6ded]"
      />
    </div>
  </div>
)

const TrendingArticles = () => (
  <div className="grid gap-y-8">
    <header className="px-8 grid gap-y-4">
      <SectionHeader
        title="Writing about platform work"
        byline="How I build ephemeral environments, separate deployments from releases, and handle failed messages at scale."
        isLight
      />
      <CallToAction
        href="/blog"
        title="Browse articles"
        dataTestId="browse-articles"
        includeArrow
        excludeLeftPadding
        justify="justify-start"
        color="text-zinc-950"
        darkColor="text-white"
      />
    </header>
    <section className="mx-4 md:mx-6 max-w-screen-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mb-12">
        <ArticleCard
          slug="blog/environment-vs-request-isolation"
          tags={['Ephemeral environments', 'CI/CD']}
          title="From Preview Links to Full Ephemeral Environments: Scalable Testing in Microservice Architectures"
        >
          Each pull request gets its own copy of the full system. Engineers,
          product managers, and marketers test the change before it merges. This
          post shows the steps to set up these environments for microservices.
        </ArticleCard>
        <ArticleCard
          slug="blog/decouple-deployments-from-releases"
          tags={['Releases', 'CI/CD']}
          title="Decoupling Deployments from Releases: Turning Technical Decisions into Business Strategy"
        >
          A deployment puts code in production. A release makes a feature
          available to customers. When teams keep the two apart, engineering
          deploys on its own schedule and the business decides when each feature
          goes live.
        </ArticleCard>
        <ArticleCard
          slug="blog/reduced-content-latency-event-driven-cache-invalidation"
          tags={['Event-driven architecture', 'Performance']}
          title="How We Reduced Content Publication Latency by 99% Using Event-Driven Cache Invalidation"
        >
          Published content took up to 2 hours to reach readers because of
          layered caches. An event-driven invalidation system cut that time to 1
          minute without a CDN replacement.
        </ArticleCard>
        <ArticleCard
          slug="blog/hidden-cost-of-ignoring-dead-letter-queue"
          tags={['Reliability', 'Distributed systems']}
          title="The Hidden Cost of Ignoring Your Dead Letter Queue"
        >
          A dead letter queue holds the messages that a system failed to
          process. This post shows how an ignored queue raises costs and slows
          healthy queues, and what to do instead.
        </ArticleCard>
      </div>
    </section>
  </div>
)

export default TrendingArticles
