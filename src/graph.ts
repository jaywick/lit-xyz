import { promises as fs } from 'fs'
import paths from 'path'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
// @ts-ignore
import remarkPrism from 'remark-prism'
// @ts-ignore
import remarkSlug from 'remark-slug'
import rehypeRaw from 'rehype-raw'
import unified from 'unified'
import Jimp from 'jimp'
import parseMarkdown from 'gray-matter'
import { lazyImages } from './lazy-images-plugin'

export type IGraph = { articles: IArticle[]; images: IImage[] }

export type IRelatedArticle = Omit<IArticle, 'related'>

export interface IArticle extends IFrontmatter {
    readTime: number
    readableDate: string
    htmlContent: string
    heroStaticPath: string
    originalMarkdown: string
    url: string
    related: IRelatedArticle[]
}

export interface IFrontmatter {
    id: string
    title: string
    author: string
    date: string
    hero: string
    tag: string
    slug: string
    heroAlt: string
}

export interface IImage {
    originalPath: string
    relativePath: string
    width: number
    height: number
}

async function listDirectory(...pathParts: string[]): Promise<string[]> {
    const folder = paths.resolve(...pathParts)
    const children = await fs.readdir(folder)
    return children.map((name) => paths.resolve(folder, name))
}

export async function generateGraph() {
    const graph: IGraph = {
        articles: [],
        images: [],
    }

    const folders = await listDirectory(__dirname, 'mock-data/docs/blog')
    for await (const folder of folders) {
        const files = await listDirectory(folder)

        for await (const file of files) {
            const extension = paths.extname(file)

            if (['.md', '.mdx'].includes(extension)) {
                const article = await resolveArticle(file)

                if (article) {
                    graph.articles.push(article)
                }
            } else if (['.jpg', '.jpeg', '.png'].includes(extension)) {
                new Jimp(file, function (_, image) {
                    const name = paths.basename(file)
                    const id = paths.basename(paths.dirname(file))
                    graph.images.push({
                        originalPath: file,
                        width: image.bitmap.height,
                        height: image.bitmap.height,
                        relativePath: `blog/${id}/${name}`,
                    })
                })
            }
        }
    }

    return graph
}

async function resolveArticle(path: string): Promise<IArticle | null> {
    const id = paths.basename(paths.dirname(path))
    const markdown = String(await fs.readFile(path))
    const { content, data } = parseMarkdown(markdown)
    const frontmatter = data as IFrontmatter

    const htmlContent = await transformMarkdown(content).catch((x) => {
        console.error(x)
        return null
    })

    if (htmlContent === null) {
        return null
    }

    const { title, date, slug, heroAlt, tag, hero } = frontmatter

    return {
        title,
        date,
        slug,
        heroAlt,
        tag,
        hero,

        id,
        author: 'Jay Wick',

        originalMarkdown: content,
        readableDate: readableDate(frontmatter.date),
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
        .use(remarkSlug)
        .use(remarkPrism)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeStringify, { allowDangerousHtml: true })
        .use(lazyImages)

    const result = await processor.process(text)
    return String(result)
}

const readableDate = (value: string) => {
    return new Date(Date.parse(value)).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

const readTime = (content: string) => {
    const READ_SPEED = 250 // wpm
    const IMAGE_SPEED = 5 / 60 // 5s per image

    const words = content.match(/[\w-]+/g)?.length ?? 0
    const images = content.match(/\!\[.+?\]\(.+?\)/g)?.length ?? 0
    return Math.ceil(words / READ_SPEED + images * IMAGE_SPEED)
}
