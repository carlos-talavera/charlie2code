'use client'

import { useTranslation } from 'app/[locale]/i18n/client'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from './seriesCard'

export type PostSeriesProps = {
  data: any
}

const POSTS_AROUND_CURRENT = 2

export const PostSeriesBox = ({ data }: PostSeriesProps) => {
  const currentIndex = data.posts.findIndex((post: { isCurrent: any }) => post.isCurrent)
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')

  const startIndex = currentIndex - POSTS_AROUND_CURRENT > 0
    ? currentIndex - POSTS_AROUND_CURRENT
    : 0
  const endIndex = currentIndex + POSTS_AROUND_CURRENT < data.posts.length
    ? currentIndex + POSTS_AROUND_CURRENT + 1
    : data.posts.length + 1

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>
          {t('series')} {data.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {t('episodes')} ({currentIndex + 1}/{data.posts.length})
        <ul>
          {data.posts.slice(startIndex, endIndex).map((p: any) => (
            <li
              key={p.slug}
              className={`relative my-3 list-none pl-7 text-sm before:absolute before:left-1 before:top-[9px] before:h-1.5 before:w-1.5 before:rounded-full
              ${
                p.isCurrent
                  ? 'before:bg-accent-foreground/90 before:ring-[3px] before:ring-purple-400/20 before:ring-offset-1 before:ring-offset-black/10'
                  : 'hover:before:bg-accent-foreground/90 font-bold before:bg-primary-500/30 hover:before:ring-[3px] hover:before:ring-primary-500 hover:before:ring-offset-1 hover:before:ring-offset-black/10 dark:hover:before:ring-primary-500'
              }`}
            >
              {p.isCurrent ? (
                <span>{p.title}</span>
              ) : (
                <Link
                  className="transition-colors duration-200 ease-in-out hover:text-primary-500 dark:hover:text-primary-500"
                  href={`/${locale}/blog/${p.slug}`}
                >
                  {p.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
