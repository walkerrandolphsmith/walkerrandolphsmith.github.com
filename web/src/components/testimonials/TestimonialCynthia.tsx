import TestimonialCard from '@/components/TestimonialCard'

import CynthiaImage from '../../../public/cynthia.webp'

const Testimonial = ({ offset = false }) => (
  <TestimonialCard
    offset={offset}
    name="Cynthia Mora Olmedo"
    level="Software Engineer"
    company="Microsoft"
    url="https://www.linkedin.com/in/cynthia-moraolmedo/"
    image={CynthiaImage}
  >
    <div className="flex flex-col gap-2">
      <p className="indent-8">
        Walker is one of the senior engineers I look up to and aspire to be.
        Walker demonstrates strength in 1. Deeply Caring about the Customer
        experience, 2. Constantly evolving and improving the engineering
        experience and best practices, 3. Fostering a culture of growth and
        learning within every team and project he is a part of. 4. Engineering
        Excellence overall
      </p>
      <p className="indent-8">
        I worked with Walker for a few months as a junior engineer. I think I
        did a whole lot of learning during our time working together, and it was
        directly tied to Walker&apos;s influence on me as a fellow engineer, and
        his influence over the team.
      </p>
      <p className="indent-8">
        My team was in the middle of transitioning our service into a more
        modern tech stack — where most of the concepts were new to me
        personally, as well as a new space for the team. Walker shared his
        knowledge of web development fundamentals, best practices on how to
        implement telemetry and other aspects of our service more efficiently,
        and he took the time to mentor me through basics of React, JavaScript,
        using Webpack and improving performance of our rendering, as well as
        improving accessibility and also test coverage with tools like
        Lighthouse, Cypress, among others. He also demonstrated impact in our
        team very well, and very quickly. He always focuses on doing things well
        and right for the customer — and I genuinely hope I get to work with
        Walker again in another project — he is an asset to the Software
        Engineering space, and in any new role he takes on.
      </p>
    </div>
  </TestimonialCard>
)

export default Testimonial
