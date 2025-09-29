import Link from 'next/link'

type CallToActionProps = {
  title: string
  href: string
  primary?: boolean
  dataTestId: string
  includeArrow?: boolean
  excludeLeftPadding?: boolean
  justify?: string
  color: string
  darkColor: string
  openExternally?: boolean
}
const CallToAction = (props: CallToActionProps) => {
  const justify = props.justify ?? 'justify-start'
  const borderedStyles = props.primary
    ? 'bg-white dark:bg-transparent px-2'
    : 'bg-transparent border-transparent px-0'

  return (
    <Link
      className={`group flex min-w-max ${justify} ${props.color} dark:${props.darkColor} ${borderedStyles} py-2 flex items-center cta font-medium text-base transition-opacity transition-colors inline-block w-[fit-content] border hover:opacity-70 rounded-2xl`}
      data-test={props.dataTestId}
      href={props.href}
      target={props.openExternally ? '_blank' : undefined}
      rel={props.openExternally ? 'noopener noreferrer' : ''}
    >
      <span className="text-lg">{props.title}</span>
      {props.includeArrow && (
        <svg
          className="arrow ml-1 relative inline fill-none stroke-2 top-px stroke-current mt-[-5px]"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          aria-hidden="true"
        >
          <g fillRule="evenodd">
            <path
              className="arrow-line transition-opacity ease-in-out opacity-0 group-hover:opacity-100"
              d="M0 5h7"
            ></path>
            <path
              className="arrow-tip transition-transform ease-in-out transform translate-x-0 group-hover:translate-x-[3px]"
              d="M1 1l4 4-4 4"
            ></path>
          </g>
        </svg>
      )}
    </Link>
  )
}

export default CallToAction
