import Head from 'next/head'
import React from 'react'

import { education } from '@/constants'

import Footer from './Footer'
import GuidedSection from './GuidedSection'
import { ResumeNav } from './Nav'

const bulletListClassName = `list-disc leading-normal marker:text-[#4468b1] dark:marker:text-violet-500 pl-5 gap-y-1 text-md print:text-[14px]`
const bulletClassName = `font-light text-zinc-600 dark:text-gray-400`

const jobs = [
  {
    title: 'Staff Engineer, then Director of Engineering',
    company: 'Blue Line Solutions',
    dates: '2025 – Present',
    highlights: [
      'Joined as Staff Engineer and was promoted to Director of Engineering within 8 months.',
      'Directed engineering for NewGuard, a CJIS-compliant SaaS platform for 200+ law enforcement agencies across the US.',
      'Owned the migration of a national traffic enforcement platform from an end-of-life data center to AKS. The platform processes millions of IoT events each day. The migration dropped no billable event and had no downtime outside regular maintenance windows.',
      'Passed a CJIS audit and secured final NLETS approval. Provisioned isolated Azure tenants with Terraform and enforced data-boundary controls that keep CJIS data inside the environment.',
      'Replaced stop-the-site releases with a GitOps delivery model with image promotion pipelines and human approval gates. Delivered 999 automated zero-downtime production releases in one quarter, versus 71 legacy releases that each required an outage.',
      'Grew the engineering organization by an engineering manager and two software engineers. Established the SRE role, an on-call rotation, and a 5-level role progression ladder. Both new engineers met every 30-60-90 day milestone.',
      'Replaced ~150 static secrets across 15+ services with managed identity and certificate authentication through a shared library. Automated every remaining rotation and put single sign-on in front of all internal tools.',
      'Built the observability layer from nothing: 19 Grafana dashboards and ~20 Prometheus alert rules. The alerts caught citations issued on paid tickets, silent certificate-rotation failures, and stalled FTP intake before any customer did.',
      'Cut print runs from 12–15 hours to 2 hours and ended print-server crashes. Fixed a years-old memory leak in jsreport, merged upstream.',
      'Made AI-generated code safe to release at volume. Consolidated 45 service pipelines into an NX monorepo and cut build times 67%, from 12 to 4 minutes.',
      'Added on-demand ephemeral environments with isolated data for every change. Added an integration test suite for the full platform and static analysis, unit, visual, end-to-end, and SBOM quality gates.',
    ],
  },
  {
    title: 'Senior Software Engineer',
    company: 'Microsoft',
    dates: '2021 – 2025',
    highlights: [
      'Architected and implemented a distributed event-driven platform across 3 organizations. It powers CMS systems for support.microsoft.com, Office, and Windows, with 2B+ users and 1B+ requests each month.',
      'Reclaimed about 1,300 developer hours each year by making CI 6x faster.',
      'Reduced rollbacks by 30% with ephemeral environments that enable full end-to-end testing across a distributed system.',
      'Improved Lighthouse scores from 48 to 100 and cut page load time by 5 seconds with Incremental Static Regeneration at 2B+ user scale.',
      'Reduced content publication latency from 2 hours to 1 minute. Led the design and rollout of an event-driven system across five organizations.',
      'Launched a Work in Progress series for 50+ engineers. Contributors and reviewers learn from each other across teams.',
      'Led a team of six to build a RAG pipeline that enforces editorial standards for help content. It improved customer satisfaction scores and opened governed contributions from the technical writing team to all Microsoft employees.',
    ],
  },
  {
    title: 'Senior Software Engineer',
    company: 'Digital.ai (formerly VersionOne)',
    dates: '2018 – 2021',
    highlights: [
      'Scaled a commercial value stream management and CI/CD platform that served 53% of the Fortune 100 and millions of users.',
      'Core contributor to the VersionOne JavaScript SDK, with 200+ weekly downloads. Enterprise customers use it to build against the product suite.',
      'Led development of a scalable webhooks feature. Hundreds of engineering teams used it to build custom integrations and automate workflows.',
      'Removed week-long manual regression cycles across three teams with Cypress end-to-end tests.',
      'Reduced front-end development costs by 40% with a shared component library for 6 teams across two merged products.',
    ],
  },
  {
    title: 'Senior Software Engineer',
    company: 'smash.gg',
    dates: '2017 – 2018',
    highlights: [
      'Led development of the Event Check-in feature, which moved the company from in-person to online esports. The change made the company the market leader and opened a high-growth revenue stream.',
      'Defined the Software Engineer in Test role and hired two engineers to automate critical user flows with Cypress.',
      'Eliminated human error in Firebase security rules by introducing the Bolt compiler.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'VersionOne',
    dates: '2014 – 2017',
    highlights: [],
  },
]

const community = [
  'Conducted a hands-on Redux workshop at Connect.Tech, the largest multi-framework conference in the US.',
  'Presented at React ATL, a 4K-member meetup, on functional programming and engineering practices.',
  'Open source contributor to Cypress, Azure Functions, JsonEditor, Kafdrop, react-treeview, and jsreport.',
  'Co-admin of a curated, invite-only software engineering community. It runs resume reviews, mock interviews, hack nights, and show-and-tells.',
]

const skills = [
  [
    'Architecture & Design',
    'Distributed Systems, Microservices, Monorepo (NX), Cloud Architecture',
  ],
  [
    'Cloud & Infrastructure',
    'Azure, Terraform, FluxCD, Istio, Kubernetes, Helm, Docker, AWS',
  ],
  ['Compliance', 'CJIS, SOC 2, NLETS, FIPS 140-3'],
  [
    'Security',
    'Entra ID, RBAC / ABAC, Managed Identity, Workload Identity Federation, Azure Key Vault, External Secrets Operator, Azure Firewall, WAF, mTLS, Policy-as-Code (Azure Policy, Kyverno, Cloud Custodian), SBOM',
  ],
  [
    'Observability & Messaging',
    'OpenTelemetry, Prometheus, Grafana, Azure Service Bus, RabbitMQ',
  ],
  [
    'Testing & Quality',
    'Playwright, Cypress, Jest, xUnit, k6, Visual Regression, Ephemeral Environments',
  ],
  [
    'Agentic Engineering',
    'Claude Code, multi-agent orchestration (firstmate), RAG',
  ],
  [
    'Machine Learning',
    'PyTorch, Transformers, CNNs, NLP, scikit-learn, pandas, NumPy, Matplotlib, Jupyter',
  ],
  [
    'Data & Databases',
    'SQL Server, Azure Cosmos DB, MongoDB, ClickHouse, Apache Spark, Azure Data Factory',
  ],
  [
    'CI/CD',
    'Azure DevOps, GitHub Actions, NX (affected builds), Skopeo, OCI Artifacts, Kustomize, Bash',
  ],
  [
    'Languages & Frameworks',
    'C#, Python, TypeScript, Node.js, React, Next.js, GraphQL',
  ],
]

const Resume = () => (
  <>
    <Head>
      <meta property="og:title" content={'Resume'} />
      <meta
        property="og:description"
        content={'Walker Randolph Smith Resume'}
      />
    </Head>
    <ResumeNav isResumePage />
    <GuidedSection
      guideDashedColor="transparent"
      noPaddingOnPrint
      backgroundDark="oklch(21% .006 285.885)"
      guideSolidColorDark="rgba(255, 255, 255, 0.08)"
    >
      <div
        className={`ml-8 mr-8 md:ml-8 md:mr-0 print:ml-0 max-w-[50rem] print:py-0 text-zinc-950 dark:text-white grid grid-col gap-y-8 print:gap-y-2`}
      >
        <header className={`grid gap-y-4 print:gap-y-2 print:mb-4`}>
          <div className={`grid gap-y-1 print:gap-y-0`}>
            <h1 className={`text-5xl print:text-[36px] font-bold`}>
              Walker Smith
            </h1>
            <div className={`grid gap-y-0`}>
              <p
                className={`text-xl print:text-[18px] text-zinc-600 dark:text-gray-300`}
              >
                Staff Engineer, Developer Experience and Platform
              </p>
              <p
                className={`gap-y-1 text-sm print:text-[14px] text-gray-600 dark:text-gray-400 dark:text-gray-400 flex flex-row`}
              >
                +1-706-577-6256 • walkerrandolphsmith@gmail.com •
                linkedin.com/in/walkerrandolphsmith
              </p>
            </div>
          </div>
          <p className={`font-light text-md print:text-[18px] leading-normal`}>
            I have 12 years of engineering experience. I build CI/CD, test
            environments, and observability for engineering teams. I direct
            engineering at Blue Line Solutions.
          </p>
        </header>

        <section className={`grid grid-col gap-y-2`}>
          <h2
            className={`text-sm print:text-[12px] border-b pb-1 text-[#4468b1] dark:text-violet-500`}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            WORK EXPERIENCE
          </h2>
          <div className={`grid gap-y-6`}>
            {jobs.map(job => (
              <div key={job.company} className={`grid grid-col gap-y-1`}>
                <div className={`flex justify-between items-start gap-y-0`}>
                  <div className={`grid grid-col gap-y-0`}>
                    <h3
                      className={`font-bold text-lg print:text-[18px] text-zinc-700 dark:text-gray-300`}
                    >
                      {job.title}
                    </h3>
                    <p
                      className={`font-light text-lg print:text-[16px] text-zinc-600 dark:text-gray-400`}
                    >
                      {job.company}
                    </p>
                  </div>
                  <p
                    className={`text-md print:text-[14px] text-gray-600 dark:text-gray-400 leading-[28px] whitespace-nowrap`}
                  >
                    {job.dates}
                  </p>
                </div>
                {job.highlights.length > 0 && (
                  <ul className={bulletListClassName}>
                    {job.highlights.map(highlight => (
                      <li key={highlight} className={bulletClassName}>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className={`grid grid-col gap-y-2`}>
          <h2
            className={`text-sm print:text-[12px] border-b pb-1 text-[#4468b1] dark:text-violet-500`}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            EDUCATION
          </h2>
          <ul
            className={`list-none p-0 m-0 leading-normal gap-y-1 text-md print:text-[14px]`}
          >
            {education.degrees.map(degree => (
              <li key={degree.degree} className={`flex justify-between`}>
                <div className={`grid grid-col print:gap-y-0 gap-y-1`}>
                  <p>
                    <span className={`font-semibold`}>{degree.degree}</span>,{' '}
                    <span className={`text-zinc-600 dark:text-gray-400`}>
                      {degree.school}
                    </span>
                  </p>
                  {degree.note && (
                    <p className={`text-sm print:text-[12px]`}>{degree.note}</p>
                  )}
                </div>
                <div className={`ml-4 whitespace-nowrap`}>{degree.year}</div>
              </li>
            ))}
          </ul>
        </section>

        <section className={`grid grid-col gap-y-2`}>
          <h2
            className={`text-sm print:text-[12px] border-b pb-1 text-[#4468b1] dark:text-violet-500`}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            PUBLICATIONS
          </h2>
          <p
            className={`text-zinc-600 dark:text-gray-400 text-md print:text-[14px]`}
          >
            “{education.publication.title},”{' '}
            <span className={`font-semibold`}>
              {education.publication.venue}
            </span>
            , {education.publication.date}
          </p>
        </section>

        <section className={`grid grid-col gap-y-2`}>
          <h2
            className={`text-sm print:text-[12px] border-b pb-1 text-[#4468b1] dark:text-violet-500`}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            OPEN SOURCE & COMMUNITY
          </h2>
          <ul className={bulletListClassName}>
            {community.map(item => (
              <li key={item} className={bulletClassName}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className={`grid grid-col gap-y-2`}>
          <h2
            className={`text-sm print:text-[12px] border-b pb-1 text-[#4468b1] dark:text-violet-500`}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            SKILLS
          </h2>
          <ul className={bulletListClassName}>
            {skills.map(([category, list]) => (
              <li key={category} className={bulletClassName}>
                <span className={`font-normal`}>{category}:</span> {list}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </GuidedSection>
    <GuidedSection
      as="footer"
      background="#f6f9fc"
      guideDashedColor="transparent"
      backgroundDark="oklch(27.4% .006 286.033)"
      guideSolidColorDark="rgba(255, 255, 255, 0.08)"
      printHidden
      noPadding
    >
      <Footer />
    </GuidedSection>
  </>
)

export default Resume
