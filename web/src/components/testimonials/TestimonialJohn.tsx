import TestimonialCard from '@/components/TestimonialCard'

import Image from '../../../public/John.webp'

const Testimonial = ({ offset = false }) => (
  <TestimonialCard
    offset={offset}
    name="John O'Sullivan"
    level="Senior Software Engineer"
    company="Microsoft"
    url="https://www.linkedin.com/in/john-o-sullivan-37848814/"
    image={Image}
  >
    <div className="flex flex-col gap-2">
      <p className="indent-8">
        Walker&apos;s engineering expertise is defined by a meticulous and
        strategic approach that drives high-impact results. He excels not only
        as a skilled coder but also as a visionary system architect,{' '}
        <span className="font-semibold text-[#0a2540] dark:text-white">
          cross-functional leader
        </span>
        , and infrastructure builder who propels teams forward. What&apos;s even
        more remarkable is his ability to elevate those around him, fostering a
        culture of quality and continuous improvement through patient guidance,
        mentorship, and knowledge sharing. Collaborating with Walker is a
        transformative experience, offering opportunities for growth, learning,
        and collective progress. He consistently raises the bar for his peers,
        and his presence is a valuable asset to any team.
      </p>
      <p className="indent-8">
        Beyond his technical prowess, Walker is an exceptional team player -
        articulate, driven, intelligent, and inclusive. His presence would be a
        significant win for any organization. If you have the chance to bring
        him on board, don&apos;t hesitate - he&apos;s a game-changer who
        delivers outstanding results and leaves a lasting impact on the teams he
        works with.
      </p>
    </div>
  </TestimonialCard>
)

export default Testimonial
