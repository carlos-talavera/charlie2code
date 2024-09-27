'use client'

import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import siteMetadata from '@/data/siteMetadata'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import { motion } from 'framer-motion'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import LangSwitch from '../langswitch'
import Link from '../mdxcomponents/Link'
import ThemeSwitch from '../theme/ThemeSwitch'
import AuthorsMenu from './AuthorsMenu'
import MobileNav from './MobileNav'

const Header = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const pathname = usePathname()

  // State to track if the client-side has hydrated
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    // Set hydrated to true after the initial render
    setHydrated(true)
  }, [])

  // Render a placeholder or loading state while hydration is happening
  if (!hydrated) {
    return <header></header>
  }

  return (
    <header className="supports-backdrop-blur fixed left-0 right-0 top-0 z-40 w-full bg-white/75 backdrop-blur dark:bg-neutral-950/75">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-3 py-2 xl:max-w-5xl xl:px-0">
        <div>
          <Link href={`/${locale}/`} aria-label={siteMetadata.headerTitle}>
            <div className="flex items-center justify-between gap-2">
              <div className="animate-wave">
                <Logo className="w-16 fill-primary-500 dark:fill-primary-500" />
              </div>
              {typeof siteMetadata.headerTitle === 'string' ? (
                <div className="hidden h-6 text-2xl font-semibold text-primary-500 sm:block">
                  {siteMetadata.headerTitle}
                </div>
              ) : (
                siteMetadata.headerTitle
              )}
            </div>
          </Link>
        </div>
        <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
          {headerNavLinks
            .filter((link) => {
              return link.href !== '/'
            })
            .map((link) => {
              const isSelected = pathname!.includes(link.href as string)
              return (
                <Link
                  key={link.title}
                  href={`/${locale}${link.href}`}
                  className="flex transform-gpu items-center space-x-1 transition-transform duration-300"
                >
                  <div
                    className={`hidden font-medium ${
                      isSelected
                        ? 'text-white'
                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
                    } relative rounded-md px-2 py-1 font-medium transition-colors sm:block`}
                  >
                    <span className="relative z-10">{t(`${link.title.toLowerCase()}`)}</span>
                    {isSelected && (
                      <motion.span
                        layoutId="tab"
                        transition={{ type: 'spring', duration: 0.4 }}
                        className="absolute inset-0 z-0 rounded-md bg-primary-500"
                      ></motion.span>
                    )}
                  </div>
                </Link>
              )
            })}
          <AuthorsMenu className="hidden sm:block" />
          <ThemeSwitch />
          <LangSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
