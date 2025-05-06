import type { MDXComponents } from 'mdx/types'
import Pre from 'pliny/ui/Pre'
import TOCInline from '../TOCInline'
import Audioplayer from './Audioplayer'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import WebsiteEmbed from './WebsiteEmbed'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  Audioplayer,
  WebsiteEmbed,
}
