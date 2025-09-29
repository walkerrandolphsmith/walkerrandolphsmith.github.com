import TestimonialCard from '@/components/TestimonialCard'

import AnanyaImage from '../../../public/ananya.webp'

const Testimonial = ({ offset = false }) => (
  <TestimonialCard
    offset={offset}
    name="Ananya Barthakur"
    level="Software Engineer"
    company="Microsoft"
    url="https://www.linkedin.com/in/ananya-barthakur1/"
    image={AnanyaImage}
  >
    <div className="flex flex-col gap-2">
      <p className="indent-8">
        Working with Walker on AI integration at Microsoft was one of the
        highlights of my time there. He’s incredibly talented technically, but
        what really stood out was how genuinely supportive and encouraging he
        was to work with.
      </p>

      <p className="indent-8">
        Walker has an amazing ability to break down complex problems and guide
        the team through solutions without ever making anyone feel overwhelmed.
        His code reviews taught me so much, and he always took the time to
        explain his thinking.
      </p>

      <p className="indent-8">
        He’s also incredibly organized with a sharp eye for catching things
        before they become major issues. His attention to detail and
        forward-thinking approach kept our entire team on track, even when we
        were dealing with multiple moving pieces and tight deadlines.
      </p>

      <p className="indent-8">
        Walker inspired me to be a better engineer, and any team lucky enough to
        work with him will feel the same way.
      </p>
    </div>
  </TestimonialCard>
)

export default Testimonial
