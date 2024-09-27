'use client'

import { useTranslation } from 'app/[locale]/i18n/client'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useParams } from 'next/navigation'
import React, { useRef, useState } from 'react'

const NewsletterForm = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'newsletter')
  const inputElFirstName = useRef<HTMLInputElement>(null)
  const inputElLastName = useRef<HTMLInputElement>(null)
  const inputElEmail = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [subscribed, setSubscribed] = useState<boolean>(false)

  const subscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const firstNameValue = inputElFirstName.current?.value
    const lastNameValue = inputElLastName.current?.value
    if (!firstNameValue || !lastNameValue) {
      setError(true)
      setMessage(t('messageError'))
      return
    }

    const emailValue = inputElEmail.current?.value
    if (!emailValue) {
      setError(true)
      setMessage(t('messageError'))
      return
    }

    const language = {
      en: 'English',
      es: 'Spanish',
    }

    const data = {
      email_address: emailValue,
      fields: {
        FirstName: firstNameValue,
        LastName: lastNameValue,
        Language: language[locale],
      }
    }

    const apiUrl = `/${locale}/api/newsletter`;

    const response = await fetch(apiUrl, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { error } = await response.json()

    if (error) {
      setError(true)
      setMessage(t('messageError'))
    } else {
      inputElFirstName.current!.value = ''
      inputElLastName.current!.value = ''
      inputElEmail.current!.value = ''
      setError(false)
      setSubscribed(true)
    }
  }

  return (
    <div>
      <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
        {t('title')}
      </div>
      <form className="flex flex-col justify-between space-y-4" onSubmit={subscribe}>
        <div className="my-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-col gap-2">
            <label htmlFor="first-name-input">
              <span className="sr-only">{t('firstName')}</span>
              <span>{t('firstName')}</span>
            </label>
            <input
              autoComplete="given-name"
              className="w-72 rounded-md border-gray-300 px-4 focus:border-primary-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-neutral-900 dark:bg-neutral-900"
              id="first-name-input"
              name="first-name"
              placeholder={`${subscribed ? t('placeholderSuccess') : t('placeholderDefaultFirstName')}`}
              ref={inputElFirstName}
              required
              type="text"
              disabled={subscribed}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="last-name-input">
              <span className="sr-only">{t('lastName')}</span>
              <span>{t('lastName')}</span>
            </label>
            <input
              autoComplete="family-name"
              className="w-72 rounded-md border-gray-300 px-4 focus:border-primary-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-neutral-900 dark:bg-neutral-900"
              id="last-name-input"
              name="last-name"
              placeholder={`${subscribed ? t('placeholderSuccess') : t('placeholderDefaultLastName')}`}
              ref={inputElLastName}
              required
              type="text"
              disabled={subscribed}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email-input">
              <span className="sr-only">{t('mail')}</span>
              <span>{t('mail')}</span>
            </label>
            <input
              autoComplete="email"
              className="w-72 rounded-md border-gray-300 px-4 focus:border-primary-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-neutral-900 dark:bg-neutral-900"
              id="email-input"
              name="email"
              placeholder={`${subscribed ? t('placeholderSuccess') : t('placeholderDefault')}`}
              ref={inputElEmail}
              required
              type="email"
              disabled={subscribed}
            />
          </div>
        </div>
        <div className="flex w-full justify-end rounded-md shadow-sm">
          <button
            className={`group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-primary-500 px-4 py-1.5 text-xs font-normal text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 dark:bg-primary-500 dark:hover:shadow-purple-500/30 ${subscribed ? 'cursor-default' : ''}`}
            type="submit"
            disabled={subscribed}
          >
            <span className="relative z-50 text-lg text-white">
              {subscribed ? t('buttonSuccess') : t('buttonDefault')}
            </span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-13deg)_translateX(100%)]">
              <div className="relative h-full w-8 bg-white/20" />
            </div>
          </button>
        </div>
      </form>
      {error && (
        <div className="w-72 pt-2 text-sm text-red-500 dark:text-red-400 sm:w-96">{message}</div>
      )}
    </div>
  )
}

export default NewsletterForm
