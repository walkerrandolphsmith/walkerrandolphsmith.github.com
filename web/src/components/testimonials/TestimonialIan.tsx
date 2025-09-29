import TestimonialCard from '@/components/TestimonialCard'

import Image from '../../../public/ian.webp'

const Testimonial = ({ offset = false }) => (
  <TestimonialCard
    offset={offset}
    name="Ian Culling"
    level="CTO"
    company="Digital.ai"
    url="https://www.linkedin.com/in/ian-culling/"
    image={Image}
  >
    <div className="flex flex-col gap-2">
      <p className="indent-8">
        Walker has always been a force-multiplying addition to any team;
        he&apos;s passionate about software development as a craft, with a
        continuous improvement (growth) mindset – and broadcasts a high-energy
        creative vibe that&apos;s super infectious.
      </p>
      <p className="indent-8">
        Aside from epic architecture, design & coding talent, Walker&apos;s a
        natural,{' '}
        <span className="font-semibold text-[#0a2540] dark:text-white">
          persuasive leader
        </span>
        , and an excellent coach and driver of the adoption of new technology
        and practices.
      </p>
      <p className="indent-8">
        And importantly, he gets a ton of sh** done, while continuously seeking
        better ways to get far better sh** done, in better time.
      </p>
      <p className="indent-8">
        I am so grateful for the years we worked together – I feel that we
        learned a great deal from each other.
      </p>
    </div>
  </TestimonialCard>
)

export default Testimonial
