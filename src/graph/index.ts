import chalk from 'chalk'
import { IArticle, IGraph, ITag } from '../types'
import { resolveImage } from './image'
import { resolveArticle } from './markdown'
import { Directory, File, nil } from './util'
import { resolveAbout, resolveTags } from './yaml'

interface Args {
    docs: Directory
    tags: Directory
    about: File
    publics: Directory
}

export async function generateGraph({ docs, tags, about, publics }: Args) {
    const tagFile = new File(tags.path, 'tags.yml').ensureExists()

    const graph: IGraph = {
        about: await resolveAbout(about),
        tags: await resolveTags(tagFile),
        articles: [],
        images: [],
        public: [],
    }

    for await (const subdirectory of docs.subdirectories()) {
        if (subdirectory.path.startsWith('.')) continue

        for await (const file of subdirectory.files()) {
            if (file.isExtensionOneOf('.md', '.mdx')) {
                const article = await resolveArticle(file)

                if (article) {
                    graph.articles.push(article)
                }
            } else if (file.isExtensionOneOf('.jpg', '.jpeg', '.png', '.gif')) {
                const image = await resolveImage(file)
                graph.images.push(image)
            } else {
                report(file.path, 'Ignoring unknown file path')
            }
        }
    }

    const matchTags = tagMatcher(graph.tags)
    for await (const article of graph.articles) {
        article.author = article.author || graph.about.author
        article.resolvedTag = matchTags(article.tag)
    }

    for await (const article of graph.articles) {
        article.related = graph.articles.filter(bySameTagFilter(article))
    }

    for await (const file of publics.files()) {
        graph.public.push({ originalPath: file.path })
    }

    return graph
}

function report(path: string, message: string) {
    console.warn(
        chalk.cyan(path) +
            chalk.yellow(':') +
            ' - ' +
            chalk.red('warn ') +
            message
    )
}

const bySameTagFilter = (a: IArticle) => (b: IArticle) =>
    a.resolvedTag != null &&
    b.resolvedTag != null &&
    a.resolvedTag === b.resolvedTag &&
    a.id !== b.id

const tagMatcher =
    (tags: ITag[]) =>
    (tag: string | nil): ITag | null => {
        if (tag == null) return null
        if (tags.length === 0) return null

        const directMatch = tags.find((t) => t.key === tag)
        if (directMatch) return directMatch

        const aliasMatch = tags.find((t) => t.aliases.includes(tag))
        if (aliasMatch) return aliasMatch

        console.error(`Missing tag '${tag}' in tags`)
        return null
    }
