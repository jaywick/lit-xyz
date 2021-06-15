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
// @ts-ignore
import remarkFootnotes from 'remark-footnotes'
import { rehypeLazyImages } from './plugins/rehype-lazy-images'
import { IArticle, IFrontmatter, IImage } from '../types'
import { File, requirer } from './util'
import { remarkVideo } from './plugins/remark-videos'
import { lint } from './plugins/remark-lint-preset-xyz'
import remarkStripMarkdown from 'strip-markdown'
import { log } from '../reporter'
import { remarkBanner } from './plugins/remark-banner'
import remarkAnnotate from './plugins/remark-annotate-plugin'
import { remarkAbbr } from './plugins/remark-abbr'
import { remarkImageCaption } from './plugins/remark-img-captions'
import remarkGfm from 'remark-gfm'

export async function resolveArticle(
    file: File,
    skipLint: boolean,
    images: IImage[]
): Promise<IArticle | null> {
    const id = file.parent.name
    const markdownWithFrontmatter = await file.readContent()
    const {
        data: frontmatter,
        content: markdownContent,
        excerpt: markdownExcerpt,
    } = parseMarkdown(markdownWithFrontmatter, { excerpt: true })

    if (!skipLint) {
        await lint(file.path, markdownWithFrontmatter)
    }

    const htmlContent = await transformMarkdown(
        markdownContent,
        file.path,
        images
    ).catch((err) => {
        log('ERROR', {
            message: err.message,
            filepath: file.path,
            data: err,
            group: 'transform-markdown-content',
        })
        return null
    })

    if (htmlContent === null) {
        return null
    }

    const htmlSnippet =
        (await transformMarkdown(
            markdownExcerpt || '',
            file.path,
            images
        ).catch((err) => {
            log('ERROR', {
                message: err.message,
                filepath: file.path,
                data: err,
                group: 'transform-markdown-excerpt',
            })
            return null
        })) || ''

    const slug = frontmatter.slug || slugify(frontmatter.title)

    const required = requirer(file.path)

    return {
        id,

        title: required(frontmatter.title, `title`),
        date: required(frontmatter.date, `date`),
        tag: required(frontmatter.tag, `tag`),
        hero: required(frontmatter.hero, `hero`),

        author: frontmatter.author || '',
        slug,
        heroAlt: frontmatter.heroAlt || '',

        originalMarkdown: markdownContent,
        originalPath: file.path,
        readableDate: readableDate(required(frontmatter.date, `date`)),
        readTime: readTime(markdownContent),
        htmlContent,
        htmlSnippet,
        heroStaticPath: `/blog/${id}/${frontmatter.hero}`,
        url: `/blog/${id}/${frontmatter.slug}`,
        excerpt: await plainText(markdownExcerpt || ''),

        related: [],
        resolvedTag: null,
    }
}

async function transformMarkdown(
    text: string,
    sourceFile: string,
    images: IImage[]
): Promise<string> {
    const processor = unified()
        .use(remarkParse)
        .use(remarkAnnotate)
        .use(remarkBanner, { sourceFile })
        .use(remarkAbbr, { sourceFile })
        .use(remarkVideo)
        .use(remarkImageCaption, { sourceFile })
        .use(remarkGfm)
        .use(remarkSlug)
        .use(remarkPrism)
        .use(remarkFootnotes, { inlineNotes: true })
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeStringify, { allowDangerousHtml: true })
        .use(rehypeLazyImages, { images })

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
