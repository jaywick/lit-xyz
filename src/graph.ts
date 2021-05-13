import { promises as fs } from 'fs'
import paths from 'path'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
// @ts-ignore
import remarkSlug from 'remark-slug'
import rehypeRaw from 'rehype-raw'
import unified from 'unified'
import parseMarkdown from 'gray-matter'

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

async function listDirectory(...pathParts: string[]): Promise<string[]> {
    const folder = paths.resolve(...pathParts)
    const children = await fs.readdir(folder)
    return children.map((name) => paths.resolve(folder, name))
}

export async function generateGraph() {
    const graph: { articles: IArticle[] } = { articles: [] }

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
            }

            // } else if (['.jpg', '.jpeg', '.png'].includes(extension)) {
            //     // parse images
            // }
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
        readTime: 0,
        readableDate: new Intl.DateTimeFormat('en-AU').format(new Date(date)),
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
        // .use(remarkPrism)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeStringify, { allowDangerousHtml: true })
    // .use(lazyImages)

    const result = await processor.process(text)
    return String(result)
}
