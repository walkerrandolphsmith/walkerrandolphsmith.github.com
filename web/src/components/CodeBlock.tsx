'use client'

import {
  type ComponentPropsWithoutRef,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'
import { TbCheck, TbCopy } from 'react-icons/tb'

type CodeBlockProps = ComponentPropsWithoutRef<'pre'> & {
  'data-label'?: string
  'data-filename'?: string
}

function copyWithSelection(text: string) {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
}

function CopyButton({ target }: { target: RefObject<HTMLPreElement | null> }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const onCopy = async () => {
    // textContent holds only the code. Line numbers are CSS, not text.
    const text = target.current?.textContent ?? ''
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      copyWithSelection(text)
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <button
        type="button"
        onClick={onCopy}
        className="code-block__copy"
        data-copied={copied ? '' : undefined}
        data-test="copy-code"
      >
        {copied ? (
          <TbCheck aria-hidden="true" className="size-4" />
        ) : (
          <TbCopy aria-hidden="true" className="size-4" />
        )}
        <span>{copied ? 'Copied' : 'Copy'}</span>
        {!copied && <span className="sr-only"> code</span>}
      </button>
      <span role="status" className="sr-only">
        {copied ? 'Code copied to clipboard' : ''}
      </span>
    </>
  )
}

/**
 * Blog code block. rehypeCodeBlock highlights the code at build time and sets
 * the data attributes. This component adds the header and copy button.
 */
export default function CodeBlock({
  children,
  'data-label': label,
  'data-filename': filename,
  ...rest
}: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null)

  if (!label) {
    return <pre {...rest}>{children}</pre>
  }

  return (
    <figure className="code-block not-prose">
      <figcaption className="code-block__header">
        <span className="code-block__meta">
          {filename && <span className="code-block__filename">{filename}</span>}
          <span className="code-block__language">{label}</span>
        </span>
        <CopyButton target={preRef} />
      </figcaption>
      <pre ref={preRef} tabIndex={0} {...rest}>
        {children}
      </pre>
    </figure>
  )
}
