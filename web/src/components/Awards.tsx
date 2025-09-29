import ExportedImage from 'next-image-export-optimizer'

import SectionHeader from '@/components/SectionHeader'

import AwardAzureImage from '../../public/award-azure.webp'
import AwardScrumImage from '../../public/award-csm.webp'
import AwardCSUImage from '../../public/award-csu.webp'
import AwardBSAImage from '../../public/award-eagle-scout.webp'

const Awards = () => (
  <div className="grid gap-y-8">
    <header className="px-8 grid gap-y-4 lg:w-[var(--layoutWidth)] !mx-auto !py-0 !px-8 Section__layoutContainer">
      <SectionHeader title="Awards and Certs" isLight></SectionHeader>
    </header>
    <div className="ml-0 2xl:ml-64 overflow-hidden grid sm:grid-cols-2 lg:flex py-16 gap-4 m-0 relative px-2">
      <article className="order-6 lg:order-1 cd group relative pl-4 lg:p-6 rounded-[16px] bg-[white] dark:bg-[rgba(39,39,42,1)] transition duration-200 m-0 clear-both w-full lg:min-w-[300px] lg:w-[300px] lg:h-[250px] grid grid-cols-2 items-center lg:items-start">
        <span className="justify-self-start dark:text-white">Eagle Scout</span>
        <span className="justify-self-end lg:absolute bottom-1 right-1 lg:right-16 pr-6 py-6 flex justify-center items-center">
          <ExportedImage
            alt="Eagle Scout logo"
            width={130}
            src={AwardBSAImage}
            placeholder="blur"
            loading="lazy"
            className="grayscale group-hover:grayscale-0 w-[80px] lg:w-[130px]"
          />
        </span>
      </article>
      <a
        href="https://www.columbusstate.edu/academic-affairs/_docs/scholastic-honors-convocation/2024-SHC-program.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="order-5 lg:order-2 cd group relative pl-4 lg:p-6 rounded-[16px] bg-[white] dark:bg-[rgba(39,39,42,1)] flex flex-col transition duration-200 m-0 clear-both w-full lg:min-w-[300px] lg:w-[300px] lg:h-[250px]"
      >
        <article className="grid grid-cols-2 items-center lg:items-start">
          <span className="justify-self-start dark:text-white">
            B.S. Computer Science
          </span>
          <span className="justify-self-end lg:absolute bottom-0 right-0 pr-4 py-6 flex justify-center items-center">
            <ExportedImage
              alt="machine learning track award"
              width={150}
              src={AwardCSUImage}
              placeholder="blur"
              loading="lazy"
              className="grayscale group-hover:grayscale-0 w-[100px] lg:w-[150px]"
            />
          </span>
        </article>
      </a>
      <a
        href="https://badgecert.com/bc/html/groupbadges.html?k=S2w2bCt6T3NBR1NRdFp6QWdjbkNNRGs0cTkybW0yb2Q"
        target="_blank"
        rel="noopener noreferrer"
        className="order-4 lg:order-3 cd group relative pl-4 lg:p-6 rounded-[16px] bg-[white] dark:bg-[rgba(39,39,42,1)] flex flex-col transition duration-200 m-0 clear-both w-full lg:min-w-[300px] lg:w-[300px] lg:h-[250px]"
      >
        <article className="grid grid-cols-2 items-center lg:items-start">
          <span className="justify-self-start dark:text-white">
            Certified Scrum Master
          </span>
          <span className="justify-self-end lg:absolute bottom-2 right-2 pr-4 py-6 flex justify-center items-center">
            <ExportedImage
              alt="scrum alliance CSM certification logo"
              width={150}
              src={AwardScrumImage}
              placeholder="blur"
              loading="lazy"
              className="grayscale group-hover:grayscale-0 w-[100px] lg:w-[150px]"
            />
          </span>
        </article>
      </a>
      <a
        href="https://learn.microsoft.com/en-us/users/walkersmith-8547/credentials/ac74fe40dc6b01d5"
        target="_blank"
        rel="noopener noreferrer"
        className="order-3 lg:order-4 cd group relative pl-4 lg:p-6 rounded-[16px] bg-[white] dark:bg-[rgba(39,39,42,1)] flex flex-col transition duration-200 m-0 clear-both w-full lg:min-w-[300px] lg:w-[300px] lg:h-[250px]"
      >
        <article className="grid grid-cols-2 items-center lg:items-start">
          <span className="justify-self-start dark:text-white">
            Microsoft Certified: Azure Fundamentals
          </span>
          <span className="justify-self-end lg:absolute bottom-1 right-1 pr-4 py-6 flex justify-center items-center">
            <ExportedImage
              alt="Azure fundamentals certification logo"
              width={150}
              src={AwardAzureImage}
              placeholder="blur"
              loading="lazy"
              className="grayscale group-hover:grayscale-0 w-[100px] lg:w-[150px]"
            />
          </span>
        </article>
      </a>
      <a
        href="https://www.columbusstate.edu/academic-affairs/_docs/scholastic-honors-convocation/2024-SHC-program.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="order-2 lg:order-5 cd group relative pl-4 lg:p-6 rounded-[16px] bg-[white] dark:bg-[rgba(39,39,42,1)] flex flex-col transition duration-200 m-0 clear-both w-full lg:min-w-[300px] lg:w-[300px] lg:h-[250px]"
      >
        <article className="grid grid-cols-2 items-center lg:items-start">
          <span className="justify-self-start dark:text-white">
            M.S. in Applied Computer Science: A.I.& Machine Learning Track Award
          </span>
          <span className="justify-self-end lg:absolute bottom-0 right-0 pr-4 py-6 flex justify-center items-center">
            <ExportedImage
              alt="machine learning track award"
              width={150}
              src={AwardCSUImage}
              placeholder="blur"
              loading="lazy"
              className="grayscale group-hover:grayscale-0 w-[100px] lg:w-[150px]"
            />
          </span>
        </article>
      </a>
      <a
        href="https://learn.microsoft.com/en-us/users/walkersmith-8547/credentials/a464ca1225d08b51"
        target="_blank"
        rel="noopener noreferrer"
        className="order-1 lg:order-6 cd group relative pl-4 lg:p-6 rounded-[16px] bg-[white] dark:bg-[rgba(39,39,42,1)] flex flex-col transition duration-200 m-0 clear-both w-full lg:min-w-[300px] lg:w-[300px] lg:h-[250px]"
      >
        <article className="grid grid-cols-2 items-center lg:items-start">
          <span className="justify-self-start dark:text-white">
            Microsoft Certified: Azure AI Fundamentals
          </span>
          <span className="justify-self-end lg:absolute bottom-1 right-1 pr-4 py-6 flex justify-center items-center">
            <ExportedImage
              alt="Azure fundamentals certification logo"
              width={150}
              src={AwardAzureImage}
              placeholder="blur"
              loading="lazy"
              className="grayscale group-hover:grayscale-0 w-[100px] lg:w-[150px]"
            />
          </span>
        </article>
      </a>
    </div>
  </div>
)

export default Awards
