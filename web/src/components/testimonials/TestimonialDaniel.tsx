import TestimonialCard from '@/components/TestimonialCard'

import DanielImage from '../../../public/daniel.webp'

const Testimonial = ({ offset = false }) => (
  <TestimonialCard
    offset={offset}
    name="Daniel Gruesso"
    level="Head of Product"
    company="COTI Group"
    url="https://www.linkedin.com/in/danielgruesso/"
    image={DanielImage}
  >
    <div className="flex flex-col gap-2">
      <p className="indent-8">
        I had the pleasure of working closely with Walker, and I can confidently
        say he exemplifies what it means to be an{' '}
        <span className="font-semibold text-[#0a2540] dark:text-white">
          impactful engineering leader
        </span>
        . Walker has a deep understanding of developer experience and a rare
        ability to balance technical excellence with people-first leadership.
      </p>

      <p className="indent-8">
        He doesn&apos;t just lead teams—he empowers them to thrive by
        identifying high-leverage improvements in tooling, testing, and
        workflows that drive real efficiency and quality. Whether he&apos;s
        mentoring engineers, aligning stakeholders, or guiding devex strategy,
        Walker brings clarity, empathy, and relentless focus on outcomes.
      </p>

      <p className="font-semibold">
        Any team would be lucky to have him at the helm.
      </p>
    </div>
  </TestimonialCard>
)

export default Testimonial
