import TestimonialCard from '@/components/TestimonialCard'

const Testimonial = ({ offset = false }) => (
  <TestimonialCard
    offset={offset}
    name="Dave Swift"
    level="Senior Software Engineer"
    company="Microsoft"
    url="https://www.linkedin.com/in/dave-swift-409b992/"
  >
    <div className="flex flex-col gap-2">
      <p className="indent-8">
        I highly recommend Walker for any software engineering positions. He
        knows how to code in multiple platforms and cranks out new code very
        quickly. He is very adept at backend systems but also is detail
        orientated and talented to take on front end work. More importantly, he
        knows when to not code and ask key design, usability, and situational
        questions. These questions lead to better and more usable end products.
        Additionally, Walker is a tremendous team player who works well with
        other experienced engineers and can smoothly onboard new/junior
        engineers. Finally, Walker stepped in as our security/vulnerability{' '}
        <span className="font-semibold text-[#0a2540] dark:text-white">
          leader
        </span>{' '}
        and as such, he quickly ramped up on evolving guidance and drove
        integration of the work into quarterly plans and completion as part of
        regular sprint work. I would happily work with Walker again.
      </p>
    </div>
  </TestimonialCard>
)

export default Testimonial
