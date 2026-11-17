import TestimonialCard from '@/components/TestimonialCard'

import Image from '../../../public/jerry.webp'

const TestimonialJerry = ({ offset = false }) => (
  <TestimonialCard
    offset={offset}
    image={Image}
    name="Jerry Odenwelder"
    level="Senior Product Manager"
    company="Digital.ai"
    url="https://www.linkedin.com/in/jerryodenwelder/"
  >
    <div className="flex flex-col gap-2">
      <p className="indent-8">
        I had the pleasure of working alongside Walker Smith for several years
        at VersionOne, where he consistently raised the bar for technical
        excellence and team collaboration. Walker&apos;s deep expertise in
        software engineering and Agile methodologies was evident not only in his
        own work but also in the way he empowered others to grow and succeed.
      </p>
      <p className="indent-8">
        One standout example was when Walker{' '}
        <span className="font-semibold text-[#0a2540] dark:text-white">
          led
        </span>{' '}
        a critical performance enhancement for a major product feature. Rather
        than simply addressing the technical challenge, he actively engaged in
        the discovery process and asked thoughtful questions to understand our
        customers&apos; real-world usage and pain points. This holistic approach
        enabled us to deliver a solution that not only met our technical goals
        but also significantly improved customer satisfaction—all within our
        original timeline.
      </p>
      <p className="indent-8">
        Walker&apos;s attention to detail, pragmatic problem-solving, and calm,
        thoughtful communication made him a trusted partner across
        cross-functional teams. He is always willing to share knowledge, mentor
        colleagues, and foster a culture of continuous improvement. Any
        organization would be fortunate to have Walker on their team—he combines
        deep technical skills, a strategic mindset, and a genuine passion for
        creating customer value.
      </p>
    </div>
  </TestimonialCard>
)

export default TestimonialJerry
