import {
  TbGitPullRequest,
  TbMessages,
  TbPresentation,
  TbUsersGroup,
} from 'react-icons/tb'

import CallToAction from './CallToAction'
import SectionHeader from './SectionHeader'

const linkClassName =
  'underline decoration-[#adbdcc]/50 underline-offset-4 hover:text-white'

const LevelingUp = () => (
  <div className="grid gap-y-12">
    <header className="px-8 grid gap-y-4">
      <SectionHeader
        title="Leveling up other engineers"
        byline="I started a Work in Progress series for 50+ engineers at Microsoft. I co-admin an invite-only community for software engineers."
      />
    </header>
    <section className="grid sm:grid-cols-[repeat(2,1fr)] lg:grid-cols-[repeat(4,1fr)] gap-x-8 gap-y-12">
      <div className="grid gap-y-2 ml-4 content-start">
        <TbMessages color="white" size="36" aria-hidden="true" />
        <h3 className="text-xl font-semibold relative tracking-[-0.05em] text-white">
          Work in Progress series
        </h3>
        <p className="tracking-[0.2px] text-[#adbdcc]">
          Engineers share work before it is done and get early review.
          Contributors and reviewers learn from each other across teams.
        </p>
        <CallToAction
          justify="justify-start"
          includeArrow
          excludeLeftPadding
          href="/blog/work-in-progress-the-missing-agile-ceremony"
          title="Read the write-up"
          dataTestId="read-work-in-progress"
          color="text-[#adbdcc]"
          darkColor="text-[#adbdcc]"
        />
      </div>
      <div className="grid gap-y-2 ml-4 content-start">
        <TbPresentation color="white" size="36" aria-hidden="true" />
        <h3 className="text-xl font-semibold relative tracking-[-0.05em] text-white">
          Talks and workshops
        </h3>
        <p className="tracking-[0.2px] text-[#adbdcc]">
          I led a hands-on Redux workshop at{' '}
          <a
            href="https://2017.connect.tech/#speakers"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
            data-test="view-react-connect-tech"
          >
            Connect.Tech
          </a>
          , the largest multi-framework conference in the US, and spoke at{' '}
          <a
            href="https://www.meetup.com/react-atl/events/228038882/?eventOrigin=group_events_list"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
            data-test="view-react-atl"
          >
            React ATL
          </a>
          , a 4K-member meetup.
        </p>
      </div>
      <div className="grid gap-y-2 ml-4 content-start">
        <TbGitPullRequest color="white" size="36" aria-hidden="true" />
        <h3 className="text-xl font-semibold relative tracking-[-0.05em] text-white">
          Upstream fixes
        </h3>
        <p className="tracking-[0.2px] text-[#adbdcc]">
          I fixed a years-old memory leak in jsreport. The fix kept the Chrome
          pool and avoided a workaround that used 5.5x more CPU.
        </p>
        <CallToAction
          justify="justify-start"
          includeArrow
          excludeLeftPadding
          openExternally
          href="https://github.com/walkerrandolphsmith/contributions"
          title="See all contributions"
          dataTestId="view-contributions"
          color="text-[#adbdcc]"
          darkColor="text-[#adbdcc]"
        />
      </div>
      <div className="grid gap-y-2 ml-4 content-start">
        <TbUsersGroup color="white" size="36" aria-hidden="true" />
        <h3 className="text-xl font-semibold relative tracking-[-0.05em] text-white">
          Engineering community
        </h3>
        <p className="tracking-[0.2px] text-[#adbdcc]">
          I co-admin an invite-only community for software engineers. We run
          resume reviews, mock interviews, hack nights, and show-and-tells.
        </p>
        <CallToAction
          justify="justify-start"
          includeArrow
          excludeLeftPadding
          openExternally
          href="https://docs.google.com/forms/d/e/1FAIpQLSe_BqiJlvFcpZRB78YWh73rRf8Yrmm2N0WAiPJngV4QXbqEkw/viewform?usp=sharing&ouid=101450760205764065320"
          title="Ask to join"
          dataTestId="join-discord"
          color="text-[#adbdcc]"
          darkColor="text-[#adbdcc]"
        />
      </div>
    </section>
  </div>
)

export default LevelingUp
