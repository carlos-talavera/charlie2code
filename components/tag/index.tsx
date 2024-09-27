'use client'

import { fallbackLng } from 'app/[locale]/i18n/locales'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  const locale = useParams()?.locale as LocaleTypes

  // Preserve search params (the middleware removes the locale when it is the default one and doesn't keep the search params)
  let subpath = locale === fallbackLng ? '' : `/${locale}`

  return (
    <Link href={`${subpath}/blog?tag=${text}`}>
      <span
        className="mr-3 cursor-pointer text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
      >
        {text.split(' ').join('-')}
      </span>
    </Link>
  )
}

export default Tag
