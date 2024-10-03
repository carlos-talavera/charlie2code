import 'css/tailwind.css'
import 'pliny/search/algolia.css'

import TwSizeIndicator from '@/components/helper/TwSizeIndicator'
import Footer from '@/components/navigation/Footer'
import Header from '@/components/navigation/Header'
import SectionContainer from '@/components/SectionContainer'
import { maindescription, maintitle } from '@/data/localeMetadata'
import siteMetadata from '@/data/siteMetadata'
import { dir } from 'i18next'
import { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Space_Grotesk } from 'next/font/google'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { LocaleTypes, locales } from './i18n/settings'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export async function generateMetadata({ params: { locale } }): Promise<Metadata> {
  return {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: {
      default: maintitle[locale],
      template: `%s | ${maintitle[locale]}`,
    },
    description: maindescription[locale],
    openGraph: {
      title: maintitle[locale],
      description: maindescription[locale],
      url: './',
      siteName: maintitle[locale],
      images: [siteMetadata.socialBanner],
      locale: locale,
      type: 'website',
    },
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    twitter: {
      title: maintitle[locale],
      description: maindescription[locale],
      site: siteMetadata.siteUrl,
      creator: siteMetadata.author,
      card: 'summary_large_image',
      images: [siteMetadata.socialBanner],
    },
    icons: {
      icon: siteMetadata.siteLogo,
      shortcut: siteMetadata.siteLogo,
      apple: siteMetadata.siteLogo,
      other: {
        rel: siteMetadata.siteLogo,
        url: siteMetadata.siteLogo,
      },
    },
  }
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: LocaleTypes }
}) {
  return (
    <html
      lang={locale}
      dir={dir(locale)}
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/logo.svg" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/logo.svg" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-neutral-950 dark:text-white relative custom-scrollbar scrollbar-thick">
        <ThemeProvider attribute="class" enableSystem={false}>
          <TwSizeIndicator />
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          <SectionContainer>
            <div className="flex h-screen flex-col justify-between font-sans relative">
              <Header />
              <main className="mb-auto mt-24">{children}</main>
              <Footer />
            </div>
          </SectionContainer>
        </ThemeProvider>
      </body>
    </html>
  )
}
