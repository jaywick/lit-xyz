import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
// @ts-ignore
import remarkPrism from 'remark-prism'
// @ts-ignore
import remarkSlug from 'remark-slug'
import rehypeRaw from 'rehype-raw'
import unified from 'unified'
import parseMarkdown from 'gray-matter'
import { rehypeLazyImages } from './plugins/rehype-lazy-images'
import { IArticle, IFrontmatter } from '../types'
import { File } from './util'
import { remarkVideo } from './plugins/remark-videos'
import { lint } from './plugins/remark-lint-preset-xyz'

export async function resolveArticle(file: File): Promise<IArticle | null> {
    const id = file.parent.name
    const markdown = await file.readContent()
    const { content, data } = parseMarkdown(markdown)
    const frontmatter = data as IFrontmatter

    await lint(file.path, markdown)

    const htmlContent = await transformMarkdown(content).catch((x) => {
        console.error(x)
        return null
    })

    if (htmlContent === null) {
        return null
    }

    const { title, date, tag, hero } = frontmatter

    const { slug = slugify(title), heroAlt = '' } = frontmatter

    return {
        title,
        date,
        tag,
        hero,

        id,
        author: 'Jay Wick',
        slug,
        heroAlt,

        originalMarkdown: content,
        readableDate: readableDate(date),
        readTime: readTime(content),
        htmlContent,
        heroStaticPath: `/blog/${id}/${hero}`,
        url: `/blog/${id}/${slug}`,
        related: [],
    }
}

async function transformMarkdown(text: string): Promise<string> {
    const processor = unified()
        .use(remarkParse)
        .use(remarkVideo)
        .use(remarkSlug)
        .use(remarkPrism)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeStringify, { allowDangerousHtml: true })
        .use(rehypeLazyImages)

    const result = await processor.process(text)
    return String(result)
}

const readableDate = (value: string) => {
    return Intl.DateTimeFormat('en-AU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(Date.parse(value))
}

const readTime = (content: string) => {
    const READ_SPEED = 250 // wpm
    const IMAGE_SPEED = 5 / 60 // 5s per image

    const words = content.match(/[\w-]+/g)?.length ?? 0
    const images = content.match(/\!\[.+?\]\(.+?\)/g)?.length ?? 0
    return Math.ceil(words / READ_SPEED + images * IMAGE_SPEED)
}

const slugify = (string: string) => {
    return string
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036F]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
}
