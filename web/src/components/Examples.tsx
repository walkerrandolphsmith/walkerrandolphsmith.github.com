import { AiOutlineExperiment } from 'react-icons/ai'
import { MdOutlineArticle } from 'react-icons/md'
import { SiGnometerminal } from 'react-icons/si'
import { TbPuzzle } from 'react-icons/tb'

import CallToAction from '@/components/CallToAction'
import Code from '@/components/Code'
import SectionHeader from '@/components/SectionHeader'

const Examples = () => (
  <div className="grid gap-y-16">
    <section className="">
      <div
        id="column-layout"
        className={`grid gap-y-8 gap-x-8 items-start md:grid-cols-[repeat(2,1fr)]`}
      >
        <div className="grid grid-cols-1 gap-y-12 place-items-center">
          <header className="px-8 grid gap-y-4 max-w-[810px]">
            <SectionHeader
              title="Full stack, infrastructure, machine learning"
              byline="I build across the stack, scale systems that last, and dive deep into ML — because staying sharp means never standing still."
            />
          </header>
        </div>
        <div className="grid grid-cols-1 gap-y-12 items-start place-items-center md:pr-4">
          <Code />
        </div>
      </div>
    </section>
    <section className="grid sm:grid-cols-[repeat(2,1fr)] lg:grid-cols-[repeat(4,1fr)] gap-y-12">
      <div className="grid gap-y-2 ml-4">
        <AiOutlineExperiment color="white" size="36"></AiOutlineExperiment>
        <h2 className="text-xl font-semibold relative tracking-[-0.05em] text-white">
          Experiments
        </h2>
        <p className="tracking-[0.2px] text-[#adbdcc]">
          A sandbox of code where I test ideas, sharpen my craft, and explore
          new technologies.
        </p>
        <CallToAction
          justify="justify-start"
          includeArrow
          excludeLeftPadding
          href="https://github.com/walkerrandolphsmith/practice"
          title="Browse lessons"
          dataTestId="browse-github"
          color="text-[#adbdcc]"
          darkColor="text-[#adbdcc]"
        />
      </div>
      <div className="grid gap-y-2 ml-4">
        <MdOutlineArticle color="white" size="36"></MdOutlineArticle>
        <h2 className="text-xl font-semibold relative tracking-[-0.05em] text-white">
          Publications
        </h2>
        <p className="tracking-[0.2px] text-[#adbdcc]">
          My research aims to contribute to the evolving field of machine
          learning.
        </p>
        <CallToAction
          justify="justify-start"
          includeArrow
          excludeLeftPadding
          href="https://www.mdpi.com/2079-9292/13/23/4725?trk=feed_main-feed-card_feed-article-content"
          title="Browse publications"
          dataTestId="browse-publications"
          color="text-[#adbdcc]"
          darkColor="text-[#adbdcc]"
        />
      </div>
      <div className="grid gap-y-2 ml-4">
        <SiGnometerminal color="white" size="36"></SiGnometerminal>
        <h2 className="text-xl font-semibold relative tracking-[-0.05em] text-white">
          Developer Workbench
        </h2>
        <p className="tracking-[0.2px] text-[#adbdcc]">
          See what powers my dev flow: tools, themes, gear, and shortcuts I
          can&apos;t live without.
        </p>
        <CallToAction
          justify="justify-start"
          includeArrow
          excludeLeftPadding
          href="https://github.com/andrew-codes/devtools"
          title="View developer workbench"
          dataTestId="view-developer-workbench"
          color="text-[#adbdcc]"
          darkColor="text-[#adbdcc]"
        />
      </div>
      <div className="grid gap-y-2 ml-4">
        <TbPuzzle color="white" size="36"></TbPuzzle>
        <h2 className="text-xl font-semibold relative tracking-[-0.05em] text-white">
          Design Patterns
        </h2>
        <p className="tracking-[0.2px] text-[#adbdcc]">
          Explore classic design patterns through focused, self-contained
          examples.
        </p>
        <CallToAction
          justify="justify-start"
          includeArrow
          excludeLeftPadding
          href="https://github.com/walkerrandolphsmith/desgin-patterns"
          title="Explore examples"
          dataTestId="browse-hugging-face"
          color="text-[#adbdcc]"
          darkColor="text-[#adbdcc]"
        />
      </div>
    </section>
  </div>
)

export default Examples
