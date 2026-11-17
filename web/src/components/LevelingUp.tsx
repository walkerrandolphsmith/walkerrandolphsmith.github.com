import {
  TbGitPullRequest,
  TbMessages,
  TbStairsUp,
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
        <TbStairsUp color="white" size="36" aria-hidden="true" />
        <h3 className="text-xl font-semibold relative tracking-[-0.05em] text-white">
          SRE role and career ladder
        </h3>
        <p className="tracking-[0.2px] text-[#adbdcc]">
          At Blue Line Solutions, I set up the SRE role, an on-call rotation,
          and a 5-level career ladder. Both new engineers met every 30-60-90 day
          milestone.
        </p>
      </div>
      <div className="grid gap-y-2 ml-4 content-start">
        <TbGitPullRequest color="white" size="36" aria-hidden="true" />
        <h3 className="text-xl font-semibold relative tracking-[-0.05em] text-white">
          Upstream fixes
        </h3>
        <p className="tracking-[0.2px] text-[#adbdcc]">
          I fixed a years-old memory leak in jsreport, and the fix merged
          upstream. Print runs went from 12–15 hours to 2 hours. I also
          contribute to Cypress, Azure Functions, JsonEditor, Kafdrop, and
          react-treeview.
        </p>
        <CallToAction
          justify="justify-start"
          includeArrow
          excludeLeftPadding
          openExternally
          href="https://github.com/walkerrandolphsmith/contributions"
          title="View contributions"
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
    <p className="px-4 tracking-[0.2px] text-[#adbdcc]">
      Talks: functional programming at the{' '}
      <a
        href="https://www.meetup.com/react-atl/events/228038882/?eventOrigin=group_events_list"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
        data-test="view-react-atl"
      >
        React ATL meetup
      </a>{' '}
      (4K members) and a Redux workshop at{' '}
      <a
        href="https://2017.connect.tech/#speakers"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
        data-test="view-react-connect-tech"
      >
        Connect.Tech
      </a>
      .
    </p>
  </div>
)

export default LevelingUp
