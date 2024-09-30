'use client'

import SocialIcon from '@/components/social-icons'
import { maintitle } from '@/data/localeMetadata'
import siteMetadata from '@/data/siteMetadata'
import Link from '../mdxcomponents/Link'

import { useTranslation } from 'app/[locale]/i18n/client'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useParams } from 'next/navigation'

export default function Footer() {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'footer')

  return (
    <>
      <footer>
        <div className="mt-16 flex flex-col items-center">
          <div className="mb-3 flex space-x-4">
            <div className="flex items-center">
              <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
            </div>
            <div className="flex items-center">
              <SocialIcon kind="github" href={siteMetadata.github} size={6} />
            </div>
            {/* <div className="flex items-center">
              <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
            </div> */}
            {/* <div className="flex items-center">
              <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
            </div> */}
            <div className="flex items-center">
              <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
            </div>
            {/* <div className="flex items-center">
              <SocialIcon kind="x" href={siteMetadata.x} size={6} />
            </div> */}
            {/* <div className="flex items-center">
              <SocialIcon kind="instagram" href={siteMetadata.instagram} size={6} />
            </div>
            <div className="flex items-center">
              <SocialIcon kind="threads" href={siteMetadata.threads} size={6} />
            </div> */}
          </div>
          <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <div>{siteMetadata.author}</div>
            <div>{` • `}</div>
            <div>{`© ${new Date().getFullYear()}`}</div>
            <div>{` • `}</div>
            <Link href="/">{maintitle[locale]}</Link>
          </div>
          <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Link
              href="https://github.com/carlos-talavera/charlie2code"
              target='_blank'
              rel="noopener noreferrer"
            >{t('viewsource')}</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
