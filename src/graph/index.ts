import chalk from 'chalk'
import { IGraph } from '../types'
import { resolveImage } from './image'
import { resolveArticle } from './markdown'
import { Directory } from './util'

export async function generateGraph(docs: Directory, publics: Directory) {
    const graph: IGraph = {
        articles: [],
        images: [],
        public: [],
    }

    for await (const subdirectory of docs.subdirectories()) {
        if (subdirectory.path.startsWith('.')) continue

        for await (const file of subdirectory.files()) {
            if (['.md', '.mdx'].includes(file.extension.toLowerCase())) {
                const article = await resolveArticle(docs, file)

                if (article) {
                    graph.articles.push(article)
                }
            } else if (
                ['.jpg', '.jpeg', '.png', '.gif'].includes(
                    file.extension.toLowerCase()
                )
            ) {
                const image = await resolveImage(file)
                graph.images.push(image)
            } else {
                report(file.path, 'Ignoring unknown file path')
            }
        }
    }

    for await (const article of graph.articles) {
        article.related = graph.articles.filter(
            (x) => x.tag === article.tag && x.id !== article.id
        )
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
