import TestimonialCard from '@/components/TestimonialCard'

import Image from '../../../public/tony.webp'

const TestimonialTony = ({ offset = false }) => (
  <TestimonialCard
    offset={offset}
    image={Image}
    name="Tony Ashworth"
    level="Staff Engineer"
    company="Root Inc"
    url="https://www.linkedin.com/in/tonyashworth/"
  >
    <div className="flex flex-col gap-2">
      <p className="indent-8">
        I had the pleasure of working with Walker during my time at VersionOne,
        and I always appreciated the thoughtfulness he brought to every
        conversation. He has a rare ability to challenge assumptions in a way
        that feels constructive rather than critical. His questions felt like
        like guideposts helping us make better, more intentional and informed
        decisions.
      </p>
      <p className="indent-8">
        What stood out most to me was his energy and presence. He brings a kind
        of enthusiasm that lifts the people around him and makes collaboration
        easier and more enjoyable. He&apos;s also incredibly authentic and
        always makes time to talk through ideas or offer support to his
        teammates.
      </p>
      <p className="indent-8">
        If you&apos;re looking for someone who brings both critical thinking and
        genuine care for his peers, Walker is someone you want on your team.
      </p>
    </div>
  </TestimonialCard>
)

export default TestimonialTony
