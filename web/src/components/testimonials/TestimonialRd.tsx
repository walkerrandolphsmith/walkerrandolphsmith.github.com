import TestimonialCard from '@/components/TestimonialCard'

import Image from '../../../public/rd.webp'

const TestimonialRd = ({ offset = false }) => (
  <TestimonialCard
    offset={offset}
    image={Image}
    name="Rupinder Dhariwal"
    level="Staff Engineer"
    company="Google"
    url="https://www.linkedin.com/in/rupinderdhariwal/"
  >
    <div className="flex flex-col gap-2">
      <p className="indent-8">
        Walker and I worked together at Smash.gg and VersionOne, he is the
        engineer you want on your team. I was impressed by his deep technical
        skills at VersionOne and saw him rise to the challenge when it came to
        taking ownership and develop his{' '}
        <span className="font-semibold text-[#0a2540] dark:text-white">
          leadership skill.
        </span>{' '}
        His affable nature makes him a great teammate and I would love to work
        with him again.
      </p>
    </div>
  </TestimonialCard>
)

export default TestimonialRd
