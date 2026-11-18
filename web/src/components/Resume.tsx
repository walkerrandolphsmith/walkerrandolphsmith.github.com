import React from 'react'

import {
  community,
  education,
  jobs,
  resumeSummary,
  skills,
} from '@/data/resume'

import Footer from './Footer'
import GuidedSection from './GuidedSection'
import { ResumeNav } from './Nav'

const bulletListClassName = `list-disc leading-normal marker:text-[#4468b1] dark:marker:text-violet-500 pl-5 gap-y-1 text-md print:text-[14px]`
const bulletClassName = `font-light text-zinc-600 dark:text-gray-400`
const datesClassName = `text-md print:text-[14px] text-gray-600 dark:text-gray-400 leading-[28px] whitespace-nowrap`

const Highlights = ({ highlights = [] }: { highlights?: string[] }) =>
  highlights.length > 0 ? (
    <ul className={bulletListClassName}>
      {highlights.map(highlight => (
        <li key={highlight} className={bulletClassName}>
          {highlight}
        </li>
      ))}
    </ul>
  ) : null

const Resume = () => (
  <>
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
            {resumeSummary}
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
            {jobs.map(job =>
              job.roles ? (
                <div key={job.company} className={`grid grid-col gap-y-3`}>
                  <div className={`flex justify-between items-start`}>
                    <h3
                      className={`font-bold text-lg print:text-[18px] text-zinc-700 dark:text-gray-300`}
                    >
                      {job.company}
                    </h3>
                    <p className={datesClassName}>{job.dates}</p>
                  </div>
                  {job.roles.map(role => (
                    <div key={role.title} className={`grid grid-col gap-y-1`}>
                      <div className={`flex justify-between items-start`}>
                        <h4
                          className={`font-semibold text-md print:text-[16px] text-zinc-700 dark:text-gray-300`}
                        >
                          {role.title}
                        </h4>
                        <p className={datesClassName}>{role.dates}</p>
                      </div>
                      <Highlights highlights={role.highlights} />
                    </div>
                  ))}
                </div>
              ) : (
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
                    <p className={datesClassName}>{job.dates}</p>
                  </div>
                  <Highlights highlights={job.highlights} />
                </div>
              ),
            )}
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
