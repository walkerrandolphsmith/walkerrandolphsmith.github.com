import { GrWorkshop } from 'react-icons/gr'
import { SiDiscord, SiReact } from 'react-icons/si'
import { VscGitPullRequest } from 'react-icons/vsc'

import CallToAction from './CallToAction'
import SectionHeader from './SectionHeader'
import SocialGraph from './SocialGraph'

const CommunityHighlights = () => (
  <div className="grid gap-y-16">
    <section className="">
      <div
        id="column-layout"
        className={`grid gap-y-8 gap-x-8 items-start lg:grid-cols-[repeat(2,1fr)]`}
      >
        <div className="grid grid-cols-1 gap-y-12">
          <header className="px-8 grid gap-y-4">
            <SectionHeader
              title="OSS Contributor & Dev Community Speaker"
              byline="I have given talks at React-ATL, lead hands-on workshops at
              Connect.Tech, and make small contributions to open source projects
              that make the web better—one pull request at a time."
              maxWidth="max-w-full"
            />
          </header>
        </div>
        <div className="grid grid-cols-1 gap-y-12 items-start px-8 lg:px-0">
          <SocialGraph />
        </div>
      </div>
    </section>
    <section className="grid sm:grid-cols-[repeat(2,1fr)] lg:grid-cols-[repeat(4,1fr)] gap-y-12">
      <div className="grid gap-y-2 ml-4">
        <SiReact color="white" size="36"></SiReact>
        <h2 className="text-xl font-semibold relative tracking-[-0.05em] text-white">
          React-ATL Speaker
        </h2>
        <p className="tracking-[0.2px] text-[#adbdcc] md:min-h-[100px] lg:min-h-[150px]">
          4K+ member group. Presented to audience of 50+ engineers, covering
          functional programming and facilitating community-driven discussion.
        </p>
        <CallToAction
          justify="justify-start"
          openExternally
          includeArrow
          excludeLeftPadding
          href="https://www.meetup.com/react-atl/events/228038882/?eventOrigin=group_events_list"
          title="View presentation"
          dataTestId="view-react-atl"
          color="text-[#adbdcc]"
          darkColor="text-[#adbdcc]"
        />
      </div>
      <div className="grid gap-y-2 ml-4">
        <GrWorkshop color="white" size="36"></GrWorkshop>
        <h2 className="text-xl font-semibold relative tracking-[-0.05em] text-white">
          Connect.Tech Workshops
        </h2>
        <p className="tracking-[0.2px] text-[#adbdcc] md:min-h-[100px] lg:min-h-[150px]">
          Conducted a hands-on workshop on Redux at Connect.Tech, a major
          industry conference, training 50+ engineers in state management best
          practices and real-world application design.
        </p>
        <CallToAction
          justify="justify-start"
          includeArrow
          excludeLeftPadding
          openExternally
          href="https://2017.connect.tech/#speakers"
          title="View workshop"
          dataTestId="view-react-connect-tech"
          color="text-[#adbdcc]"
          darkColor="text-[#adbdcc]"
        />
      </div>
      <div className="grid gap-y-2 ml-4">
        <VscGitPullRequest color="white" size="36"></VscGitPullRequest>
        <h2 className="text-xl font-semibold relative tracking-[-0.05em] text-white">
          Open source contributor
        </h2>
        <p className="tracking-[0.2px] text-[#adbdcc] md:min-h-[100px] lg:min-h-[150px]">
          Conributions to Cypress.io, JsonEditor, Kafdrop, react-treeview,
          developer-icons, VersionOne SDKs, VersionOne Component Library and
          more.
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
      <div className="grid gap-y-2 ml-4">
        <SiDiscord color="white" size="36"></SiDiscord>
        <h2 className="text-xl font-semibold relative tracking-[-0.05em] text-white">
          Software Craftsmen Discord
        </h2>
        <p className="tracking-[0.2px] text-[#adbdcc] md:min-h-[100px] lg:min-h-[150px]">
          Core member and admin of Discord community of 50+ engineers focused on
          software craftsmanship, leading code jams, show & tells, resume
          reviews, and peer mentorship.
        </p>
        <CallToAction
          justify="justify-start"
          includeArrow
          excludeLeftPadding
          openExternally
          href="https://docs.google.com/forms/d/e/1FAIpQLSe_BqiJlvFcpZRB78YWh73rRf8Yrmm2N0WAiPJngV4QXbqEkw/viewform?usp=sharing&ouid=101450760205764065320"
          title="Join now"
          dataTestId="join-discord"
          color="text-[#adbdcc]"
          darkColor="text-[#adbdcc]"
        />
      </div>
    </section>
  </div>
)

export default CommunityHighlights
