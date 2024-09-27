'use client'

import siteMetadata from '@/data/siteMetadata'
import { init } from '@waline/client'
import '@waline/client/style'
import { useTranslation } from 'app/[locale]/i18n/client'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

export default function WalineComments() {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'home')

  useEffect(() => {
    let element: HTMLDivElement | null

    element = document.getElementById('waline') as HTMLDivElement
    init({
      el: '#waline',
      lang: locale,
      reaction: true,
      serverURL: siteMetadata.walineServer,
      emoji: [
        'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/weibo',
        'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/alus',
      ],
      requiredMeta: ['nick'],
    })

    return () => {}
  }, [locale])

  return (
    <div className="mb-6 mt-6" id="waline" />
  )
}
