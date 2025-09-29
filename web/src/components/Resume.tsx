import Head from 'next/head'
import React from 'react'

import Footer from './Footer'
import GuidedSection from './GuidedSection'
import { ResumeNav } from './Nav'

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
                Software Engineering Lead
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
            Software engineering leader with over ten years of experience
            specializing in distributed systems serving 2 billion customers and
            front-end architecture. Thrives on extreme ownership— across
            systems, teams, and outcomes. Drives strategy, aligns engineering
            with business goals, and cultivates high performing teams that ship
            with purpose.
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
            <div className={`grid grid-col gap-y-1`}>
              <div className={`flex justify-between items-start gap-y-0`}>
                <div className={`grid grid-col gap-y-0`}>
                  <h3
                    className={`font-bold text-lg print:text-[18px] text-zinc-700 dark:text-gray-300`}
                  >
                    Senior Software Engineer
                  </h3>
                  <p
                    className={`font-light text-lg print:text-[16px] text-zinc-600 dark:text-gray-400`}
                  >
                    Microsoft
                  </p>
                </div>
                <p
                  className={`text-md print:text-[14px] text-gray-600 dark:text-gray-400 leading-[28px]`}
                >
                  2021 – 2025
                </p>
              </div>
              <ul
                className={`list-disc leading-normal marker:text-[#4468b1] dark:marker:text-violet-500 pl-5 gap-y-1 text-md print:text-[14px]`}
              >
                <li className={`font-light text-zinc-600 dark:text-gray-400`}>
                  Reduced content publication latency by 99%+ by leading the
                  design and rollout of an event-driven system across five teams
                </li>
                <li className={`font-light text-zinc-600 dark:text-gray-400`}>
                  Improved Lighthouse scores from 48 to 100 and cut 5s off page
                  load time by rearchitecting the platform with Incremental
                  Static Regeneration, driving gains in SEO and user experience
                </li>
                <li className={`font-light text-zinc-600 dark:text-gray-400`}>
                  Led a team of six to develop AI-powered tooling, expanding
                  content coverage and preserving Microsoft’s voice and
                  editorial standards, resulting in hundreds of uses within the
                  first two weeks post-launch
                </li>
                <li className={`font-light text-zinc-600 dark:text-gray-400`}>
                  Scaled platform from hundreds to thousands of contributors by
                  implementing governed, open contribution model
                </li>
                <li className={`font-light text-zinc-600 dark:text-gray-400`}>
                  Led 50 engineers, driving best practices and cultivating a
                  culture of ownership, technical excellence, and continuous
                  improvement through work-in-progress sessions
                </li>
                <li className={`font-light text-zinc-600 dark:text-gray-400`}>
                  Reduced rollbacks by 30% by architecting ephemeral
                  environments, enabling full end-to-end testing across a
                  distributed system
                </li>
                <li className={`font-light text-zinc-600 dark:text-gray-400`}>
                  Enabled unit testing for 44,000 previously untestable lines of
                  code, covering 80% of core user flows, thereby enhancing the
                  testability and reliability of flagship platform features
                </li>
                <li className={`font-light text-zinc-600 dark:text-gray-400`}>
                  Reduced CI duration 600%, saving approximately 1,300 developer
                  hours annually, enhancing deployment speed, and accelerating
                  feature delivery across engineering teams
                </li>
              </ul>
            </div>

            <div className={`grid grid-col gap-y-1`}>
              <div className={`flex justify-between items-start`}>
                <div className={`grid grid-col`}>
                  <h3
                    className={`font-bold text-lg print:text-[18px] text-zinc-700 dark:text-gray-300`}
                  >
                    Senior Software Engineer
                  </h3>
                  <p
                    className={`font-light text-lg print:text-[16px] text-zinc-600 dark:text-gray-400`}
                  >
                    digital.ai
                  </p>
                </div>
                <p
                  className={`text-md print:text-[14px] text-gray-600 dark:text-gray-400 leading-[28px]`}
                >
                  2018 – 2021
                </p>
              </div>
              <ul
                className={`list-disc leading-normal marker:text-[#4468b1] dark:marker:text-violet-500 pl-5 gap-y-1 text-md print:text-[14px]`}
              >
                <li className={`font-light text-zinc-600 dark:text-gray-400`}>
                  Eliminated week-long manual regression cycles across three
                  teams, saving 90 engineering hours per release by implementing
                  automated visual regression and end-to-end testing, boosting
                  release confidence
                </li>
                <li className={`font-light text-zinc-600 dark:text-gray-400`}>
                  Coached teams across two products and served as subject matter
                  expert in React, Redux, and front-end best practices,
                  elevating core competencies to drive technical growth
                </li>
                <li className={`font-light text-zinc-600 dark:text-gray-400`}>
                  Unlocked hundreds of critical enterprise integrations used by
                  over 50% of Fortune 500 by pioneering scalable webhooks
                  feature
                </li>
              </ul>
            </div>

            <div className={`grid grid-col gap-y-1`}>
              <div className={`flex justify-between items-start`}>
                <div className={`grid grid-col`}>
                  <h3
                    className={`font-bold text-lg print:text-[18px] text-zinc-700 dark:text-gray-300`}
                  >
                    Software Engineer
                  </h3>
                  <p
                    className={`font-light text-lg print:text-[16px] text-zinc-600 dark:text-gray-400`}
                  >
                    smash.gg
                  </p>
                </div>
                <p
                  className={`text-md print:text-[14px] text-gray-600 dark:text-gray-400 leading-[28px]`}
                >
                  2017 – 2018
                </p>
              </div>
              <ul
                className={`list-disc leading-normal marker:text-[#4468b1] dark:marker:text-violet-500 pl-5 gap-y-1 text-md print:text-[14px]`}
              >
                <li className={`font-light text-zinc-600 dark:text-gray-400`}>
                  Transitioned company from in-person to online esports,
                  re-positioning as market leader and unlocking high growth
                  revenue stream by leading development of &apos;Event
                  Check-in&apos; feature
                </li>
                <li className={`font-light text-zinc-600 dark:text-gray-400`}>
                  Defined and established Software Engineer in Test role, hiring
                  two engineers to automate critical user flows with Cypress,
                  boosting product reliability
                </li>
                <li className={`font-light text-zinc-600 dark:text-gray-400`}>
                  Introduced and coached agile practices to 30-person team,
                  enabling effective feature prioritization to meet major event
                  deadlines and secure funding rounds
                </li>
                <li className={`font-light text-zinc-600 dark:text-gray-400`}>
                  Eliminated human error in Firebase security rules by
                  introducing Bolt Compiler, automating critical security layer
                  and enhancing system reliability and development workflows
                </li>
              </ul>
            </div>

            <div className={`grid grid-col gap-y-1 print:mt-8`}>
              <div className={`flex justify-between items-start`}>
                <div className={`grid grid-col`}>
                  <h3
                    className={`font-bold text-lg print:text-[18px] text-zinc-700 dark:text-gray-300`}
                  >
                    Software Engineer
                  </h3>
                  <p
                    className={`font-light text-lg print:text-[16px] text-zinc-600 dark:text-gray-400`}
                  >
                    VersionOne
                  </p>
                </div>
                <p
                  className={`text-md print:text-[14px] text-gray-600 dark:text-gray-400 leading-[28px]`}
                >
                  2014 – 2017
                </p>
              </div>
              <ul
                className={`list-disc leading-normal marker:text-[#4468b1] dark:marker:text-violet-500 pl-5 gap-y-1 text-md print:text-[14px]`}
              >
                <li className={`font-light text-zinc-600 dark:text-gray-400`}>
                  Increased developer velocity by 15% by spearheading
                  integration of React, Redux, Webpack, and LESS into Continuum
                  product, modernizing the tech stack and streamlining workflows
                </li>
                <li className={`font-light text-zinc-600 dark:text-gray-400`}>
                  Reduced front-end development costs by 40% as core contributor
                  to component library, streamlining development across two
                  products
                </li>
                <li className={`font-light text-zinc-600 dark:text-gray-400`}>
                  Saved 3,000+ developer hours and boosted productivity by
                  implementing hot module replacement
                </li>
              </ul>
            </div>
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
            className={`list-none p-0 m-0 leading-normal marker:text-[#4468b1] dark:marker:text-violet-500 gap-y-1 text-md print:text-[14px]`}
          >
            <li className={`flex justify-between`}>
              <div className={`grid grid-col print:gap-y-0 gap-y-1`}>
                <p>
                  <span className={`font-semibold`}>
                    Columbus State University
                  </span>{' '}
                  —{' '}
                  <span className={`text-zinc-600 dark:text-gray-400 italic`}>
                    M.S. Machine Learning
                  </span>
                </p>
                <p>
                  <span className={`text-sm print:text-[12px]`}>
                    M.S. in Applied Computer Science: A.I.& Machine Learning
                    Track Award
                  </span>
                </p>
              </div>
              <div className={`ml-4 whitespace-nowrap`}>Present</div>
            </li>
            <li className={`flex justify-between`}>
              <div className={`grid grid-col gap-y-1`}>
                <p>
                  <span className={`font-semibold`}>
                    Columbus State University
                  </span>{' '}
                  —{' '}
                  <span className={`text-zinc-600 dark:text-gray-400 italic`}>
                    B.S. Computer Science
                  </span>
                </p>
              </div>
              <div className={`ml-4 whitespace-nowrap`}>2014</div>
            </li>
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
            “Deriving Entrepreneurial Insights from Open-Ended and Unstructured
            Survey Data Using NLP Techniques,”{' '}
            <span className={`font-semibold`}>MDPI</span>, November 2024
          </p>
        </section>

        <section className={`grid grid-col gap-y-2`}>
          <h2
            className={`text-sm print:text-[12px] border-b pb-1 text-[#4468b1] dark:text-violet-500`}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            OPEN SOURCE & COMMUNITY
          </h2>
          <ul
            className={`list-disc leading-normal marker:text-[#4468b1] dark:marker:text-violet-500 pl-5 gap-y-1 text-md print:text-[14px]`}
          >
            <li className={`font-light text-zinc-600 dark:text-gray-400`}>
              Contributed to Cypress, JsonEditor, Kafdrop, VersonOne SDKs
            </li>
            <li className={`font-light text-zinc-600 dark:text-gray-400`}>
              Presented at React ATL (4K+ member group) to an audience of 50+
              engineers, covering functional programming and facilitating
              community-driven discussion
            </li>
            <li className={`font-light text-zinc-600 dark:text-gray-400`}>
              Conducted a hands-on workshop on Redux at Connect.Tech, a major
              industry conference, training 50+ engineers in state management
              best practices and real-world application design
            </li>
          </ul>
        </section>

        <section className={`grid grid-col gap-y-2`}>
          <h2
            className={`text-sm print:text-[12px] border-b pb-1 text-[#4468b1] dark:text-violet-500`}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            SKILLS
          </h2>
          <ul
            className={`list-disc leading-normal marker:text-[#4468b1] dark:marker:text-violet-500 pl-5 gap-y-1 text-md print:text-[14px]`}
          >
            <li className={`font-light text-zinc-600 dark:text-gray-400`}>
              Programming Languages: TypeScript, C#, Python
            </li>
            <li className={`font-light text-zinc-600 dark:text-gray-400`}>
              Front-End Technologies: React, Next.js, GraphQL
            </li>
            <li className={`font-light text-zinc-600 dark:text-gray-400`}>
              Cloud & Infrastructure: Azure, Kubernetes, Bicep, Docker, NGINX
            </li>
            <li className={`font-light text-zinc-600 dark:text-gray-400`}>
              Messaging & Event Streaming: Azure Service Bus, RabbitMQ, Kafka
            </li>
            <li className={`font-light text-zinc-600 dark:text-gray-400`}>
              Databases: SQL Server, Azure Cosmos DB, MongoDB
            </li>
            <li className={`font-light text-zinc-600 dark:text-gray-400`}>
              Testing Frameworks: Cypress, Jest
            </li>
            <li className={`font-light text-zinc-600 dark:text-gray-400`}>
              Version Control & CI/CD: Git, Azure DevOps, Github Actions
            </li>
            <li className={`font-light text-zinc-600 dark:text-gray-400`}>
              Machine Learning: Azure OpenAI, pandas, NumPy, scikit-learn,
              skfuzzy
            </li>
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
