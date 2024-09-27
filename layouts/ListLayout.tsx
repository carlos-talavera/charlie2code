'use client'

import Link from '@/components/mdxcomponents/Link'
import { formUrlQuery } from '@/components/util/formUrlQuery'
import { sortByDate } from '@/components/util/sortByDate'
import { useTagStore } from '@/components/util/useTagStore'
import { POSTS_PER_PAGE } from '@/data/postsPerPage'
import { useTranslation } from 'app/[locale]/i18n/client'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import tagData from 'app/[locale]/tag-data.json'
import type { Blog } from 'contentlayer/generated'
import { motion } from 'framer-motion'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'
import { useEffect, useState } from 'react'
import Pagination from './Pagination'

interface PaginationProps {
  totalPages: number
  currentPage: number
  params: { locale: LocaleTypes }
}

interface ListLayoutProps {
  params: { locale: LocaleTypes }
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, x: -25, y: 0 },
  show: { opacity: 1, x: 0, y: 0 },
}

export default function ListLayoutWithTags({
  params: { locale },
  posts,
  title
}: ListLayoutProps) {
  const { t } = useTranslation(locale, 'home')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const postsPerPage = POSTS_PER_PAGE
  const sortedPosts = sortByDate(posts)
  const setSelectedTag = useTagStore((state) => state.setSelectedTag)

  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const filteredPosts = useTagStore((state) => {
    const filteredBySearch = sortedPosts.filter((post) => {
      const searchContent = post.title + post.summary + post.tags.join(' ')
      return searchContent.toLowerCase().includes(searchValue.toLowerCase())
    })

    if (state.selectedTag) {
      return filteredBySearch.filter((post) => post.tags.includes(state.selectedTag))
    } else {
      return filteredBySearch
    }
  })

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const displayPosts = filteredPosts.slice(startIndex, endIndex)

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === useTagStore.getState().selectedTag ? '' : tag)
    setCurrentPage(1)

    const newUrl = formUrlQuery({
      pathname,
      data: {
        tag,
      },
    })

    router.replace(newUrl)
  }

  const clearSelectedTag = () => {
    setSelectedTag('')
    setCurrentPage(1)

    router.replace(pathname)
  }

  useEffect(() => {
    if (searchParams.get('tag')) {
      if (!tagData[locale][searchParams.get('tag') as string]) {
        clearSelectedTag()

        return
      }

      handleTagClick(searchParams.get('tag') as string)
    }

    return () => {
      setSelectedTag('')
    }
  }, [])

  const tagCountMap = tagData[locale]

  const filteredTags = Object.keys(tagCountMap).map((postTag) => {
    return (
      <li key={postTag} className="my-3">
        <button
          onClick={() => handleTagClick(postTag)}
          aria-labelledby={`${t('poststagged')} ${postTag}`}
        >
          <h3
            className={`inline px-3 py-2 text-sm font-medium uppercase ${
              useTagStore.getState().selectedTag === postTag
                ? 'text-primary-500'
                : 'text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500'
            }`}
          >
            {' '}
            {postTag} ({tagCountMap[postTag]})
          </h3>
        </button>
      </li>
    )
  })

  return (
    <>
      <div>
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{t('description')}</p>
          <div className="relative max-w-lg">
            <label>
              <span className="sr-only">{t('search')}</span>
              <input
                aria-label={t('search')}
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={t('search')}
                className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-neutral-900 dark:bg-neutral-900"
              />
            </label>
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="flex sm:space-x-24">
          <div className="custom-scrollbar hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-neutral-900/70 dark:shadow-neutral-800/40 sm:flex">
            <div className="px-6 py-4">
              <button
                onClick={() => clearSelectedTag()}
                className={`${useTagStore.getState().selectedTag === '' ? 'text-heading-500 dark:text-heading-400' : 'text-gray-500 dark:text-gray-400'} font-bold uppercase`}
              >
                {t('all')}
              </button>
              <ul>{filteredTags}</ul>
            </div>
          </div>
          <div>
            <motion.ul variants={container} initial="hidden" animate="show">
              {!filteredPosts.length && <p className="mt-6">{t('noposts')}</p>}
              {displayPosts.map((post) => {
                const { slug, date, title, summary, tags, language } = post
                if (language === locale) {
                  return (
                    <motion.li variants={item} key={slug} className="py-5">
                      <article className="flex flex-col space-y-2 xl:space-y-0">
                        <dl>
                          <dt className="sr-only">{t('pub')}</dt>
                          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                            <time dateTime={date}>{formatDate(date, language)}</time>
                          </dd>
                        </dl>
                        <div className="space-y-3">
                          <div>
                            <div className="text-2xl font-bold leading-8 tracking-tight">
                              <Link
                                href={`/${locale}/blog/${slug}`}
                                className="text-gray-900 dark:text-gray-100"
                                aria-labelledby={title}
                              >
                                <h2>{title}</h2>
                              </Link>
                            </div>
                            <ul className="flex flex-wrap">
                              {tags.map((t) => (
                                <li key={t} className="my-3">
                                  <button
                                    onClick={() => handleTagClick(t)}
                                    className={`${
                                      useTagStore.getState().selectedTag === t
                                        ? 'text-heading-500 dark:text-heading-400'
                                        : 'text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500'
                                    } mr-3 text-sm font-medium uppercase`}
                                    aria-label={`View posts tagged ${t}`}
                                  >
                                    {`${t}`}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary!.length > 149 ? `${summary!.substring(0, 149)}...` : summary}
                          </div>
                        </div>
                      </article>
                    </motion.li>
                  )
                }
              })}
            </motion.ul>
            {totalPages > 1 && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={onPageChange}
                params={{ locale: locale }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
