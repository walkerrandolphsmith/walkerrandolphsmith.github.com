'use client'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import {
  contactUsSubmissionFailed,
  contactUsSubmissionPending,
  contactUsSubmissionSuccessful,
} from '@/constants'

type ContactFormProps = {
  initialSubmissionMessage: string
}

interface MyCustomEventTarget extends EventTarget {
  email: {
    value: string
  }
}

interface MyCustomFormEvent<T> extends FormEvent<T> {
  target: T & MyCustomEventTarget
}

const ContactForm = (props: ContactFormProps) => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(props.initialSubmissionMessage)
  const [isJavaScriptDisabled, setIsJavaScriptDisabled] = useState(true)
  useEffect(() => {
    setIsJavaScriptDisabled(false)
  }, [])
  const disabled = !isJavaScriptDisabled && email === ''

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value)

  const onSubmit = (event: MyCustomFormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage(contactUsSubmissionPending)
    const data = {
      email: event.target.email.value,
      isJavaScriptEnabled: true,
    }
    const JSONdata = JSON.stringify(data)
    fetch('/api/handleContactFormSubmission?type=application/json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    })
      .then(response => response.json())
      .then(() => setMessage(contactUsSubmissionSuccessful))
      .catch(() => setMessage(contactUsSubmissionFailed))
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <form
        className="rounded-3xl p-2 border-blue-1000 border bg-white"
        action="/api/handleContactFormSubmission"
        method="post"
        onSubmit={onSubmit}
      >
        <div className="flex">
          <input
            onChange={onEmailChange}
            required
            type="email"
            id="email"
            name="email"
            className="w-32 xs:w-44 sm:w-96 px-4 py-2 bg-transparent rounded-3xl outline-0 focus:outline-none hover:outline-none text"
            placeholder="Email Address"
          />
          <button
            data-test="submit-contact-form"
            type="submit"
            disabled={disabled}
            className="min-w-max px-4 py-2 bg-[red] text-white rounded-3xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Conect me
          </button>
        </div>
      </form>
      <div className="p-2 text-zinc-800 w-full mx-auto flex justify-center animate-reveal">
        <p
          id="contact-us-submission-message"
          className="text-center"
          style={{ minHeight: '24px' }}
        >
          {message}
        </p>
      </div>
    </div>
  )
}

export default ContactForm
