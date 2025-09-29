import ExportedImage from 'next-image-export-optimizer'

import FamilyImage from '../../public/family.webp'

const About = () => (
  <div className="grid gap-y-8">
    <header className="px-8 grid gap-y-4">
      <h1 className="max-w-[74%] text-[36px] leading-[44px] font-medium font-[var(--font-roboto)] sm:text-[48px] sm:leading-[56px] relative text-zinc-950 tracking-[-0.05em] bg-[linear-gradient(to_bottom,_var(--sectionBackgroundColor)_75%,_transparent_100%)] pointer-events-none">
        Beyond the engineer
      </h1>
      <p className="text-[18px] font-normal leading-[1.555556] tracking-[0.2px] text-[#adbdcc] bg-[linear-gradient(to_bottom,_var(--sectionBackgroundColor)_75%,_transparent_100%)] pointer-events-none pb-12">
        While I&apos;m not honing my craft and thinking about business strategy,
        I am with my family, enjoying a hobby and time.
      </p>
    </header>
    <section className="w-full flex justify-center">
      <ExportedImage
        src={FamilyImage}
        alt="picture of me and my family"
        loading="lazy"
        placeholder="blur"
        width={700}
      />
    </section>
  </div>
)

export default About
