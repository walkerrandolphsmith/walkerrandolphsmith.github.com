import Link from 'next/link'

import { tagLabel } from '@/lib/discovery'

import CallToAction from './CallToAction'
import SectionHeader from './SectionHeader'

const ArticleCard = ({ slug, tags, title, children }) => (
  <div
    className={`break-inside-avoid mb-12 group flex flex-col relative rounded-[8px] bg-[#f6f9fc] dark:bg-[rgba(39,39,42,0.9)] border border-zinc-200 dark:border-white/10 shadow-[0px_10px_24px_-18px_rgba(50,50,93,0.25)] hover:border-zinc-300 focus-within:border-zinc-300 hover:shadow-[0px_18px_36px_-18px_rgba(0,0,0,0.1),0px_30px_45px_-30px_rgba(50,50,93,0.25)] focus-within:shadow-[0px_18px_36px_-18px_rgba(0,0,0,0.1),0px_30px_45px_-30px_rgba(50,50,93,0.25)] dark:hover:border-white/20 dark:focus-within:border-white/20 dark:shadow-[0_2px_10px_rgba(0,0,0,0.3)] transition-[border-color,box-shadow] duration-300 overflow-hidden`}
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
    <div className="mt-auto translate-y-12 group-focus-within:-translate-y-1 group-hover:-translate-y-1 grid gap-2 px-8 py-4 transition-transform [transition-timing-function:cubic-bezier(0.33,1,0.68,1)] will-change-transform bg-[#f6f9fc] dark:bg-transparent">
      <div className="flex justify-between w-full items-center">
        <div className="inline-flex flex-wrap items-center justify-start gap-2">
          {tags.map(tag => (
            <span
              className="inline-flex items-center justify-start gap-x-3 bg-white dark:bg-[rgba(39,39,42,1)] dark:text-gray-400 border border-zinc-200 dark:border-gray-600 px-4 py-2 pr-4 rounded-sm text-[12px] font-semibold leading-[1.25]"
              key={tag}
            >
              {tagLabel(tag)}
            </span>
          ))}
        </div>
      </div>
      <div className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300">
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
  </div>
)

const TrendingArticles = () => (
  <div className="grid gap-y-8">
    <header className="px-8 grid gap-y-4">
      <SectionHeader
        title="Writing about platform work"
        byline="I write about platform engineering and developer experience."
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
          slug="blog/one-registry-for-production"
          tags={['ci-cd', 'security-compliance', 'platform-engineering']}
          title="One Registry for Production: Promoting Images Across a Trust Boundary"
        >
          Production pulls images from one private registry and from nowhere
          else. Every image passes a scan before it runs. This post shows how
          images move from a development tenant to production, and how to debug
          the chain when it breaks.
        </ArticleCard>
        <ArticleCard
          slug="blog/nothing-holds-a-secret"
          tags={['security-compliance', 'platform-engineering']}
          title="Nothing Holds a Secret: Identity Instead of Keys"
        >
          A connection string gives its access to anyone who holds it. Workload
          identity federation replaces keys with short-lived proofs. This post
          also shows how to handle the places where federation is not possible.
        </ArticleCard>
        <ArticleCard
          slug="blog/environment-vs-request-isolation"
          tags={['ci-cd', 'platform-engineering', 'developer-experience']}
          title="From Preview Links to Full Ephemeral Environments: Scalable Testing in Microservice Architectures"
        >
          Each pull request gets its own copy of the full system. Engineers,
          product managers, and marketers test the change before it merges. This
          post shows the steps to set up these environments for microservices.
        </ArticleCard>
        <ArticleCard
          slug="blog/ci-is-a-framework-not-a-library"
          tags={['ci-cd', 'platform-engineering', 'developer-experience']}
          title="CI Is a Framework, Not a Library"
        >
          When each repository builds its own pipeline, every pipeline drifts. A
          better model lets CI own the control flow and call a small, stable set
          of target names that each project implements.
        </ArticleCard>
      </div>
    </section>
  </div>
)

export default TrendingArticles
