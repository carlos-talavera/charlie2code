import Image from '@/components/mdxcomponents/Image'
import SocialIcon from '@/components/social-icons'
import type { Authors } from 'contentlayer/generated'
import { ReactNode } from 'react'

import { createTranslation } from 'app/[locale]/i18n/server'
import { LocaleTypes } from 'app/[locale]/i18n/settings'

interface AuthorLayoutProps {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
  params: { locale: LocaleTypes }
}

export default async function AuthorLayout({
  children,
  content,
  params: { locale },
}: AuthorLayoutProps) {
  const { name, avatar, occupation, company, twitter, linkedin, github } = content
  const { t } = await createTranslation(locale, 'about')

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-heading-400 dark:text-heading-400 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {t('about')}
          </h1>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center space-x-2 pt-8">
            {avatar && (
              <div className="relative h-48 w-48 overflow-hidden rounded-full">
                <Image
                  src={avatar}
                  alt="avatar"
                  title="avatar"
                  fill
                  className="object-cover object-center rounded-full"
                />
              </div>
            )}
            <h2 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{name}</h2>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
            </div>
          </div>
          <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}