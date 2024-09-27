import Tag from '@/components/tag'
import PageTitle from '@/components/tag/PageTitle'
import { genPageMetadata } from 'app/[locale]/seo'
import tagData from 'app/[locale]/tag-data.json'
import { Metadata } from 'next'
import { createTranslation } from '../i18n/server'
import { LocaleTypes } from '../i18n/settings'

type TagsProps = {
  params: { locale: LocaleTypes }
}

export async function generateMetadata({ params: { locale } }: TagsProps): Promise<Metadata> {
  const { t } = await createTranslation(locale, 'SEO')
  return genPageMetadata({
    title: 'Tags',
    description: t('tags'),
    params: { locale: locale },
  })
}

export default function Page({ params: { locale } }: TagsProps) {
  const tagCounts = tagData[locale]
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <>
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <PageTitle />
        <div className="flex max-w-lg flex-wrap">
          {tagKeys.length === 0 && 'No tags found.'}
          {sortedTags.map((tag) => (
            <div key={tag} className="mb-2 mr-5 mt-2">
              <Tag text={tag} />
              <span className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300">
                {`(${tagCounts[tag]})`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
