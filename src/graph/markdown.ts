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
import { File, required } from './util'
import { remarkVideo } from './plugins/remark-videos'
import { lint } from './plugins/remark-lint-preset-xyz'
import remarkStripMarkdown from 'strip-markdown'

export async function resolveArticle(file: File): Promise<IArticle | null> {
    const id = file.parent.name
    const markdownWithFrontmatter = await file.readContent()
    const parsed = parseMarkdown(markdownWithFrontmatter)

    const frontmatter = parsed.data as IFrontmatter

    const markdown = parsed.content
    const excerptInMarkdown = parsed.excerpt!

    await lint(file.path, markdownWithFrontmatter)

    const htmlContent = await transformMarkdown(markdown).catch((x) => {
        console.error(x)
        return null
    })

    if (htmlContent === null) {
        return null
    }

    const slug = frontmatter.slug || slugify(frontmatter.title)

    return {
        id,

        title: required(
            frontmatter.title,
            `Missing 'title' in tag Article #${id}`
        ),
        date: required(
            frontmatter.date,
            `Missing 'date' in tag Article #${id}`
        ),
        tag: required(frontmatter.tag, `Missing 'tag' in tag Article #${id}`),
        hero: required(
            frontmatter.hero,
            `Missing 'hero' in tag Article #${id}`
        ),

        author: frontmatter.author || '',
        slug,
        heroAlt: frontmatter.heroAlt || '',

        originalMarkdown: markdown,
        readableDate: readableDate(
            required(frontmatter.date, `Missing 'date' in tag Article #${id}`)
        ),
        readTime: readTime(markdown),
        htmlContent,
        heroStaticPath: `/blog/${id}/${frontmatter.hero}`,
        url: `/blog/${id}/${frontmatter.slug}`,
        excerpt: await plainText(excerptInMarkdown),

        related: [],
        resolvedTag: null,
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

async function plainText(text: string): Promise<string> {
    const processor = unified()
        .use(remarkParse)
        .use(remarkStripMarkdown)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeStringify, { allowDangerousHtml: true })

    const result = await processor.process(text)
    return String(result)
}

const readableDate = (value: string) => {
    try {
        return Intl.DateTimeFormat('en-AU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(Date.parse(value))
    } catch {
        throw new Error(
            `Invalid date. Could not parse: ${JSON.stringify(value)}`
        )
    }
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
