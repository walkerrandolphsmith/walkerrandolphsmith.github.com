import TestimonialCard from '@/components/TestimonialCard'

import Image from '../../../public/matthew.webp'

const TestimonialMatthew = ({ offset = false }) => (
  <TestimonialCard
    offset={offset}
    image={Image}
    name="Matthew Almand"
    level="Director of UI/UX"
    company="IncidentIQ"
    url="https://www.linkedin.com/in/matthew-almand-7237b34/"
  >
    <div className="flex flex-col gap-2">
      <p className="indent-8">
        I worked with Walker some years back at VersionOne (Digital.ai) on
        several projects within the same team. Walker in my mind is a visionary
        in many ways in that he is looking at not only the big picture but the
        future as well, cognizant of both where the company strategy stands and
        what efficiencies and improves his contributions can make down the road.
        THIS is the type of developer you want not only coding but also{' '}
        <span className="font-semibold text-[#0a2540] dark:text-white">
          leading
        </span>{' '}
        other developers in your company.
      </p>
      <p className="indent-8">
        In addition, Walker is both engaging and proactive in team building,
        activities and practices. He pushes those around him to excel more and
        brings the quality of work up overall. I do not hesitate to recommend
        Walker as a valuable addition to any software team he pursues.
      </p>
    </div>
  </TestimonialCard>
)

export default TestimonialMatthew
