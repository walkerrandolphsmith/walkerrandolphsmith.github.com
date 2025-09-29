import TestimonialCard from '@/components/TestimonialCard'

import AlejandroImage from '../../../public/alejandro.webp'

const Testimonial = ({ offset = false }) => (
  <TestimonialCard
    offset={offset}
    name="Alejandro Guzman"
    level="Senior Software Engineer"
    company="Microsoft"
    url="https://www.linkedin.com/in/alejandrogguzman/"
    image={AlejandroImage}
  >
    <div className="flex flex-col gap-2">
      <p className="indent-8">
        I&apos;ve worked with Walker at various companies, and he is one of the
        most knowledgeable, well-rounded engineers I&apos;ve ever had the
        privilege of working with. He is articulate, precise, and a master of
        his craft. He not only builds high-quality software but also raises the
        bar for those around him.
      </p>
      <p className="indent-8">
        Walker has a strong sense of ownership. He takes initiative, follows
        through, and consistently delivers. He is dependable, driven, and
        genuinely passionate about software and building things that matter.
        When he is part of a team, you feel it. His presence elevates the
        energy, discipline, and overall quality of the work.
      </p>
      <p className="indent-8">
        What sets him apart is his ability to{' '}
        <span className="font-semibold text-[#0a2540] dark:text-white">
          bridge the gap between technical execution and product thinking.
        </span>{' '}
        He has a sharp instinct for what users truly need and knows how to
        translate that into thoughtfully scoped, iterative units of work. He
        ships real value early and often, and he uses feedback to refine and
        improve outcomes.
      </p>
      <p className="indent-8">
        Walker also shines as a communicator and mentor. When he teaches, he
        breaks down complex topics into digestible pieces and tailors his
        approach to the audience. Whether he is helping a junior engineer ramp
        up or aligning stakeholders on a tough decision, he does it with clarity
        and intent.
      </p>
      <p className="indent-8">
        Finally, he is a deep thinker. He asks the hard questions, challenges
        assumptions, and consistently thinks outside the box. He brings fresh
        ideas to the table, and his impact is often unmatched.
      </p>
      <p className="indent-8">
        If you are lucky enough to work with Walker, you will not only get a
        world-class engineer. You will get someone who pushes your product, your
        team, and your thinking to a whole new level.
      </p>
    </div>
  </TestimonialCard>
)

export default Testimonial
