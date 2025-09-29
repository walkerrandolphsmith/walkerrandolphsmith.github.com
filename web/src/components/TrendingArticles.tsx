import Link from 'next/link'

import CallToAction from './CallToAction'
import SectionHeader from './SectionHeader'

const ArticleCard = ({ slug, tags, title, children, offset = false }) => (
  <div
    className={`break-inside-avoid mb-12 group flex flex-col relative rounded-[8px] bg-white bg-white dark:bg-[rgba(39,39,42,0.9)] shadow-[0px_18px_36px_-18px_rgba(0,0,0,0.1),0px_30px_45px_-30px_rgba(50,50,93,0.25)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.3)] overflow-hidden ${offset ? 'mt-12 sm:mt-24 md:mt-32' : ''}`}
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
        dataTestId="view-profile"
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
        title="Trending Articles"
        byline="I write about building thoughtful systems, writing maintainable code,
        and solving real-world engineering problems at scale."
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
      <div className={`columns-1 md:columns-2 gap-8 mb-12`}>
        <ArticleCard
          offset
          slug="blog/context-is-everything"
          tags={['RAG', 'LLM', 'Machine Learning']}
          title="Context is Everything: How We Built a RAG System to Improve
                Branded, Culturally Aware Content"
        >
          Large language models are impressive out of the box—but when your CMS
          powers content written by hundreds of people for a global audience,
          accuracy and voice consistency aren&apos;t optional. Pretrained
          knowledge wasn&apos;t enough. We needed context. Real context.
        </ArticleCard>
        <ArticleCard
          slug="blog/reduced-content-latency-event-driven-cache-invalidation"
          tags={['Event Driven Archtecture', 'Performance']}
          title="⚡How We Reduced Content Publication Latency by 99% Using
                Event-Driven Cache Invalidation"
        >
          Cache invalidation is hard — but what if it didn&apos;t have to be? We
          slashed content latency by 99% without ripping out our CDN, and in the
          process, built a real-time publishing system that unlocked dashboards,
          workflows, and trust across teams.
        </ArticleCard>
        <ArticleCard
          slug="blog/cqrs-and-federated-graphql"
          tags={['CQRS', 'GraphQL', 'Performance', 'Envoy']}
          title="Balancing Transactional Integrity and Scale: Evolving Our CMS
                with CQRS and Federated GraphQL"
        >
          Billions of readers. Hundreds of writers. One shared content platform.
          How we balanced editorial precision and platform-scale delivery by
          evolving our CMS architecture with CQRS and federated GraphQL,
          improving editor experience and system scalability.
        </ArticleCard>
        <ArticleCard
          slug="blog/incremental-static-regeneration"
          tags={['Next.js', 'SEO', 'Performance']}
          title="🚀 Lighthouse Scores from 48 to 100: Re-Architecting for Speed
                and SEO with Incremental Static Regeneration"
        >
          Help articles served in flagship products struggled with performance
          due to runtime rendering and content complexity. Here&apos;s how we
          applied static generation—at scale—to improve reliability,
          responsiveness, and SEO.
        </ArticleCard>
      </div>
    </section>
  </div>
)

export default TrendingArticles
