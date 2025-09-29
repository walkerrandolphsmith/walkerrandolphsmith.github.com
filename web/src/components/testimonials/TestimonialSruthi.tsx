import TestimonialCard from '@/components/TestimonialCard'

import SruthiImage from '../../../public/sruthi.webp'

const Testimonial = ({ offset = false }) => (
  <TestimonialCard
    offset={offset}
    name="Sruthi Yalamanchili"
    level="Senior Software Engineer"
    company="Microsoft"
    url="https://www.linkedin.com/in/sruthi-yalamanchili-03801786/"
    image={SruthiImage}
  >
    <div className="flex flex-col gap-2">
      <p className="indent-8">
        I had the pleasure of working with Walker Smith during my time at
        Microsoft, where we collaborated for approximately five years. In a
        word, Walker is a visionary technical leader. He embodies the ideal
        combination of deep technical expertise, strong communication skills,
        and{' '}
        <span className="font-semibold text-[#0a2540] dark:text-white">
          outstanding leadership qualities.
        </span>
      </p>

      <p className="indent-8">
        His attention to detail consistently impressed me—there were many
        instances where I found myself wondering how he managed to execute so
        flawlessly. Walker has the rare ability to independently drive a project
        from inception to completion with exceptional precision. I often found
        myself in awe while reviewing his pull requests, which showcased not
        only technical excellence but also an extraordinary level of customer
        empathy and craftsmanship.
      </p>

      <p className="indent-8">
        Walker is a true leader in every sense. He has a natural ability to
        align the team toward a common goal, inspiring and guiding others with
        clarity and purpose. He fosters a collaborative environment by being
        genuinely open to ideas from across the team and consistently makes an
        effort to understand and incorporate diverse perspectives. He is a great
        team player!
      </p>

      <p className="indent-8">
        Any team would be fortunate to have Walker as a member. I have no doubt
        he will go on to achieve great things and leave a lasting mark on the
        software industry. What makes him truly exceptional is that he brings
        others along on the journey—uplifting the team as he drives toward
        success.
      </p>
    </div>
  </TestimonialCard>
)

export default Testimonial
