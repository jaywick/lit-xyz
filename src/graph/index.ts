import chalk from 'chalk'
import { IArticle, IGraph } from '../types'
import { resolveImage } from './image'
import { resolveArticle } from './markdown'
import { Directory, File } from './util'
import { resolveAbout } from './yaml'

export async function generateGraph(
    docs: Directory,
    about: File,
    publics: Directory
) {
    const graph: IGraph = {
        about: await resolveAbout(about),
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

    for await (const article of graph.articles) {
        article.author = article.author || graph.about.author
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

const bySameTagFilter =
    (a: IArticle) =>
    (b: IArticle): boolean =>
        a.tag === b.tag && a.id !== b.id
