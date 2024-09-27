import AuthorLayout from '@/layouts/AuthorLayout'
import { createTranslation } from 'app/[locale]/i18n/server'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { genPageMetadata } from 'app/[locale]/seo'
import { Authors, allAuthors } from 'contentlayer/generated'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'

type AboutProps = {
  params: { authors: string[]; locale: LocaleTypes }
}

export async function generateMetadata({
  params: { locale },
}: AboutProps): Promise<Metadata | undefined> {
  const { t } = await createTranslation(locale, 'about')

  return genPageMetadata({
    title: `${t('about')}`,
    params: { locale: locale },
  })
}

export default async function Page({ params: { locale } }: AboutProps) {
  const author = allAuthors.find((a) => a.slug === 'default' && a.language === locale) as Authors
  if (!author) {
    return
  }
  const authorIndex = allAuthors.findIndex((a) => a.slug === 'default' && a.language === locale)
  if (authorIndex === -1) {
    return notFound()
  }
  const mainContent = coreContent(author)

  return (
    <AuthorLayout params={{ locale: locale }} content={mainContent}>
      <MDXLayoutRenderer code={author.body.code} />
    </AuthorLayout>
  )
}
