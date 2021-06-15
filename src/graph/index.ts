import Listr from 'listr'
import { IContext } from '..'
import { log } from '../reporter'
import { IArticle, ITag } from '../types'
import { resolveImage } from './image'
import { resolveArticle } from './markdown'
import { File, nil } from './util'
import { resolveAbout, resolveTags } from './yaml'

export async function generateGraph(context: IContext) {
    const { tags, about } = context.filesystem

    const tagFile = new File(tags.path, 'tags.yml').ensureExists()

    context.graph = {
        about: await resolveAbout(about),
        tags: await resolveTags(tagFile),
        articles: [],
        images: [],
        public: [],
    }

    return new Listr(
        [
            { title: 'Process article folders', task: processArticleFolders },
            {
                title: 'Populate cross referenced data',
                task: crossReferenceArticles,
            },
            {
                title: 'Collect public files',
                task: collectPublicFiles,
            },
        ],
        {
            concurrent: false, // @ts-ignore
            collapse: false,
        }
    )
}

async function processArticleFolders(context: IContext) {
    const {
        filesystem: { docs },
        args: { skipLint },
        graph,
    } = context

    for await (const subdirectory of docs.subdirectories()) {
        if (subdirectory.path.startsWith('.')) continue

        for await (const file of subdirectory.files()) {
            if (file.isExtensionOneOf('.jpg', '.jpeg', '.png', '.gif')) {
                const image = await resolveImage(file)
                graph.images.push(image)
            }
        }

        for await (const file of subdirectory.files()) {
            if (file.isExtensionOneOf('.md', '.mdx')) {
                const article = await resolveArticle(
                    file,
                    skipLint,
                    graph.images
                )

                if (article) {
                    graph.articles.push(article)
                }
            } else if (file.isExtensionOneOf('.jpg', '.jpeg', '.png', '.gif')) {
                // already processed
            } else {
                log('WARN', {
                    message: 'Ignoring unknown file extension',
                    data: { extension: file.extension },
                    group: 'process-article-folders',
                    filepath: file.path,
                })
            }
        }
    }
}

async function crossReferenceArticles(context: IContext) {
    const { graph } = context

    const matchTags = tagMatcher(graph.tags)
    for await (const article of graph.articles) {
        article.author = article.author || graph.about.author
        article.resolvedTag = matchTags(article.tag, article.originalPath)
    }

    for await (const article of graph.articles) {
        article.related = graph.articles.filter(bySameTagFilter(article))
    }
}

async function collectPublicFiles(context: IContext) {
    const {
        filesystem: { publics },
        graph,
    } = context

    for await (const file of publics.files()) {
        graph.public.push({ originalPath: file.path })
    }
}

const bySameTagFilter = (a: IArticle) => (b: IArticle) =>
    a.resolvedTag != null &&
    b.resolvedTag != null &&
    a.resolvedTag === b.resolvedTag &&
    a.id !== b.id

const tagMatcher =
    (tags: ITag[]) =>
    (tag: string | nil, originalPath: string): ITag | null => {
        if (tag == null) return null
        if (tags.length === 0) return null

        const directMatch = tags.find((t) => t.key === tag)
        if (directMatch) return directMatch

        const aliasMatch = tags.find((t) => t.aliases.includes(tag))
        if (aliasMatch) return aliasMatch

        log('WARN', {
            message: 'Unknown tag could not be matched from tags list',
            data: { tag },
            group: 'cross-reference-articles',
            filepath: originalPath,
        })
        return null
    }
