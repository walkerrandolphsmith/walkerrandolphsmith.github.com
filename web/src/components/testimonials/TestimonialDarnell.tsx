import TestimonialCard from '@/components/TestimonialCard'

import DarnellImage from '../../../public/darnell.webp'

const Testimonial = ({ offset = false }) => (
  <TestimonialCard
    offset={offset}
    name="Darnell Brown"
    level="Engineering Manager"
    company="Microsoft"
    url="https://www.linkedin.com/in/darnell-brown-51825916/"
    image={DarnellImage}
  >
    <div className="flex flex-col gap-2">
      <p className="indent-8">
        Walker is a fantastic and well-spoken person first and foremost.
        Let&apos;s just start there. He was one of the first engineers that I
        had the opportunity to directly mentor during my early years at
        Microsoft.
      </p>

      <p className="indent-8">
        He was the core contributor of one of the first major projects that I
        helped to lead as an IC, before I stepped back into management. I often
        find many engineers tend to sort of follow &quot;what everyone else is
        doing&quot; or just sort of fit into the puzzle or general flow of
        &quot;what has been done in the past&quot;, and Walker Smith is the
        antithesis of that.
      </p>

      <p className="indent-8">
        He is the engineer who literally thinks outside the box, but also is one
        who points out the most simple and obvious solution to any complex
        problem. He is methodically one of the most sound and thorough engineers
        that I have worked with and{' '}
        <span className="font-semibold text-[#0a2540] dark:text-white">
          he leads by example
        </span>
        . He embodies extreme ownership and helps to level up anyone else around
        him who would dare to think otherwise.
      </p>

      <p className="indent-8">
        He owns up to the challenge, and accepts blame when it&apos;s someone
        else&apos;s code that breaks. He is a chief documenter, one who ensures
        an application or system is left in a better state than it was, and
        ensures it is understood with a high aptitude for ensuring easy
        consumption and reliability of code, all the way down to the variable
        naming convention.
      </p>

      <p className="indent-8">
        His engineering precision is unmatched, but again going back to my
        beginning statement, when you hire Walker, you&apos;ll quickly realize
        that he&apos;s the &quot;person&quot;, not just the engineer that you
        want on your team.
      </p>
    </div>
  </TestimonialCard>
)

export default Testimonial
